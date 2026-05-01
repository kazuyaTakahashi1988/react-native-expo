import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getArticleApi, getCategorizedArticleApi } from '../apiService';

import type { RootState } from './_store';
import type { TypeArticle as TypeChild01Article } from '../../features/main/home/homeNest/child01/_type';
import type { TypeArticle as TypeChild02Article, TypeFormValues } from '../../features/main/home/homeNest/child02/_type';

type TypeArticleState = {
  articles: TypeChild01Article | null;
  categorizedArticles: TypeChild02Article | null;
  loadingCount: number;
  errorMessage: string | null;
};

const initialState: TypeArticleState = {
  articles: null,
  categorizedArticles: null,
  loadingCount: 0,
  errorMessage: null,
};

export const fetchArticles = createAsyncThunk('article/fetchArticles', async () => {
  const result = await getArticleApi();
  return result.data as TypeChild01Article;
});

export const fetchCategorizedArticles = createAsyncThunk(
  'article/fetchCategorizedArticles',
  async (values: TypeFormValues) => {
    const params = {
      post: 'custompost',
      'taxCategory01[]': values.taxCategory01,
      'taxCategory02[]': values.taxCategory02,
      'taxCategory03[]': values.taxCategory03,
    };

    const result = await getCategorizedArticleApi(params);
    return result.data as TypeChild02Article;
  },
);

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    clearArticles: (state) => {
      state.articles = null;
      state.categorizedArticles = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loadingCount += 1;
        state.errorMessage = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loadingCount = Math.max(state.loadingCount - 1, 0);
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loadingCount = Math.max(state.loadingCount - 1, 0);
        state.errorMessage = action.error.message ?? 'Failed to fetch articles';
      })
      .addCase(fetchCategorizedArticles.pending, (state) => {
        state.loadingCount += 1;
        state.errorMessage = null;
      })
      .addCase(fetchCategorizedArticles.fulfilled, (state, action) => {
        state.loadingCount = Math.max(state.loadingCount - 1, 0);
        state.categorizedArticles = action.payload;
      })
      .addCase(fetchCategorizedArticles.rejected, (state, action) => {
        state.loadingCount = Math.max(state.loadingCount - 1, 0);
        state.errorMessage = action.error.message ?? 'Failed to fetch categorized articles';
      });
  },
});

export const { clearArticles } = articleSlice.actions;
export const articleReducer = articleSlice.reducer;

export const selectArticles = (state: RootState) => state.article.articles;
export const selectCategorizedArticles = (state: RootState) => state.article.categorizedArticles;
export const selectIsApiLoading = (state: RootState) => state.article.loadingCount > 0;
