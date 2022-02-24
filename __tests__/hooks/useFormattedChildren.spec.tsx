import React from 'react'

import { renderHook, act } from '@testing-library/react-hooks'

import useFormattedChildren from '../../src/hooks/useFormattedChildren'

const renderizedChildren = (
  <input
    name="name1"
    onChange={() => {
      return null
    }}
    type="text"
    value="value"
  />
)

describe('useFormattedChildren hook', () => {
  it('should be able to start formattedChildren values', () => {
    const { result } = renderHook(() =>
      useFormattedChildren(renderizedChildren)
    )

    expect(result.current.formattedChildrenState?.[0].props).toStrictEqual(
      renderizedChildren.props
    )
  })

  it('should be able to start update formattedChildren', () => {
    const renderizedChildren2 = (
      <input
        name="name2"
        onChange={() => {
          return null
        }}
        type="text"
        value="value2"
      />
    )

    const { result } = renderHook(() =>
      useFormattedChildren(renderizedChildren)
    )

    act(() => {
      result.current.updateFormattedChildren([renderizedChildren2])
    })

    expect(result.current.formattedChildrenState?.[0].props).toStrictEqual(
      renderizedChildren2.props
    )
  })
})
