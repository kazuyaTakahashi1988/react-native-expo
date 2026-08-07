import { createSlice } from '@reduxjs/toolkit';

/* -----------------------------------------------
 * redux-toolkit Example 画面用のサンプル Store
 * ----------------------------------------------- */

const exampleSlice = createSlice({
  initialState: { exampleFlag: false, exampleString: '' },
  name: 'example',
  reducers: {
    exampleFlagSet: (state, action: { payload: boolean }) => {
      state.exampleFlag = action.payload;
    },
    exampleStringSet: (state, action: { payload: string }) => {
      state.exampleString = action.payload;
    },
  },
});

export const { exampleFlagSet, exampleStringSet } = exampleSlice.actions;
export const exampleReducer = exampleSlice.reducer;
