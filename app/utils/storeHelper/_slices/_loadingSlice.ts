import { createSlice } from '@reduxjs/toolkit';

/* -----------------------------------------------
 * Loading（表示/非表示フラグ）用の Store
 * ----------------------------------------------- */

const loadingSlice = createSlice({
  // ストアの初期値
  initialState: { count: 0 },
  // ストアの名前
  name: 'loading',
  // ストアの値を更新する関数群
  reducers: {
    loadingFlagDown: (state) => {
      state.count = Math.max(0, state.count - 1);
    },
    loadingFlagUp: (state) => {
      state.count += 1;
    },
    // loadingFlagXxxx: (state) => {},
  },
});

export const {
  loadingFlagDown,
  loadingFlagUp,
  // loadingFlagXxxx:
} = loadingSlice.actions;

export const loadingReducer = loadingSlice.reducer;
