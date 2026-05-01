import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from './_store';

type TypeLoadingState = {
  isLoading: boolean;
};

const initialState: TypeLoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;

export const selectIsApiLoading = (state: RootState) => state.loading.isLoading;
