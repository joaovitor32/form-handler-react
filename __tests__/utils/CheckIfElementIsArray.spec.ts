import React from 'react'

import CheckIfElementIsArray from '../../src/utils/CheckIfElementIsArray'
describe('Check if element is array Function', () => {
  it('should recognize element as array, --success', () => {
    const result = CheckIfElementIsArray([])
    expect(result).toBeTruthy()
  })
  it('should not recognize element as array, --fail', () => {
    const result = CheckIfElementIsArray({})
    expect(result).toBeFalsy()
  })
})
