import { ReactNode } from 'react';
import { EnrichedChildren, ChildrenArray, FormattedChildrenHook } from '../types';
declare const useFormattedChildren: (children: ReactNode) => FormattedChildrenHook<ChildrenArray<EnrichedChildren>>;
export default useFormattedChildren;
