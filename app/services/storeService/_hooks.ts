import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './_store';
import type { TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
