import React, {
  cloneElement,
  FormEvent,
  useCallback,
  useMemo,
  ReactElement,
  createElement,
} from 'react'

import FormContext from './FormContext'
import useFieldsAndValidations from './hooks/useFieldsAndValidations'
import useFormattedChildren from './hooks/useFormattedChildren'
import {
  FormProps,
  EnrichedChildren,
  EventInterface,
  FieldsAndValues,
  Validations,
} from './types'
import CheckIfElementIsArray from './utils/CheckIfElementIsArray'
import CheckIfElementIsObject from './utils/CheckIfElementIsObject'
const Form = ({
  onSubmit,
  children = {},
  validations = {},
  formStyle = {},
  styleErrorParagraph = {},
  styleErrorDiv = {},
  classNameErrorDiv = '',
  classNameErrorParagraph = '',
  classNameForm = '',
}: FormProps<FieldsAndValues, Validations>) => {
  const { formattedChildrenState, updateFormattedChildren } =
    useFormattedChildren(children)

  const {
    getFieldsValues,
    getFieldsValidities,
    checkIfAllFieldsAreValid,
    getInputByName,
  } = useFieldsAndValidations(validations, formattedChildrenState)

  const createInput = useCallback(
    (elementChild, onChangeInput) => {
      const { props } = elementChild
      const { name } = props

      const fieldsValidities = getFieldsValidities()

      if (elementChild.type !== 'input') {
        return elementChild
      }

      const clonedInput = cloneElement(
        elementChild as ReactElement<EnrichedChildren>,
        {
          ...Object.assign({
            ...props,
            onChange: onChangeInput,
          }),
        }
      )

      return createElement(
        'div',
        {
          key: `${name}-div`,
          className: classNameErrorDiv,
          style: styleErrorDiv,
        },
        clonedInput,
        createElement(
          'p',
          {
            key: `${name}-p`,
            className: classNameErrorParagraph,
            style: styleErrorParagraph,
          },
          !fieldsValidities[name] && `The field ${name} has an invalid value`
        )
      )
    },
    [
      classNameErrorDiv,
      classNameErrorParagraph,
      getFieldsValidities,
      styleErrorDiv,
      styleErrorParagraph,
    ]
  )
  const getInnerChildrenRecursively = useCallback(
    (element, handleInput, inputModifier) => {
      if (CheckIfElementIsArray(element.props.children)) {
        return element.props.children?.map(child => {
          const innerChildren = getInnerChildrenRecursively(
            child,
            handleInput,
            inputModifier
          )
          return CheckIfElementIsArray(child.props.children)
            ? cloneElement(child, {
                children: innerChildren,
              })
            : innerChildren
        })
      }

      if (CheckIfElementIsObject(element.props.children)) {
        const innerChild = getInnerChildrenRecursively(
          element.props.children,
          handleInput,
          inputModifier
        )
        return cloneElement(element, {
          children: innerChild,
        })
      }

      return handleInput(element, inputModifier)
    },
    []
  )

  const setNewInput = useCallback((element, newInput) => {
    if (element.props.name === newInput.props.name) {
      return newInput
    }
    return element
  }, [])

  const getNewFormatedChildren = useCallback(
    newInput => {
      return formattedChildrenState?.map(child => {
        const innerChildren = getInnerChildrenRecursively(
          child,
          setNewInput,
          newInput
        )

        return CheckIfElementIsArray(child.props.children)
          ? cloneElement(child, {
              children: innerChildren,
            })
          : innerChildren
      })
    },
    [formattedChildrenState, getInnerChildrenRecursively, setNewInput]
  )

  const onChangeInputValue = useCallback(
    (e: EventInterface) => {
      const input = getInputByName(e.currentTarget.name)

      const transformedInput = Object.assign({
        ...input,
        props: {
          ...input?.props,
          value: e.currentTarget.value,
        },
      })

      const newForm = getNewFormatedChildren(transformedInput)
      updateFormattedChildren(newForm)
    },
    [getInputByName, updateFormattedChildren, getNewFormatedChildren]
  )

  const getFormChildren = useMemo(() => {
    return formattedChildrenState?.map(child => {
      const innerChildren = getInnerChildrenRecursively(
        child,
        createInput,
        onChangeInputValue
      )
      return CheckIfElementIsArray(child.props.children)
        ? cloneElement(child, {
            children: innerChildren,
          })
        : innerChildren
    })
  }, [
    createInput,
    formattedChildrenState,
    getInnerChildrenRecursively,
    onChangeInputValue,
  ])

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()

      const allFieldsValid = checkIfAllFieldsAreValid()
      const fieldsValues = getFieldsValues()

      if (allFieldsValid) onSubmit(fieldsValues)
    },
    [checkIfAllFieldsAreValid, getFieldsValues, onSubmit]
  )

  return (
    <FormContext.Provider value={{ handleSubmit }}>
      <FormContext.Consumer>
        {({ handleSubmit }) => (
          <form
            style={formStyle}
            className={classNameForm}
            onSubmit={handleSubmit}
          >
            {getFormChildren}
          </form>
        )}
      </FormContext.Consumer>
    </FormContext.Provider>
  )
}

export default Form
