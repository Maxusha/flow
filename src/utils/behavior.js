export const ElementType = {
  START: 'element-start',
  END: 'element-end',
  QUESTION: 'element-question',
  TEXT: 'TEXT',
  BRANCH: 'BRANCH',
  CONDITION: 'CONDITION', // UI only
  CONNECTION: 'element-connection', // UI only
  ARROW: 'condition-arrow' // UI only
}

const defaults = {
  start: false,
  end: false
}

function assign(props) {
  return Object.assign({}, defaults, props)
}

export const Behavior = {
  [ElementType.START]: assign({start: true}),
  [ElementType.END]: assign({end: true})
}