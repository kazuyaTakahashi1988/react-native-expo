import type { Method } from 'axios';

export type ApiError = {
  data?: unknown;
  message: string;
  status?: number;
};

export type ApiSuccess<T> = { data: T; headers: unknown; status: number };
export type ApiResult<T> =
  | { error: ApiError; success: false }
  | { success: true; response: ApiSuccess<T> };

export type RequestOptions<TRequest> = {
  accessToken?: string;
  apiPath: string;
  baseURL?: string;
  headers?: Record<string, string>;
  isLoading?: boolean;
  method: Method;
  params?: Record<string, unknown>;
  requestData?: TRequest;
};

export type TypeParams = {
  post: string;
  'taxCategory01[]'?: string[];
  'taxCategory02[]'?: string[];
  'taxCategory03[]'?: string[];
};
