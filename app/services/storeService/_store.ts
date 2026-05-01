import { configureStore } from '@reduxjs/toolkit';

import { articleReducer } from './_articleSlice';

export const store = configureStore({
  reducer: {
    article: articleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
