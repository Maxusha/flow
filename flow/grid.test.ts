/* eslint-env jest */
import tt from './grid'

describe('Back to Search link', () => {
  it('From autos search page', () => {
    const res = tt
    expect(res).toEqual(3)
  })
})
