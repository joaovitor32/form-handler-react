import { FormEvent, ReactNode, FormHTMLAttributes, CSSProperties, ReactChildren, ReactElement, JSXElementConstructor } from 'react';
export declare type FormInterface = FormHTMLAttributes<HTMLFormElement>;
export declare type EventInterface = React.FormEvent<HTMLInputElement>;
export declare type ChildrenArray<T> = React.ReactElement<T, string | React.JSXElementConstructor<any>>[] | null | undefined;
export interface Validations {
    [key: string]: (data: Record<string, any>) => any;
}
export interface FieldsAndValues {
    name: string;
    valid: boolean;
    value: any;
}
export interface ObjectFieldsAndValues<T> {
    [key: string]: Readonly<T>;
}
export interface FormProps<T, U> {
    validations?: U;
    children: ReactNode;
    onSubmit: (data: T) => void;
    styleErrorParagraph?: CSSProperties;
    styleErrorDiv?: CSSProperties;
    formStyle?: CSSProperties;
    classNameErrorDiv?: string;
    classNameErrorParagraph?: string;
    classNameForm?: string;
}
export interface FormContextInterface extends FormInterface {
    handleSubmit: (event: FormEvent) => void;
}
export interface EnrichedChildren {
    onChange(): void;
    selectedValue: string;
    name: string;
    value: any;
    type: string;
    children?: ReactNode;
    props?: any;
}
export interface FormattedChildrenHook<T> {
    formattedChildrenState: T;
    updateFormattedChildren: (data: T) => any;
}
export interface Actions<T> {
    type: string;
    formattedChildren: Readonly<T>;
}
export interface ActionTypes {
    update: 'update';
}
export interface ReducerState<T> {
    formattedChildren: Readonly<T>;
    setNewFormattedChildren: (obj: ReactChildren) => void;
}
export interface UseFieldsAndValidationsHookFunctions<T, U> {
    getFieldsValues: () => U;
    getFieldsValidities: () => Record<string, unknown>;
    checkIfAllFieldsAreValid: () => boolean;
    getInputByName: (name: string) => ReactElement<T, string | JSXElementConstructor<any>> | undefined;
}
