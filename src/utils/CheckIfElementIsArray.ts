import { ReactNode } from 'react'

const CheckIfElementIsArray = (value: ReactNode): boolean => {
  return Object.prototype.toString.call(value) === '[object Array]'
}

export default CheckIfElementIsArray
