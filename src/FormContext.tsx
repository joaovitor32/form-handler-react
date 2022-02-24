import { createContext } from 'react'

import { FormContextInterface } from './types'

const FormContext = createContext<FormContextInterface>(
  {} as FormContextInterface
)

export default FormContext
