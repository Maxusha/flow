import { MakeGrid } from '@/utils/grid.js'

describe('Make Grid', () => {
  it('Draw 1', () => {
    const grid = MakeGrid(data1)
    const start = grid[1][1][0]
    expect(start.type).toBe('element-start')
    const sq1 = grid[3][1][0]
    expect(sq1.type).toBe('element-square')
    const br1 = grid[5][1][0]
    expect(br1.type).toBe('element-branch')
    const cond1 = grid[5][1][1]
    expect(cond1.type).toBe('element-condition')
    const cond2 = grid[5][3][0]
    expect(cond2.type).toBe('element-condition')
    const br2 = grid[7][3][0]
    expect(br2.type).toBe('element-branch')
    const end = grid[9][1][0]
    expect(end.type).toBe('element-end')
  })
})

const data1 = [
  {
    id: 0,
    type: 'element-start',
    to: 2
  },
  {
    id: 2,
    type: 'element-square',
    to: 3
  },
  {
    id: 3,
    type: 'element-branch',
    conditions: [
      {
        id: 31,
        type: 'element-condition',
        to: 1
      },
      {
        id: 32,
        type: 'element-condition',
        to: 4
      }
    ]
  },
  {
    id: 4,
    type: 'element-branch',
    conditions: [
      {
        id: 41,
        type: 'element-condition',
        to: 2
      },
      {
        id: 42,
        type: 'element-condition',
        to: 1
      }
    ]
  },
  {
    id: 1,
    type: 'element-end'
  }
]