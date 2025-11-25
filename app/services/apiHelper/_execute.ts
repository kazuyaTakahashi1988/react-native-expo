import axios from 'axios';

import type { TypeOptions, TypeParams } from '../../lib/types/typeService';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

/* -----------------------------------------------
 * API処理
 * ----------------------------------------------- */

// デフォルトのベースURL
const DEFAULT_BASE_URL = 'http://wp.empty-service.com';

// API通信の実行処理
export const execute = async <TResponse = unknown, TRequest = unknown>(
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
  } catch (error) {
    const axiosError = error as AxiosError;
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

// GET通信
export const getApi = async <TResponse = unknown>(
  apiPath: string,
  params?: Record<string, unknown>,
  options: Omit<TypeOptions<never>, 'apiPath' | 'method' | 'params'> = {},
): Promise<AxiosResponse<TResponse>> =>
  execute<TResponse, never>({
    apiPath,
    method: 'GET',
    params,
    ...options,
  }); // API通信の実行処理

// POST通信
export const postApi = async <TResponse = unknown, TRequest = unknown>(
  apiPath: string,
  requestData?: TRequest,
  options: Omit<TypeOptions<TRequest>, 'apiPath' | 'method' | 'requestData'> = {},
): Promise<AxiosResponse<TResponse>> =>
  execute<TResponse, TRequest>({
    apiPath,
    method: 'POST',
    requestData,
    ...options,
  }); // API通信の実行処理

/* -----------------------------------------------
 * 各API（並べくswaggerの順序と揃える）
 * ----------------------------------------------- */

// 記事を取得するAPI（てきとーなやつ）
export const getArticleApi = () => {
  return getApi('/wp-json/wp/v2/posts'); // DEFAULT_BASE_URL を使う例
};

// クエリパラムを使用して記事を取得するAPI（てきとーなやつ）
export const getCategorizedArticleApi = (params: TypeParams) => {
  const options = { baseURL: 'http://search-wp.empty-service.com' };
  return getApi('/wp-json/wp/v2/org_api', params, options); // DEFAULT_BASE_URL を使わない例
};

/*
 * export const postXXXXApi = (requestData: TypeXXXX) => {
 *  return postApi('/XXXX/XXXX', requestData);
 * };
 */
