import React, { ReactNode, ReactElement, JSXElementConstructor } from 'react'

import { act, fireEvent, render } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect.js'

import FormProvider from '../src/FormProvider'
import * as useFieldsAndValidationHook from '../src/hooks/useFieldsAndValidations'
import { EnrichedChildren } from '../src/types'

const extendedChildren = (
  <div>
    <input
      name="name1"
      onChange={() => {
        return null
      }}
      type="text"
      value="value"
      data-testid="name1"
    />
    <input
      name="name2"
      data-testid="name2"
      onChange={() => {
        return null
      }}
      type="text"
      value="value"
    />
  </div>
)

const smallerChildren = (
  <input
    name="name1"
    onChange={() => {
      return null
    }}
    type="text"
    value="value"
    data-testid="name1"
  />
)

const renderForm = (
  children: ReactNode,
  props: Record<string, any> = {}
): any => {
  const mockFunction = jest.fn()
  return render(
    <FormProvider data-testid="form" onSubmit={mockFunction} {...props}>
      {children}
    </FormProvider>
  )
}

describe('Form, --success cases', () => {
  it('should display error message', async () => {
    const submitMock = jest.fn()
    const inputName = 'name1'

    const { getByTestId, getByText } = renderForm(smallerChildren, {
      onSubmit: submitMock,
    })

    const input = getByTestId(inputName)

    await act(async () => {
      await fireEvent.change(input, {
        target: { value: '' },
      })
    })

    expect(
      getByText(`The field ${inputName} has an invalid value`)
    ).toBeInTheDocument()
  })
  it('should return form correct object with input values and names on submit', () => {
    const submitMock = jest.fn()

    const { container, getByTestId } = renderForm(extendedChildren, {
      onSubmit: submitMock,
    })

    fireEvent.change(getByTestId('name1'), {
      target: { value: 'value1' },
    })

    fireEvent.submit(container.querySelector('form'))

    expect(submitMock).toHaveBeenCalled()

    expect(submitMock).toHaveBeenCalledWith({
      name1: 'value1',
      name2: 'value',
    })
  })
  it('should change specific input value', () => {
    const submitMock = jest.fn()

    const { getByTestId } = renderForm(smallerChildren, {
      onSubmit: submitMock,
    })

    const inputField = getByTestId('name1')

    fireEvent.change(inputField, {
      target: { value: 'value1' },
    })

    expect(inputField).toHaveValue('value1')
  })
  it('should call useFieldsAndValidations functions', () => {
    const submitMock = jest.fn()

    const getFieldsValuesMock = jest.fn()
    const checkIfAllFieldsAreValidMock = jest.fn()

    const getInputByNameResponse:
      | ReactElement<EnrichedChildren, string | JSXElementConstructor<any>>
      | undefined = {
      key: null,
      props: {
        name: 'name1',
        type: 'text',
        value: 'value',
        onChange: () => {
          return null
        },
        selectedValue: 'value',
      },
      type: 'input',
    }

    jest.spyOn(useFieldsAndValidationHook, 'default').mockReturnValue({
      getFieldsValues: getFieldsValuesMock,
      getFieldsValidities: () => {
        return { name1: true }
      },
      checkIfAllFieldsAreValid: checkIfAllFieldsAreValidMock,
      getInputByName: () => {
        return getInputByNameResponse
      },
    })

    const { container } = renderForm(smallerChildren, {
      onSubmit: submitMock,
    })

    act(() => {
      fireEvent.submit(container.querySelector('form'))
    })

    expect(checkIfAllFieldsAreValidMock).toHaveBeenCalledTimes(1)
    expect(getFieldsValuesMock).toHaveBeenCalledTimes(1)
  })
})
