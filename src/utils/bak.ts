  // if (Behavior[el.type].hasChildren) {
    //   let condY = y
    //   for (const [index, condition] of el.conditions.entries()) {
    //     // condition.id = uuid()
    //     // condition.branchId = el.id
    //     // condition.type = ElementType.CONDITION
    //     y = condY
    //     if (index === 0) {
    //       appendElement(x, y, {
    //         type: ElementType.ARROW,
    //         id: uuid(),
    //         line: 'first'
    //       })
    //     } else if (index < el.conditions.length - 1) {
    //       appendElement(x - 1, y, {
    //         type: ElementType.ARROW,
    //         id: uuid(),
    //         line: 'join'
    //       })
    //       appendElement(x, y, {
    //         type: ElementType.ARROW,
    //         id: uuid(),
    //         line: 'intermidiate'
    //       })
    //     } else {
    //       appendElement(x - 1, y, {
    //         type: ElementType.ARROW,
    //         id: uuid(),
    //         line: 'join'
    //       })
    //       appendElement(x, y, {
    //         type: ElementType.ARROW,
    //         id: uuid(),
    //         line: 'last'
    //       })
    //     }
    //     appendElement(x, y, condition)
    //     // let myX = x
    //     if (condition.to !== null) {
    //       let next = elements.find(x => x.id === condition.to)
    //       y = y + 2
    //       definePosition(next)
    //     }
    //     // console.log('cond next: ' + next.id)
    //     let coords = getCoords(condition.id)
    //     x = coords.x + 2
    //     // x = myX + 2 // todo: if condition has been moved then it's not 2...
    //   }
    // } else if (Behavior[el.type].canLead) {




// export function sortElementsByAppendOrder(items: IElements): IElements {
//   const available = [...items] // TODO: deep copy needed?
//   const result: IElements = []
//   const start = getStart(items)

//   const popElement = (id: Identifier) => {
//     const ind = available.findIndex(x => x.id === id)
//     if (ind === -1) return null
//     const els = available.splice(ind, 1)
//     if (els.length === 0) return null
//     return els[0]
//   }

//   const next = (id: Identifier) => {
//     const el = popElement(id)
//     if (el === null) return
//     result.push(el)
//     for (let nextId of el.to) {
//       next(nextId)
//     }
//   }

//   next(start.id)

//   const checkNotAppended = () => {
//     if (available.length === 0) return
//     let toIds = [...new Set(available.map(x => x.to).flat())] // leave unique only
//     let hasNoFrom = available.filter(x => !toIds.includes(x.id))
//     let el = hasNoFrom.length > 0 ? hasNoFrom[0] : available[0]
//     next(el.id)
//     checkNotAppended()
//   }
//   checkNotAppended()

//   return result
// }
