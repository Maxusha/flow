import { Grid, IElement, } from '@/utils/grid'

describe('Grid append tests', () => {
  it('append check 1', () => {
    const element: IElement = {
      id: 1,
      to: []
    }
    const grid: Grid = new Grid()
    grid.append(1, 1, element)

    expect(grid.matrix[1][1][0]).toBe(element)
    expect(grid.matrix.length).toBe(2)
    expect(grid.matrix[1].length).toBe(2)
    expect(grid.matrix[1][1].length).toBe(1)
  })
})


