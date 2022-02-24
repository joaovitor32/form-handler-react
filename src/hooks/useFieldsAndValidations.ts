import { useCallback, useMemo, ReactElement } from 'react'

import ValidInputValuesFunctionHelper from '../helpers/ValidInputValuesFunctionsHelper'
import {
  ChildrenArray,
  Validations,
  EnrichedChildren,
  UseFieldsAndValidationsHookFunctions,
  FieldsAndValues,
} from '../types'
import CheckIfElementIsArray from '../utils/CheckIfElementIsArray'
import CheckIfElementIsObject from '../utils/CheckIfElementIsObject'

const useFieldsValidation = (
  validations: Validations,
  childrenArray: ChildrenArray<EnrichedChildren>
): UseFieldsAndValidationsHookFunctions<EnrichedChildren, FieldsAndValues> => {
  const getAllInputs = useCallback((element, array) => {
    if (CheckIfElementIsArray(element.props.children)) {
      return element.props.children?.find(child => {
        return getAllInputs(child, array)
      })
    }

    if (CheckIfElementIsObject(element.props.children)) {
      return getAllInputs(element.props.children, array)
    }

    if (element.type === 'input') {
      array.push(element)
    }
  }, [])

  const parseInputsToList = useCallback(() => {
    const parsedChildrenArray = []

    childrenArray?.forEach(element =>
      getAllInputs(element, parsedChildrenArray)
    )

    return parsedChildrenArray as ReactElement<EnrichedChildren>[]
  }, [childrenArray, getAllInputs])

  const getInputByName = useCallback(
    name => {
      const parsedInputs = parseInputsToList()
      return parsedInputs.find(input => input.props.name === name)
    },
    [parseInputsToList]
  )

  const getFieldsProps = useMemo(() => {
    const parsedInputs = parseInputsToList()

    return parsedInputs?.map(input => {
      const { value, name, type } = input.props
      return { value, name, type }
    })
  }, [parseInputsToList])

  const getFieldsPropsObject = useMemo(() => {
    return getFieldsProps?.map(current => {
      const { value, type, name } = current

      const internalValueValidation = !!ValidInputValuesFunctionHelper[type]
        ? ValidInputValuesFunctionHelper[type](value)
        : true

      const isValid = !!validations[name]
        ? validations[name](value)
        : internalValueValidation

      return {
        name,
        value,
        valid: isValid,
      }
    }, {})
  }, [getFieldsProps, validations])

  const getFieldsValidities = useCallback(() => {
    return getFieldsPropsObject.reduce((previous, current) => {
      const { name, valid } = current

      return {
        ...previous,
        [name]: valid,
      }
    }, {})
  }, [getFieldsPropsObject])

  const getFieldsValues = useCallback(() => {
    const getFieldsPropsAsObject = getFieldsPropsObject.reduce(
      (previous, current) => {
        const { name, value } = current

        return {
          ...previous,
          [name]: value,
        }
      },
      {}
    )
    return getFieldsPropsAsObject as FieldsAndValues
  }, [getFieldsPropsObject])

  const checkIfAllFieldsAreValid = useCallback(() => {
    return !getFieldsPropsObject.some(field => !field.valid)
  }, [getFieldsPropsObject])

  return {
    getFieldsValues,
    getFieldsValidities,
    checkIfAllFieldsAreValid,
    getInputByName,
  }
}

export default useFieldsValidation
