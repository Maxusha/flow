import uuid from 'uuid/v1'
import { ArrowDrawer } from './drawer.js'
import { ElementType, Behavior } from './behavior.js'
// import _ from 'lodash'

/**
 * TODO: Split sequence logic from MakeGrid() to make it simpler.
 * Find start -> build list -> find unappended elements -> add them to the end of list
 * @param {Array} items - passed by user to component
 */
export function sortElements(items) {
  const available = Object.assign({}, items) // TODO: deep copy needed?
  const rez = []
  const start = available.find(x => Behavior[x.type].start)

  const popElement = (id) => {
    const ind = available.findIndex(x => x === id)
    if (ind === -1) return null
    const els = available.splice(ind, 1)
    if (els.length === 0) return null
    return els[0]
  }

  const next = (id) => {
    const el = popElement(id)
    if (el === null) return
    rez.push(el)
    if (Behavior[el.type].canLead) {
      next(el.to)
    } else if (Behavior[el.type].hasChildren) {
      for (let condition of el.conditions) {
        next(condition.to)
      }
    }
  }

  next(start.id)

  const checkNotAppended = () => {
    if (available.length === 0) return
    let notAppendedConditionTos = available.filter(x => Behavior[x.type].hasChildren)
      .reduce((cur, next) => cur.concat(next.conditions), [])
      .map(x => x.to)
    let toIds = [...new Set(available.filter(x => Behavior[x.type].canLead).map(x => x.to).concat(notAppendedConditionTos))] // leave unique only
    let hasNoFrom = available.filter(x => !toIds.includes(x.id))
    let el = hasNoFrom.length > 0 ? hasNoFrom[0] : available[0]
    next(el.id)
    checkNotAppended()
  }
  checkNotAppended()
  return rez
}

/**
 * Returns grid like structure for Vue component to be rendered in loops
 * @param {Array} elements - passed by user to component
 * @returns {Array<Array<Array>>>} - row -> cell -> elements in cell
 */
