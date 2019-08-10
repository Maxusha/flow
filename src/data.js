export const data1 = [
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
