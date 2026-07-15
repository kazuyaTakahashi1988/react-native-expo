import { configureStore, createSlice } from '@reduxjs/toolkit';

import type { TypeState } from '../../lib/types/typeService';

/* -----------------------------------------------
 * Store管理（Redux）処理
 * ----------------------------------------------- */

const initialState: TypeState = {
  loadingFlagCount: 0,
  exampleString: '',
  exampleFlag: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadingFlagUp: (state: TypeState) => {
      state.loadingFlagCount += 1;
    },
    loadingFlagDown: (state: TypeState) => {
      state.loadingFlagCount = Math.max(0, state.loadingFlagCount - 1);
    },
    exampleStringSet: (state: TypeState, action: { payload: string }) => {
      state.exampleString = action.payload;
    },
    exampleFlagSet: (state: TypeState, action: { payload: boolean }) => {
      state.exampleFlag = action.payload;
    },
  },
});

export const { loadingFlagUp, loadingFlagDown, exampleStringSet, exampleFlagSet } =
  appSlice.actions;

export const store = configureStore({ reducer: appSlice.reducer });