export function MakeGrid(elements) {
  Validate(elements)

  // sets element to specific coordinates
  let appendElement = (x, y, elem) => {
    // console.log(elem)
    let row = grid[y]
    if (row === undefined) row = grid[y] = []
    let col = row[x]
    if (col === undefined) col = row[x] = []
    col.push(elem)
    if (elem.type !== ElementType.CONNECTION && elem.type !== ElementType.ARROW) {
      if (appended.findIndex(x => x.id === elem.id) === -1) {
        // console.log('ap: ' + elem.id + ' x: ' + x + ' y: ' + y)
        appended.push(elem)
      }
    }
  }

  // if element already exist in the cell move column of appended element to the right
  const isCellEmpty = (localY, localX) => {
    let row = grid[localY]
    if (row === undefined) return true
    let col = row[localX]
    if (col === undefined) return true
    if (col.filter(el => el.type in Behavior).length === 0) return true
    return false
  }

  /**
   * When cell already contains element we must shift already appended structure till previous condition to the right
   */
  const fixOverlap = () => {
    if (isCellEmpty(y, x)) return 0
    let check = true
    let checkY = y
    let toX = x + 2
    while (!isCellEmpty(checkY, toX)) {
      toX += 2
    }
    while (check) {
      checkY = checkY - 2
      let hasParent = false
      let hasChild = false
      for (let elem of grid[checkY][x]) {
        if (Behavior[elem.type].hasChildren) hasParent = true
        if (elem.type === ElementType.CONDITION) hasChild = true // TODO: how to determine that THIS element is part of THIS parent...
        appendElement(toX, checkY, elem)
      }
      grid[checkY][x] = []
      if (hasChild) {
        // no more element shifts needed, everything shifted
        check = false
        if (!hasParent) {
          // if condition is not at same spot with branching, draw condition connections
          for (let dx = x; dx < toX; dx++) {
            appendElement(dx, checkY, {
              type: ElementType.ARROW,
              id: uuid(),
              line: 'join'
            })
          }
        }
      }
    }
    x = toX
    return 2
  }
  // draw arrows
  const drawArrows = () => {
    for (const from of appended) {
      if (!Behavior[from.type].canLead) continue
      let coordsFrom = getCoords(from.id)
      coordsFrom.y++
      if (from.to === null) {
        // ArrowDrawer(grid, coordsFrom.x, coordsFrom.y).end()
        continue
      }
      let coordsTo = getCoords(from.to)
      coordsTo.y--

      let drawer = ArrowDrawer(grid, coordsFrom.x, coordsFrom.y)
      if (coordsTo.y > coordsFrom.y) {
        // draw down this col or 1 col to the left, then go horizontally to destination
        let sideStep = 0
        for (let y = coordsFrom.y + 1; y < coordsTo.y; y += 2) {
          if (grid[y][coordsFrom.x].length > 0) {
            sideStep = 1
          }
        }
        drawer.drawRight(sideStep).drawDown(coordsTo.y - coordsFrom.y)
        if (coordsTo.x > coordsFrom.x) {
          drawer.drawRight(coordsTo.x - coordsFrom.x - sideStep)
        } else if (coordsTo.x <= coordsFrom.x) {
          drawer.drawLeft(coordsFrom.x - coordsTo.x + sideStep)
        }
      } else if (coordsTo.y === coordsFrom.y) {
        // go horrizontaly to destination
        drawer.drawLeft(coordsFrom.x - coordsTo.x)
      } else if (coordsTo.y < coordsFrom.y) {
        // go horrizontaly to destination-1, go up, continue 1 horizontally to destination
        drawer.drawLeft(1)
        drawer.drawUp(coordsFrom.y - coordsTo.y)
        if (coordsTo.x >= coordsFrom.x) {
          drawer.drawRight(coordsTo.x - coordsFrom.x + 1)
        } else if (coordsTo.x < coordsFrom.x) {
          drawer.drawLeft(coordsFrom.x - coordsTo.x - 1)
        }
        // todo: implement
      }
      drawer.end()
    }
  }
  // cals position of next element
  const definePosition = (el) => {
    if (appended.find(x => x.id === el.id) !== undefined) return
    // console.log('appending ' + el.id)
    fixOverlap()
    appendElement(x, y, el)
    if (Behavior[el.type].hasChildren) {
      let condY = y
      for (const [index, condition] of el.conditions.entries()) {
        // condition.id = uuid()
        // condition.branchId = el.id
        // condition.type = ElementType.CONDITION
        y = condY
        if (index === 0) {
          appendElement(x, y, {
            type: ElementType.ARROW,
            id: uuid(),
            line: 'first'
          })
        } else if (index < el.conditions.length - 1) {
          appendElement(x - 1, y, {
            type: ElementType.ARROW,
            id: uuid(),
            line: 'join'
          })
          appendElement(x, y, {
            type: ElementType.ARROW,
            id: uuid(),
            line: 'intermidiate'
          })
        } else {
          appendElement(x - 1, y, {
            type: ElementType.ARROW,
            id: uuid(),
            line: 'join'
          })
          appendElement(x, y, {
            type: ElementType.ARROW,
            id: uuid(),
            line: 'last'
          })
        }
        appendElement(x, y, condition)
        // let myX = x
        if (condition.to !== null) {
          let next = elements.find(x => x.id === condition.to)
          y = y + 2
          definePosition(next)
        }
        // console.log('cond next: ' + next.id)
        let coords = getCoords(condition.id)
        x = coords.x + 2
        // x = myX + 2 // todo: if condition has been moved then it's not 2...
      }
    } else if (Behavior[el.type].canLead) {
      if (el.to === null) return
      let next = elements.find(x => x.id === el.to)
      y = y + 2
      definePosition(next)
    }
  }
  // returns coords of element
  const getCoords = (id) => {
    for (const [rowIndex, row] of grid.entries()) {
      if (row === undefined) continue
      for (const [colIndex, cell] of row.entries()) {
        if (cell === undefined) continue
        for (const elem of cell) {
          if (elem.id === id) {
            return {
              x: colIndex,
              y: rowIndex
            }
          }
        }
      }
    }
  }
  // check is everything appended
  const checkNotAppended = () => {
    let appendedIds = appended.map(x => x.id)
    let notAppended = elements.filter(x => !appendedIds.includes(x.id))
    if (notAppended.length === 0) return
    let notAppendedConditionTos = notAppended.filter(x => Behavior[x.type].hasChildren)
      .reduce((cur, next) => cur.concat(next.conditions), [])
      .map(x => x.to)
    // console.log(notAppendedConditionTos)
    let toIds = [...new Set(notAppended.map(x => x.to).concat(notAppendedConditionTos))] // leave unique only
    let hasNoFrom = notAppended.filter(x => !toIds.includes(x.id))
    // console.log(hasNoFrom)
    let el = hasNoFrom.length > 0 ? hasNoFrom[0] : notAppended[0]
    let colCount = grid.map(x => x === undefined ? 0 : x.length).reduce((prev, current) => current > prev ? current : prev)
    x = colCount + 1
    y = 1
    // appendElement(x = colCount + 1, y = 1, start)
    definePosition(el)
    checkNotAppended()
  }
  // TODO: Do I need it? Maybe add it as a option?
  // check is last row contains non end elements
  // let checkEndElement = () => {
  //   let hasNonEnd = grid[grid.length - 1].reduce((cur, next) => cur.concat(next)).some(x => x.type !== ElementType.END)
  //   if (hasNonEnd) {
  //     // move end element to the lowest+1 row
  //     let end = elements.find(x => x.type === ElementType.END)
  //     let endCoords = getCoords(end.id)
  //     grid[endCoords.y][endCoords.x] = []
  //     appendElement(1, grid.length + 1, end)
  //   }
  // }
  // Create empty cells
  const createEmptyCells = () => {
    let colCount = grid.map(x => x === undefined ? 0 : x.length).reduce((prev, current) => current > prev ? current : prev) + 1
    for (let [rowIndex, row] of grid.entries()) {
      if (row === undefined) {
        row = grid[rowIndex] = []
      }
      for (let i of Array(colCount).keys()) {
        if (row[i] === undefined) row[i] = []
      }
    }
  }
  // initialize data
  let appended = []
  let grid = []
  let x = 1
  let y = 1
  
  let start = elements.find(x => Behavior[x.type].start)
  try {
    definePosition(start)
    checkNotAppended()
    // checkEndElement() -- quite specific case. does it needed?
    createEmptyCells()
    drawArrows()
  } catch (ex) {
    console.log('Drawing of flow is incomplete. Investigate error below:')
    console.error(ex)
  }
  return grid
}

/**
 * Check that data meets criteria to be processed and rendered
 * throws error if validation fails
 * @param {Array} elements  - passed by user to component
 */
export function Validate(elements) {
  let hasStart = false
  let hasEnd = false
  const ids = new Map()
  // TODO: revrite tests based on components behavior rather than types
  for (const el of elements) {
    if (el.type === 'element-start') hasStart = true
    if (el.type === 'element-end') hasEnd = true
    if (el.id === undefined || el.id === null) throw Error(`Schema error. Missing element id`)
    if (ids.has(el.id)) throw Error(`Schema error. Duplicate ids: ${el.id}. `)
    ids.set(el.id, true)
  }
  for (const el of elements) {
    if (el.to !== undefined && !ids.has(el.to)) throw Error(`Schema error. Element references non existing element`)
  }
  if (!hasStart) throw Error(`Schema error. "element-start" must be present.`)
  if (!hasEnd) throw Error(`Schema error. "element-end" must be present.`)
} 