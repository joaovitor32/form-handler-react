import { ChildrenArray, Validations, EnrichedChildren, UseFieldsAndValidationsHookFunctions, FieldsAndValues } from '../types';
declare const useFieldsValidation: (validations: Validations, childrenArray: ChildrenArray<EnrichedChildren>) => UseFieldsAndValidationsHookFunctions<EnrichedChildren, FieldsAndValues>;
export default useFieldsValidation;
