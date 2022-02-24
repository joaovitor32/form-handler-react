import React from 'react'

import { renderHook } from '@testing-library/react-hooks'

import useFieldsAndValidations from '../../src/hooks/useFieldsAndValidations'

const renderizedChildren = (
  <div>
    <input name="name1" type="text" value="value" />
    <input name="name2" type="text" value="value" />
    <div>
      <input name="name3" type="text" value="value" />
    </div>
  </div>
)

const brokenRenderizedChildren = (
  <div>
    <input name="name1" type="text" value="" />
    <input name="name2" type="text" value="value" />
    <div>
      <input name="name3" type="text" value="value" />
    </div>
  </div>
)

describe('useFieldsAndValidations hook, --success cases', () => {
  it('should be able to get inputs values', () => {
    const { result } = renderHook(() =>
      useFieldsAndValidations({}, [renderizedChildren])
    )

    expect(result.current.getFieldsValues()).toStrictEqual({
      name1: 'value',
      name2: 'value',
      name3: 'value',
    })
  })
  it('should check if all fields are valid and return true', () => {
    const { result } = renderHook(() =>
      useFieldsAndValidations({}, [renderizedChildren])
    )

    expect(result.current.checkIfAllFieldsAreValid()).toBeTruthy()
  })
  it('should return validities of every field, each one is true', () => {
    const { result } = renderHook(() =>
      useFieldsAndValidations({}, [renderizedChildren])
    )

    expect(result.current.getFieldsValidities()).toStrictEqual({
      name1: true,
      name2: true,
      name3: true,
    })
  })
  it('should return especific input by name', () => {
    const { result } = renderHook(() =>
      useFieldsAndValidations({}, [renderizedChildren])
    )

    expect(result.current.getInputByName('name1')?.type).toBe('input')
    expect(result.current.getInputByName('name1')?.props).toStrictEqual({
      name: 'name1',
      type: 'text',
      value: 'value',
    })
  })
})

describe('useFieldsAndValidations hook, --fail cases', () => {
  it('should check if all fields are valid and return false', () => {
    const { result } = renderHook(() =>
      useFieldsAndValidations({}, [brokenRenderizedChildren])
    )

    expect(result.current.checkIfAllFieldsAreValid()).toBeFalsy()
  })
  it('should return validities of every field', () => {
    const { result } = renderHook(() =>
      useFieldsAndValidations({}, [brokenRenderizedChildren])
    )

    expect(result.current.getFieldsValidities()).toStrictEqual({
      name1: false,
      name2: true,
      name3: true,
    })
  })
  it('should not return especific input by name', () => {
    const { result } = renderHook(() =>
      useFieldsAndValidations({}, [renderizedChildren])
    )

    expect(result.current.getInputByName('non-existent')).toBeUndefined()
  })
})
