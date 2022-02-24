import { ReactNode } from 'react'

const CheckIfElementIsObject = (value: ReactNode): boolean => {
  return typeof value === 'object'
}

export default CheckIfElementIsObject
