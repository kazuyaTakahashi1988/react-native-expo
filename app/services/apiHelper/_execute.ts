import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

const DEFAULT_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? '';

type ExecuteOptions<TRequest> = {
  apiPath: string;
  method: Method;
  requestData?: TRequest;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  baseURL?: string;
  accessToken?: string;
};

const normalizeUrl = (baseURL: string, apiPath: string): string => {
  if (apiPath.startsWith('http://') || apiPath.startsWith('https://')) {
    return apiPath;
  }

  const normalizedBase = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
  const normalizedPath = apiPath.startsWith('/') ? apiPath.slice(1) : apiPath;

  return `${normalizedBase}/${normalizedPath}`;
};

const buildHeaders = (accessToken?: string, headers?: Record<string, string>): Record<string, string> => {
  const bearerToken =
    accessToken ??
    (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('access_token') ?? undefined : undefined);

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
    ...headers,
  };
};

export const execute = async <TResponse = unknown, TRequest = unknown>(
  options: ExecuteOptions<TRequest>,
): Promise<AxiosResponse<TResponse>> => {
  const { apiPath, method, requestData, params, headers, baseURL = DEFAULT_API_BASE_URL, accessToken } = options;

  const requestConfig: AxiosRequestConfig = {
    method,
    url: normalizeUrl(baseURL, apiPath),
    data: requestData,
    params,
    headers: buildHeaders(accessToken, headers),
  };

  try {
    return await axios.request<TResponse>(requestConfig);
  } catch (error) {
    const axiosError = error as AxiosError;
    const message = axiosError.response?.data ?? axiosError.message;

    // eslint-disable-next-line no-console
    console.error('API request failed', message);
    throw axiosError;
  }
};

export const getApi = async <TResponse = unknown>(
  apiPath: string,
  params?: Record<string, unknown>,
  options: Omit<ExecuteOptions<never>, 'apiPath' | 'method' | 'params'> = {},
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
  options: Omit<ExecuteOptions<TRequest>, 'apiPath' | 'method' | 'requestData'> = {},
): Promise<AxiosResponse<TResponse>> =>
  execute<TResponse, TRequest>({
    apiPath,
    method: 'POST',
    requestData,
    ...options,
  });

export const putApi = async <TResponse = unknown, TRequest = unknown>(
  apiPath: string,
  requestData?: TRequest,
  options: Omit<ExecuteOptions<TRequest>, 'apiPath' | 'method' | 'requestData'> = {},
): Promise<AxiosResponse<TResponse>> =>
  execute<TResponse, TRequest>({
    apiPath,
    method: 'PUT',
    requestData,
    ...options,
  });

export const deleteApi = async <TResponse = unknown>(
  apiPath: string,
  params?: Record<string, unknown>,
  options: Omit<ExecuteOptions<never>, 'apiPath' | 'method' | 'params'> = {},
): Promise<AxiosResponse<TResponse>> =>
  execute<TResponse, never>({
    apiPath,
    method: 'DELETE',
    params,
    ...options,
  });
