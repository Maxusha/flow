export const ElementType = {
  START: 'element-start',
  END: 'element-end',
  SQUARE: 'element-square',
  BRANCH: 'element-branch',
  CONDITION: 'element-condition',
  CONNECTION: 'element-connection',
  ARROW: 'element-condition-arrow'
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
  [ElementType.END]: assign({end: true}),
  [ElementType.SQUARE]: assign({})
}