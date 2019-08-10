import { Validate } from '@/utils/grid.js'

describe('Json schema validation', () => {
  it('No start', () => {
    const data = [
      {
        id: 1,
        type: 'element-end',
      }
    ]
    expect(() => Validate(data)).toThrowError('"element-start" must be present')
  })
  it('No end', () => {
    const data = [
      {
        id: 1,
        type: 'element-start',
      }
    ]
    expect(() => Validate(data)).toThrowError(`"element-end" must be present`)
  })
  it('No id', () => {
    const data = [
      {
        id: 1,
        type: 'element-start',
        to: 2
      },
      {
        type: 'element-square',
        to: 2
      },
      {
        id: 2,
        type: 'element-end',
      }
    ]
    expect(() => Validate(data)).toThrowError('Missing element id')
  })
  it('Duplicate id', () => {
    const data = [
      {
        id: 1,
        type: 'element-start',
        to: 2
      },
      {
        id: 1,
        type: 'element-square',
        to: 2
      },
      {
        id: 2,
        type: 'element-end',
      }
    ]
    expect(() => Validate(data)).toThrowError('Duplicate ids')
  })
  it('Duplicate id', () => {
    const data = [
      {
        id: 1,
        type: 'element-start',
        to: 3
      },
      {
        id: 2,
        type: 'element-end',
      }
    ]
    expect(() => Validate(data)).toThrowError('Element references non existing element')
  })
})