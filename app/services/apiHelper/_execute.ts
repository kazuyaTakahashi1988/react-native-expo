import axios from 'axios';

import type { TypeOptions, TypeParams } from '../../lib/types/typeService';
import type { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

/* -----------------------------------------------
 * APIヘルパー
 * ----------------------------------------------- */

// デフォルトのベースURL（EXPO_PUBLIC_ 付き環境変数を優先）
const DEFAULT_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://wp.empty-service.com';

/*
 * APIリクエスト 実行処理
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
  } = options;

  const requestConfig: AxiosRequestConfig = {
    method,
    url: `${baseURL}${apiPath}`,
    data: requestData,
    params,
    headers: setHeaders(accessToken, headers), // ヘッダー情報のセット
  };

  try {
    return await axios.request<TResponse>(requestConfig);
  } catch (err) {
    const axiosError = err as AxiosError;
    const message = axiosError.response?.data ?? axiosError.message;

    console.error('API request failed', message);
    throw axiosError;
  }
};

// ヘッダー情報のセット
const setHeaders = (
  accessToken?: string,
  headers?: Record<string, string>,
): Record<string, string> => {
  const bearerToken =
    accessToken ??
    (typeof sessionStorage !== 'undefined'
      ? (sessionStorage.getItem('access_token') ?? undefined)
      : undefined);

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(bearerToken != null ? { Authorization: `Bearer ${bearerToken}` } : {}),
    ...headers,
  };
};

/*
 * APIリクエスト（フォーマット） 処理
 */
const request = async <TResponse = unknown, TRequest = unknown>(
  method: Method,
  apiPath: string,
  options: Omit<TypeOptions<TRequest>, 'apiPath' | 'method'> = {},
): Promise<AxiosResponse<TResponse>> =>
  execute<TResponse, TRequest>({
    method,
    apiPath,
    ...options,
  }); // APIリクエスト 実行処理

/* -----------------------------------------------
 * 各 APIリクエスト
 * （並べくswaggerの順序と揃える）
 * ----------------------------------------------- */

// 記事取得API
export const getArticleApi = () => {
  return request('GET', '/wp-json/wp/v2/posts');
};

// クエリパラム使用の記事取得API
export const getCategorizedArticleApi = (params: TypeParams) => {
  const options = {
    params,
    baseURL: 'https://search-wp.empty-service.com',
  };
  return request('GET', '/wp-json/wp/v2/org_api', options);
};

/*
 * export const postXXXXApi = (params, baseURL, headers, requestData, accessToken) => {
 *  const options = {
 *    params // クエリパラム
 *    baseURL // DEFAULT_BASE_URL 使わない際のベースURL
 *    headers // 追加ヘッダー情報を付与
 *    requestData // リクエストデータ（リクエストボディ）
 *    accessToken // アクセストークン
 *  };
 *  return request('POST', '/xxxx/xxxx', options);
 * };
 */
