import React from 'react'

import CheckIfElementIsObject from '../../src/utils/CheckIfElementIsObject'
describe('Check if element is Object Function', () => {
  it('should recognize element as object, --success', () => {
    const result = CheckIfElementIsObject({})
    expect(result).toBeTruthy()
  })
  it('should not recognize element as object, --fail', () => {
    const result = CheckIfElementIsObject(100)
    expect(result).toBeFalsy()
  })
})
