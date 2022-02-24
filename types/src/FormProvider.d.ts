/// <reference types="react" />
import { FormProps, FieldsAndValues, Validations } from './types';
declare const Form: ({ onSubmit, children, validations, formStyle, styleErrorParagraph, styleErrorDiv, classNameErrorDiv, classNameErrorParagraph, classNameForm, }: FormProps<FieldsAndValues, Validations>) => JSX.Element;
export default Form;
