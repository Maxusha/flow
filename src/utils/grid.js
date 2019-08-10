import uuid from 'uuid/v1'
import { ArrowDrawer } from './drawer.js'
import { ElementType } from './behavior.js'
// import _ from 'lodash'


// this method returns ALL items in order they rendered in flow
// TODO: make use of it in MakeGrid function
export function sortElements(items) {
  const available = Object.assign({}, items)
  const rez = []
  const start = available.find(x => x.type === ElementType.START)

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
    if ([ElementType.SQUARE, ElementType.START].includes(el.type)) {
      next(el.to)
    } else if (el.type === ElementType.BRANCH) {
      for (let condition of el.conditions) {
        next(condition.to)
      }
    }
  }

  next(start.id)

  const checkNotAppended = () => {
    if (available.length === 0) return
    let notAppendedConditionTos = available.filter(x => x.type === ElementType.BRANCH)
      .reduce((cur, next) => cur.concat(next.conditions), [])
      .map(x => x.to)
    // console.log(notAppendedConditionTos)
    let toIds = [...new Set(available.filter(x => x.type !== ElementType.BRANCH).map(x => x.to).concat(notAppendedConditionTos))] // leave unique only
    let hasNoFrom = available.filter(x => !toIds.includes(x.id))
    // console.log(hasNoFrom)
    let el = hasNoFrom.length > 0 ? hasNoFrom[0] : available[0]
    next(el.id)
    checkNotAppended()
  }
  checkNotAppended()
  return rez
}

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
  let fixOverlap = () => {
    let row = grid[y]
    if (row === undefined) return 0
    let col = row[x]
    if (col === undefined) return 0
    if (col.find(x => x.type === ElementType.SQUARE || x.type === ElementType.BRANCH || x.type === ElementType.CONDITION) === undefined) return 0
    let check = true
    let checkY = y
    let toX = x + 2
    while (check) {
      checkY = checkY - 2
      let hasBranch = false
      let hasCondition = false
      for (let elem of grid[checkY][x]) {
        if (elem.type === ElementType.BRANCH) hasBranch = true
        if (elem.type === ElementType.CONDITION) hasCondition = true
        appendElement(toX, checkY, elem)
      }
      grid[checkY][x] = []
      if (hasCondition) {
        // no more element shifts needed, everything shifted
        check = false
        if (!hasBranch) {
          // if condition is not at same spot with branching, draw condition connections
          appendElement(x, checkY, {
            type: ElementType.ARROW,
            id: uuid(),
            line: 'join'
          })
          appendElement(x + 1, checkY, {
            type: ElementType.ARROW,
            id: uuid(),
            line: 'join'
          })
        }
      }
    }
    x = toX
    return 2
  }
  // draw arrows
  let drawArrows = () => {
    for (const from of appended) {
      if ([ElementType.BRANCH, ElementType.END].includes(from.type)) continue
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
  let calc = (el) => {
    if (appended.find(x => x.id === el.id) !== undefined) return
    // console.log('appending ' + el.id)
    fixOverlap()
    appendElement(x, y, el)
    if (el.type === ElementType.BRANCH) {
      let condY = y
      for (const [index, condition] of el.conditions.entries()) {
        // condition.id = uuid()
        // condition.branchId = el.id
        // condition.type = ElementType.CONDITION
        y = condY
        appendElement(x, y, condition)
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
        // let myX = x
        if (condition.to !== null) {
          let next = elements.find(x => x.id === condition.to)
          y = y + 2
          calc(next)
        }
        // console.log('cond next: ' + next.id)
        let coords = getCoords(condition.id)
        x = coords.x + 2
        // x = myX + 2 // todo: if condition has been moved then it's not 2...
      }
    } else if (el.type === ElementType.SQUARE || el.type === ElementType.START) {
      if (el.to === null) return
      let next = elements.find(x => x.id === el.to)
      y = y + 2
      calc(next)
    }
  }
  // returns coords of element
  let getCoords = (id) => {
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
  let checkNotAppended = () => {
    let appendedIds = appended.map(x => x.id)
    let notAppended = elements.filter(x => !appendedIds.includes(x.id))
    if (notAppended.length === 0) return
    let notAppendedConditionTos = notAppended.filter(x => x.type === ElementType.BRANCH)
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
    calc(el)
    checkNotAppended()
  }
  // chech is last row contains non end elements
  let checkEndElement = () => {
    let hasNonEnd = grid[grid.length - 1].reduce((cur, next) => cur.concat(next)).some(x => x.type !== ElementType.END)
    if (hasNonEnd) {
      // move end element to the lowest+1 row
      let end = elements.find(x => x.type === ElementType.END)
      let endCoords = getCoords(end.id)
      grid[endCoords.y][endCoords.x] = []
      appendElement(1, grid.length + 1, end)
    }
  }
  // create empty cells
  let createEmptyCells = () => {
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
  let start = elements.find(x => x.type === ElementType.START)
  // let f = false
  try {
    calc(start)
    checkNotAppended()
    checkEndElement()
    createEmptyCells()
    drawArrows()
  } catch (ex) {
    console.log('Drawing of flow is incomplete. Investigate error below:')
    console.error(ex)
  }
  return grid
}

export function Validate(elements) {
  let hasStart = false
  let hasEnd = false
  const ids = new Map()
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