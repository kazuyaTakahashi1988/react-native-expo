import axios from 'axios';

import { loadingFlagDown, loadingFlagUp, store } from '../storeService';

import type { TypeOptions } from '../../lib/types/typeService';
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

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
 * リクエスト実行 処理
 */
const execute = async <TResponse = unknown, TRequest = unknown>(
  options: TypeOptions<TRequest>,
): Promise<AxiosResponse<TResponse>> => {
  const {
    apiPath,
    method,
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

    // リクエストを実行
    return await axios.request<TResponse>(requestConfig);
  } catch (err) {
    const axiosError = err as AxiosError;
    const message = axiosError.response?.data ?? axiosError.message;

    console.error('API request failed', message);
    throw axiosError;
  } finally {
    if (isLoading) store.dispatch(loadingFlagDown()); // ローディングフラグを下げる
  }
};

/*
 * APIリクエスト（フォーマット） 処理
 */
export const request = async <TResponse = unknown, TRequest = unknown>(
  method: Method,
  apiPath: string,
  options: Omit<TypeOptions<TRequest>, 'apiPath' | 'method'> = {},
): Promise<AxiosResponse<TResponse>> =>
  // リクエスト実行
  execute<TResponse, TRequest>({
    method,
    apiPath,
    ...options,
  });
