import { Grid, IElement, IElements } from '@/utils/grid'

describe('Make Grid', () => {
  it('Draw 1', () => {
    const data: IElements = [
      { id: 0, start: true, to: [1] },
      { id: 1, to: [] }
    ]
    const grid = new Grid(data)
    grid.print()

    expect(grid.matrix[0][0][0].id).toBe(0)
    expect(grid.matrix[1][0][0].id).toBe(1)
  })

  it('Draw 2', () => {
    const data: IElements = [
      { id: 0, start: true, to: [1] },
      { id: 1, to: [2] },
      { id: 2, to: [] }
    ]
    const grid = new Grid(data)

    expect(grid.matrix[0][0][0].id).toBe(0)
    expect(grid.matrix[1][0][0].id).toBe(1)
    expect(grid.matrix[2][0][0].id).toBe(2)
  })

  it('Draw 3', () => {
    const data: IElements = [
      { id: 0, start: true, to: [1] },
      { id: 1, to: [2, 3] },
      { id: 2, to: [3] },
      { id: 3, to: [] }
    ]
    const grid: Grid = new Grid(data)

    expect(grid.matrix[0][0][0].id).toBe(0)
    expect(grid.matrix[1][0][0].id).toBe(1)
    expect(grid.matrix[2][0][0].id).toBe(2)
    expect(grid.matrix[3][0][0].id).toBe(3)
  })

  it('Draw 4', () => {
    const data: IElements = [
      { id: 0, start: true, to: [1] },
      { id: 1, to: [2, 3] },
      { id: 2, to: [4] },
      { id: 3, to: [4] },
      { id: 4, to: [] }
    ]
    const grid = new Grid(data)

    expect(grid.matrix[0][0][0].id).toBe(0)
    expect(grid.matrix[1][0][0].id).toBe(1)
    expect(grid.matrix[2][0][0].id).toBe(2)
    expect(grid.matrix[2][1][0].id).toBe(3)
    expect(grid.matrix[3][0][0].id).toBe(4)
  })

  it.only('Draw 5, overlap check', () => {
    const data: IElements = [
      { id: 0, start: true, to: [1, 6] },
      { id: 1, to: [2, 4, 5] },
      { id: 2, to: [3] },
      { id: 3, to: [] },
      { id: 4, to: [3] },
      { id: 5, to: [3] },
      { id: 6, to: [7] },
      { id: 7, to: [3] }
    ]
    const grid = new Grid(data)
    grid.print()

    expect(grid.matrix[0][0][0].id).toBe(0)
    expect(grid.matrix[1][0][0].id).toBe(1)
    expect(grid.matrix[2][0][0].id).toBe(2)
    expect(grid.matrix[3][0][0].id).toBe(3)
    expect(grid.matrix[2][1][0].id).toBe(4)
    expect(grid.matrix[2][2][0].id).toBe(5)
    expect(grid.matrix[1][3][0].id).toBe(6)
    expect(grid.matrix[2][3][0].id).toBe(7)
  })

  it('Draw 6, not appended check', () => {
    const data: IElements = [
      { id: 0, start: true, to: [1] },
      { id: 1, to: [] },
      { id: 2, to: [1] },
      { id: 3, to: [1] },
    ]
    const grid = new Grid(data)

    expect(grid.matrix[0][0][0].id).toBe(0)
    expect(grid.matrix[1][0][0].id).toBe(1)
    expect(grid.matrix[0][1][0].id).toBe(2)
    expect(grid.matrix[0][2][0].id).toBe(3)
  })
})


