import axios from 'axios';

import { loadingFlagDown, loadingFlagUp, store } from '../storeHelper';

import type { ApiResult, RequestOptions } from '../../lib/types/typeUtils';
import type { AxiosRequestConfig, Method } from 'axios';

// デフォルトのベースURL
const DEFAULT_BASE_URL = (process.env.EXPO_PUBLIC_API_BASE_URL ?? '') as string;

/* -----------------------------------------------
 * APIリクエスト処理
 * ----------------------------------------------- */

// リクエストヘッダー生成 処理
const setHeaders = (
  accessToken?: string,
  headers?: Record<string, string>,
): Record<string, string> => {
  // Bearerトークン 生成・取得
  const bearerToken =
    accessToken ??
    (typeof sessionStorage !== 'undefined'
      ? (sessionStorage.getItem('access_token') ?? undefined)
      : undefined);

  // リクエストヘッダー内容
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(bearerToken != null ? { Authorization: `Bearer ${bearerToken}` } : {}),
    ...headers,
  };
};

/*
 * リクエスト 処理
 */
export const request = async <TResponse = unknown, TRequest = unknown>(
  method: Method,
  apiPath: string,
  options: Omit<RequestOptions<TRequest>, 'apiPath' | 'method'> = {},
): Promise<ApiResult<TResponse>> => {
  const {
    requestData,
    params,
    headers,
    baseURL = DEFAULT_BASE_URL, // デフォルトのベースURL
    accessToken,
    isLoading = true,
  } = options;

  if (isLoading) store.dispatch(loadingFlagUp()); // ローディングフラグを上げる

  try {
    // リクエスト内容
    const requestConfig: AxiosRequestConfig = {
      method,
      url: `${baseURL}${apiPath}`,
      data: requestData,
      params,
      headers: setHeaders(accessToken, headers), // リクエストヘッダー生成
    };

    // リクエスト実行
    const response = await axios.request<TResponse>(requestConfig);
    return { success: true, response };
  } catch (error) {
    // エラーレスポンス
    if (axios.isAxiosError(error)) {
      return {
        error: {
          data: error.response?.data,
          message: error.message,
          status: error.response?.status,
        },
        success: false,
      };
    }
    throw error;
  } finally {
    if (isLoading) store.dispatch(loadingFlagDown()); // ローディングフラグを下げる
  }
};
