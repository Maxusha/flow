import { v4 as uuid } from 'uuid'
import { ArrowDrawer } from './drawer'

export type Identifier = number | string

export type IElement = {
  id: Identifier
  to: Identifier[]
  start?: boolean
}

export type IElements = IElement[]

export class Grid {
  matrix: IElement[][][] = []
  elements: IElements = []
  appended: IElements = []
  protected x: number = 0
  protected y: number = 0

  constructor()
  constructor(elements: IElements)
  constructor(elements?: IElements) {
    if (!!elements) {
      this.build(elements)
    }
  }

  build(elements: IElements) {
    this.matrix = []
    this.elements = [...elements]
    this.appended = []
    this.x = 0
    this.y = 0

    let start = this.getStart()
    try {
      this.chainDraw(start)
      this.checkNotAppended()
      // checkEndElement() -- quite specific case. does it needed?
      this.createEmptyCells()
      // drawArrows()
    } catch (ex) {
      console.log('Drawing of flow is incomplete. Investigate error below:')
      console.error(ex)
    }
  }

  chainDraw(element: IElement): void {
    if (this.hasElement(element.id)) return
    this.fixOverlap(element)
    this.append(this.x, this.y, element)

    const localX = this.x
    const localY = this.y
    for (let [index, nextId] of element.to.entries()) {
      let next = this.getElementById(nextId)
      this.x = localX + index
      this.y = localY + 1
      // this.y = localY + (next.sameRow ? 0 : 1)
      this.chainDraw(next)
    }
  }

  /**
   * When cell already contains element we must shift already appended structure till previous condition to the right
   */
  fixOverlap(element: IElement) {
    if (this.isCellEmpty(this.x, this.y)) return

    let checkY = this.y
    let toX = this.x + 1
    while (!this.isCellEmpty(toX, checkY)) {
      toX += 1
    }
    const shiftElements = (current: IElement): void => {
      checkY = checkY - 1
      const cell = this.matrix[checkY][this.x]
      if (!cell) return
      const lastElement = cell[cell.length-1]
      if (lastElement.to.includes(current.id)) {
        const nextToCheck = cell[0]
        this.defineCell(toX, checkY)
        this.matrix[checkY][toX] = [...cell]
        this.matrix[checkY][this.x] = []
        shiftElements(nextToCheck)
      }
    }
    shiftElements(element)
    this.x = toX
  }

  defineCell(x: number, y: number): void {
    let row = this.matrix[y]
    if (row === undefined) row = this.matrix[y] = []
    let col = row[x]
    if (col === undefined) col = row[x] = []
  }

  append(x: number, y: number, element: IElement): void {
    let row = this.matrix[y]
    if (row === undefined) row = this.matrix[y] = []
    let col = row[x]
    if (col === undefined) col = row[x] = []
    col.push(element)
    this.appended.push(element)
  }

  checkNotAppended() {
    let appendedIds = this.appended.map(x => x.id)
    let notAppended = this.elements.filter(x => !appendedIds.includes(x.id))
    if (notAppended.length === 0) return
    let toIds = [...new Set(notAppended.map(x => x.to).flat())]
    let hasNoFrom = notAppended.filter(x => !toIds.includes(x.id))
    // console.log(hasNoFrom)
    let el = hasNoFrom.length > 0 ? hasNoFrom[0] : notAppended[0]
    let colCount = this.matrix.map(x => x === undefined ? 0 : x.length).reduce((prev, current) => current > prev ? current : prev)

    this.x = colCount
    this.y = 0
    // appendElement(x = colCount + 1, y = 1, start)
    this.chainDraw(el)
    this.checkNotAppended()
  }

  /**
   * Filles empty cells of matrix
   *  */
  createEmptyCells() {
    for (let y = 0; y < this.rowsCount; y++) {
      for (let x = 0; x < this.colsCount; x++) {
        if (this.matrix[y][x] === undefined) {
          this.matrix[y][x] = []
        }
      }
    }
  }

  hasElement(elementId: Identifier): boolean {
    return !!this.appended.find(x => x.id === elementId)
  }

  print(mapper: (element: IElement) => string = (element) => `${element.id}`): void  {
    const simplified = this.matrix.map(row => {
      return row.map(cell => {
        return cell.map(mapper)
      })
    })
    console.table(simplified)
  }

  getStart(): IElement {
    const start = this.elements.find(x => x.start)
    if (!start) throw Error(`Schema error. "element-start" must be present.`)
    return start
  }

  getElementById(id: Identifier): IElement {
    const element = this.elements.find(x => x.id === id)
    if (!element) throw Error(`Could not find element by id.`)
    return element
  }

