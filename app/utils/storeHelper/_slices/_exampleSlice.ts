import { createSlice } from '@reduxjs/toolkit';

/* -----------------------------------------------
 * redux-toolkit Example 画面用のサンプル Store
 * ----------------------------------------------- */

const exampleSlice = createSlice({
  // ストアの初期値
  initialState: { exampleFlag: false, exampleString: '' /* exampleXxxx: '' */ },
  // ストアの名前
  name: 'example',
  // ストアの値を更新する関数群
  reducers: {
    exampleFlagSet: (state, action: { payload: boolean }) => {
      state.exampleFlag = action.payload;
    },
    exampleStringSet: (state, action: { payload: string }) => {
      state.exampleString = action.payload;
    },
    // exampleXxxxSet: (state, action: { payload: xxxx }) => {
    //   state.exampleXxxx = action.payload;
    // },
  },
});

export const {
  exampleFlagSet,
  exampleStringSet,
  // exampleXxxxSet
} = exampleSlice.actions;

export const exampleReducer = exampleSlice.reducer;
