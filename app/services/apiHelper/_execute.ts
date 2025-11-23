import axios from 'axios';

import type { TypeOptions } from '../../lib/types/typeService';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const DEFAULT_API_BASE_URL = 'https://wp.empty-service.com';

const setUrl = (baseURL: string, apiPath: string): string => {
  if (apiPath.startsWith('http://') || apiPath.startsWith('https://')) {
    return apiPath;
  }

  const normalizedBase = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
  const normalizedPath = apiPath.startsWith('/') ? apiPath.slice(1) : apiPath;

  return `${normalizedBase}/${normalizedPath}`;
};

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

export const execute = async <TResponse = unknown, TRequest = unknown>(
  options: TypeOptions<TRequest>,
): Promise<AxiosResponse<TResponse>> => {
  const {
    apiPath,
    method,
    requestData,
    params,
    headers,
    baseURL = DEFAULT_API_BASE_URL,
    accessToken,
  } = options;

  const requestConfig: AxiosRequestConfig = {
    method,
    url: setUrl(baseURL, apiPath),
    data: requestData,
    params,
    headers: setHeaders(accessToken, headers),
  };

  try {
    return await axios.request<TResponse>(requestConfig);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data ?? error.message;

      console.error('API request failed', message);
      throw error;
    }

    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('API request failed', message);
    throw error instanceof Error ? error : new Error(message);
  }
};

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
  });

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
  });

// テストゲットAPI（てきとーなやつ）
export const getArticleApi = <TResponse = unknown>() =>
  getApi<TResponse>('/wp-json/wp/v2/posts');
