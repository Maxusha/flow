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
    text: 'Do something?',
    conditions: [
      {
        id: 31,
        text: 'Yes',
        type: 'element-condition',
        to: 1
      },
      {
        id: 32,
        text: 'No',
        type: 'element-condition',
        to: 4
      }
    ]
  },
  {
    id: 4,
    type: 'element-branch',
    text: 'Are you sure?',
    conditions: [
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
    ]
  },
  {
    id: 1,
    type: 'element-end'
  }
]