  isCellEmpty(x: number, y: number) {
    let row = this.matrix[y]
    if (row === undefined) return true
    let col = row[x]
    if (col === undefined) return true
    if (col.length === 0) return true
    return false
  }

  get rowsCount(): number {
    return this.matrix.length
  }

  get colsCount(): number {
    return this.matrix.map(x => !x ? 0 : x.length).reduce((a, c) => c > a ? c : a)
  }
}




/**
 * Returns grid like structure for Vue component to be rendered in loops
 */
//   Validate(elements)

  // sets element to specific coordinates




//   // draw arrows
//   const drawArrows = () => {
//     for (const from of appended) {
//       if (!Behavior[from.type].canLead) continue
//       let coordsFrom = getCoords(from.id)
//       coordsFrom.y++
//       if (from.to === null) {
//         // ArrowDrawer(grid, coordsFrom.x, coordsFrom.y).end()
//         continue
//       }
//       let coordsTo = getCoords(from.to)
//       coordsTo.y--

//       let drawer = ArrowDrawer(grid, coordsFrom.x, coordsFrom.y)
//       if (coordsTo.y > coordsFrom.y) {
//         // draw down this col or 1 col to the left, then go horizontally to destination
//         let sideStep = 0
//         for (let y = coordsFrom.y + 1; y < coordsTo.y; y += 2) {
//           if (grid[y][coordsFrom.x].length > 0) {
//             sideStep = 1
//           }
//         }
//         drawer.drawRight(sideStep).drawDown(coordsTo.y - coordsFrom.y)
//         if (coordsTo.x > coordsFrom.x) {
//           drawer.drawRight(coordsTo.x - coordsFrom.x - sideStep)
//         } else if (coordsTo.x <= coordsFrom.x) {
//           drawer.drawLeft(coordsFrom.x - coordsTo.x + sideStep)
//         }
//       } else if (coordsTo.y === coordsFrom.y) {
//         // go horrizontaly to destination
//         drawer.drawLeft(coordsFrom.x - coordsTo.x)
//       } else if (coordsTo.y < coordsFrom.y) {
//         // go horrizontaly to destination-1, go up, continue 1 horizontally to destination
//         drawer.drawLeft(1)
//         drawer.drawUp(coordsFrom.y - coordsTo.y)
//         if (coordsTo.x >= coordsFrom.x) {
//           drawer.drawRight(coordsTo.x - coordsFrom.x + 1)
//         } else if (coordsTo.x < coordsFrom.x) {
//           drawer.drawLeft(coordsFrom.x - coordsTo.x - 1)
//         }
//         // todo: implement
//       }
//       drawer.end()
//     }
//   }

  // calculates position of next element

//   // returns coords of element
//   const getCoords = (id) => {
//     for (const [rowIndex, row] of grid.entries()) {
//       if (row === undefined) continue
//       for (const [colIndex, cell] of row.entries()) {
//         if (cell === undefined) continue
//         for (const elem of cell) {
//           if (elem.id === id) {
//             return {
//               x: colIndex,
//               y: rowIndex
//             }
//           }
//         }
//       }
//     }
//   }
  // check is everything appended

//   // TODO: Do I need it? Maybe add it as a option?
//   // check is last row contains non end elements
//   // let checkEndElement = () => {
//   //   let hasNonEnd = grid[grid.length - 1].reduce((cur, next) => cur.concat(next)).some(x => x.type !== ElementType.END)
//   //   if (hasNonEnd) {
//   //     // move end element to the lowest+1 row
//   //     let end = elements.find(x => x.type === ElementType.END)
//   //     let endCoords = getCoords(end.id)
//   //     grid[endCoords.y][endCoords.x] = []
//   //     appendElement(1, grid.length + 1, end)
//   //   }
//   // }

//   // initialize data

// /**
//  * Check that data meets criteria to be processed and rendered
//  * throws error if validation fails
//  * @param {Array} elements  - passed by user to component
//  */
// export function Validate(elements) {
//   let hasStart = false
//   let hasEnd = false
//   const ids = new Map()
//   // TODO: revrite tests based on components behavior rather than types
//   for (const el of elements) {
//     if (el.type === 'element-start') hasStart = true
//     if (el.type === 'element-end') hasEnd = true
//     if (el.id === undefined || el.id === null) throw Error(`Schema error. Missing element id`)
//     if (ids.has(el.id)) throw Error(`Schema error. Duplicate ids: ${el.id}. `)
//     ids.set(el.id, true)
//   }
//   for (const el of elements) {
//     if (el.to !== undefined && !ids.has(el.to)) throw Error(`Schema error. Element references non existing element`)
//   }
//   if (!hasStart) throw Error(`Schema error. "element-start" must be present.`)
//   if (!hasEnd) throw Error(`Schema error. "element-end" must be present.`)
