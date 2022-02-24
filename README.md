# form-handler-react

## Overview

   
##### A simple lightweight form handler made in React for simple forms wich can be integrated with your css styles and fields validations.

##### Installation

```bash
npm i form-handler-react
```
### Properties

| Prop                      | Description                                                                                                                                                                                                                                                                                                             | Default        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| **`onSubmit`**               |  Function to handle form data   
| **`validations`**               | A set of functions to validate inputs by name | none
| **`formStyle `**               | external form style | {}
| **`styleErrorParagraph`**               | external style for error display | {}
| **`styleErrorDiv`**               | external style for error container | {}
| **`classNameErrorDiv`**               | className for error container | none
| **` classNameErrorParagraph`**               | className for error display | none
| **`classNameForm`**               | className for form | none

## License

[MIT](https://choosealicense.com/licenses/mit/)

### How to use

```tsx
import React from 'react'

import Form from 'form-handler-react'

const View: React.FC = () => {
  return (
    <>
      <Form
        onSubmit={data => {
          console.log(data)
        }}
        styleErrorParagraph={{ color: 'red', fontWeight: 'bold' }}
        validations={{
          cpf: text => {
            const regex =
              /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/
            return regex.test(String(text))
          },
        }}
      >
        <div>
          <input name="name1" type="text" value="value" />
          <div>
            <input name="cpf" type="text" value="value" />
          </div>
        </div>
        <button
          style={{
            backgroundColor: 'blue',
            color: 'white',
            borderRadius: '16px',
            border: 'none',
            padding: '8px 16px',
          }}
          type="submit"
        >
          Salvar
        </button>
      </Form>
    </>
  )
}

export default View
```
