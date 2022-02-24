//Maybe would be nice to improve this function
const TextValidation = (value: string): boolean => {
  return !!value && typeof value === 'string'
}

const RegexValidation = (value: any, regex: RegExp): boolean => {
  return regex.test(value)
}

const helper = {
  text: (value: string): boolean => TextValidation(value),
  search: (value: string): boolean => TextValidation(value),
  password: (value: string): boolean => TextValidation(value),
  email: (email: string): boolean =>
    RegexValidation(
      email,
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  week: (week: string): boolean =>
    RegexValidation(week, /^(\d{1,4}[-][W]\d{2}){1}$/),
  number: (number: string): boolean => RegexValidation(number, /^[1-9]\d*$/gm),
  time: (time: string): boolean =>
    RegexValidation(time, /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/gm),
  range: (range: string): boolean => RegexValidation(range, /^[1-9]\d*$/gm),
  color: (color: string): boolean => RegexValidation(color, /^#[0-9A-F]{6}$/i),
  month: (month: string): boolean =>
    RegexValidation(month, /^(\d{1,4}[-]\d{2}){1}$/),
  date: (date: string): boolean =>
    RegexValidation(
      date,
      /^20[0-2][0-9]-((0[1-9])|(1[0-2]))-([0-2][1-9]|3[0-1])$/gm
    ),
  tel: (telephone: string): boolean =>
    RegexValidation(
      telephone,
      /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/
    ),
  url: (url: string): boolean =>
    RegexValidation(
      url,
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    ),
  'datetime-local': (datetime: string): boolean =>
    RegexValidation(
      datetime,
      /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])[T](00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/
    ),
  checkbox: (value: any): boolean => !!value,
  radio: (value: any): boolean => !!value,
}

export default helper
