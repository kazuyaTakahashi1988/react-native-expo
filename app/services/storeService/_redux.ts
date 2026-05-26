import { configureStore, createSlice } from '@reduxjs/toolkit';

import type { TypeState } from '../../lib/types/typeService';

/* -----------------------------------------------
 * Store管理（Redux）処理
 * ----------------------------------------------- */

const initialState: TypeState = {
  loadingFlagCount: 0,
  // dummyString: '',
  // dummyFlag: false,
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
    // dummyStringSet: (state: TypeState, action: { payload: string }) => {
    //   state.dummyString = action.payload;
    // },
    // dummyFlagSet: (state: TypeState, action: { payload: boolean }) => {
    //   state.dummyFlag = action.payload;
    // },
  },
});

export const {
  loadingFlagUp,
  loadingFlagDown,
  // dummyStringSet,
  // dummyFlagSet
} = appSlice.actions;

export const store = configureStore({ reducer: appSlice.reducer });
