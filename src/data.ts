export type IData = any[]

export type IElement = {
  id: number | string
  to: number | string | number[] | string[]
  type: string
}

export const data1: IData = [
  {
    id: 0,
    type: 'element-start',
    to: 2
  },
  {
    id: 2,
    type: 'element-square',
    text: 'Box 1',
    to: 3
  },
  {
    id: 3,
    type: 'element-branch',
    text: 'Do something?',
    to: [31, 32],
  },
  {
    id: 31,
    text: 'Yes',
    type: 'element-condition',
    to: 4
  },
  {
    id: 32,
    text: 'No',
    type: 'element-condition',
    to: 5
  },
  {
    id: 5,
    type: 'element-square',
    text: 'Box 2',
    to: 1
  },
  {
    id: 4,
    type: 'element-branch',
    text: 'Are you sure?',
    to: [41, 42, 43]
  },
  {
    id: 41,
    text: 'Yes',
    type: 'element-condition',
    to: 1
  },
  {
    id: 42,
    text: 'No',
    type: 'element-condition',
    to: 3
  },
  {
    id: 43,
    text: 'Maybe',
    type: 'element-condition',
    to: 1
  }
  {
    id: 1,
    type: 'element-end'
  }
]
