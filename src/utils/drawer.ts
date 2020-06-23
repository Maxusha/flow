import { v4 as uuid } from 'uuid'

/**
 * x and y parameters are mutable
 * @param {Array<Array<Array>>>} grid - Grid of elements // TODO: Find way to define this object type (TS?)
 * @param {*} x - starting X drawing coordinate
 * @param {*} y - starting Y drawing coordinate
 * @returns self like object to make chain calls
 */
export function ArrowDrawer(grid, x, y) {
  let from = 'top'
  let to = null
  let padLeft = 0
  let padTop = 0
  let drawArrow = false

  function end() {
    padLeft = 0
    // padTop = 0
    to = 'bottom'
    drawArrow = true
    let arrows = grid[y][x]
    for (let arrow of arrows) {
      if (arrow.line.split('-').includes('bottom')) {
        padLeft++
      }
    }
    appendElement()
  }

  function drawRight(times) {
    padLeft = 0
    padTop = 0
    while (times-- > 0) {
      to = 'right'
      appendElement()
      from = 'left'
      x++
    }
    return this
  }

  function drawLeft(times) {
    let cells = []
    for (let i = 0; i < times; i++) {
      cells.push(grid[y][x - i])
    }
    padTop = 0
    for (let cell of cells) {
      let localCount = 0
      for (let elem of cell) {
        if (elem.type === ElementType.CONNECTION) {
          let dirs = elem.line.split('-')
          if (dirs.some((value) => ['right', 'left'].includes(value))) localCount++
        }
      }
      if (localCount > padTop) padTop = localCount
    }
    padLeft = 0
    // while (times-- > 0) {
    // }
    while (times-- > 0) {
      to = 'left'
      appendElement()
      from = 'right'
      x--
    }
    return this
  }

  function drawDown(times) {
    padTop = 0
    padLeft = 0
    while (times-- > 0) {
      to = 'bottom'
      appendElement()
      from = 'top'
      y++
    }
    return this
  }

  function drawUp(times) {
    while (times-- > 0) {
      to = 'top'
      appendElement()
      from = 'bottom'
      y--
    }
    return this
  }

  let appendElement = () => {
    let row = grid[y]
    if (row === undefined) row = grid[y] = []
    let cell = row[x]
    if (cell === undefined) cell = row[x] = []
    cell.push({
      id: uuid(),
      type: ElementType.CONNECTION,
      padLeft: padLeft,
      padTop: padTop,
      drawArrow: drawArrow,
      line: `${from}-${to}`
    })
  }

  return {
    x,
    y,
    end,
    drawRight,
    drawLeft,
    drawDown,
    drawUp
  }
}
