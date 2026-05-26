import type { store } from '../../../services/storeService';

export type TypeSelectorState = ReturnType<typeof store.getState>;
export type TypeDispatch = typeof store.dispatch;

export type TypeState = {
  loadingFlagCount: number;
};
