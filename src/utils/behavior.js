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
  canLead: false,
  canAccept: false,
  hasChildren: false,
}

function assign(props) {
  return Object.assign({}, defaults, props)
}

export const Behavior = {
  [ElementType.START]: assign({start: true, canLead: true}),
  [ElementType.END]: assign({canAccept: true}), // TODO: check grid to support for multiple endings?
  [ElementType.SQUARE]: assign({canLead: true}),
  [ElementType.BRANCH]: assign({hasChildren: true, canAccept: true}),
  [ElementType.CONDITION]: assign({canLead: true}),
  [ElementType.ARROW]: assign({})
}