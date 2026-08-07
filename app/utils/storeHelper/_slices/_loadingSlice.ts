import { createSlice } from '@reduxjs/toolkit';

/* -----------------------------------------------
 * Loading（表示/非表示フラグ）用の Store
 * ----------------------------------------------- */

const loadingSlice = createSlice({
  initialState: { count: 0 },
  name: 'loading',
  reducers: {
    loadingFlagDown: (state) => {
      state.count = Math.max(0, state.count - 1);
    },
    loadingFlagUp: (state) => {
      state.count += 1;
    },
  },
});

export const { loadingFlagDown, loadingFlagUp } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
