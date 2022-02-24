import {
  Children,
  useMemo,
  ReactNode,
  useCallback,
  useReducer,
  ReactChildren,
} from 'react'

import {
  ActionTypes,
  Actions,
  ReducerState,
  EnrichedChildren,
  ChildrenArray,
  FormattedChildrenHook,
} from '../types'

const ACTION_TYPES: ActionTypes = {
  update: 'update',
}

const formattedChildrenReducer = (
  state: ReducerState<ReactChildren>,
  { type, formattedChildren }: Actions<ReactChildren>
): any => {
  switch (type) {
    case ACTION_TYPES.update:
      return { ...state, formattedChildren }
    default:
      return state
  }
}

const useFormattedChildren = (
  children: ReactNode
): FormattedChildrenHook<ChildrenArray<EnrichedChildren>> => {
  const getChildren = useMemo(() => {
    return Children.map(children, child => {
      return child
    })
  }, [children])

  const [formattedChildrenState, dispatch] = useReducer(
    formattedChildrenReducer,
    {
      formattedChildren: getChildren,
    }
  )

  const updateFormattedChildren = useCallback(formattedChildren => {
    dispatch({
      type: 'update',
      formattedChildren,
    })
  }, [])

  return {
    formattedChildrenState: formattedChildrenState.formattedChildren,
    updateFormattedChildren,
  }
}

export default useFormattedChildren
