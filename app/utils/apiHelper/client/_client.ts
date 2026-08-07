import axios from 'axios';

import { env } from '../../../lib/env';
import { AppError } from '../../../lib/types/typeUtils';
import { loadingFlagDown, loadingFlagUp, store } from '../../storeHelper';

import type { TypeOptions } from '../../../lib/types/typeUtils';
import type { AppErrorType } from '../../../lib/types/typeUtils';
import type { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

// デフォルトのベースURL
const DEFAULT_BASE_URL = env.apiBaseUrl;

/* -----------------------------------------------
 * APIリクエスト処理
 * ----------------------------------------------- */

// リクエストヘッダー生成 処理
const setHeaders = (
  accessToken?: string,
  headers?: Record<string, string>,
): Record<string, string> => {
  // リクエストヘッダー内容
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(accessToken != null ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...headers,
  };
};

/*
 * リクエスト 処理
 */
export const request = async <TResponse = unknown, TRequest = unknown>(
  method: Method,
  apiPath: string,
  options: Omit<TypeOptions<TRequest>, 'apiPath' | 'method'> = {},
): Promise<AxiosResponse<TResponse>> => {
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
    return await axios.request<TResponse>(requestConfig);
  } catch (error: unknown) {
    const appError = toAppError(error);
    console.error('API request failed', appError.message);
    throw appError;
  } finally {
    if (isLoading) store.dispatch(loadingFlagDown()); // ローディングフラグを下げる
  }
};

const toAppError = (error: unknown): AppError => {
  if (!axios.isAxiosError(error)) {
    return new AppError({
      cause: error,
      message: error instanceof Error ? error.message : 'Unexpected API error',
      type: 'server',
    });
  }

  const status = error.response?.status;
  const data: unknown = error.response?.data;
  const type = getAxiosErrorType(error, status);

  return new AppError({
    cause: error,
    data,
    message: error.message,
    status,
    type,
  });
};

const getAxiosErrorType = (
  error: unknown,
  status: number | undefined,
): AppErrorType => {
  if (axios.isCancel(error)) return 'cancelled';
  if (!axios.isAxiosError(error) || error.response === undefined) {
    return 'network';
  }
  if (status === 401 || status === 403) return 'unauthorized';
  if (status === 400 || status === 422) return 'validation';
  return 'server';
};
