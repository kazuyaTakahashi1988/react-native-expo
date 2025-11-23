import type { Method } from 'axios';

export type TypeOptions<TRequest> = {
  apiPath: string;
  method: Method;
  requestData?: TRequest;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  baseURL?: string;
  accessToken?: string;
};
