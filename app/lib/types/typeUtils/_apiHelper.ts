import type { Method } from 'axios';

export type AppErrorType =
  | 'cancelled'
  | 'network'
  | 'server'
  | 'unauthorized'
  | 'validation';

export class AppError extends Error {
  public readonly cause: unknown;
  public readonly data: unknown;
  public readonly status?: number;
  public readonly type: AppErrorType;

  public constructor(options: {
    cause: unknown;
    data?: unknown;
    message: string;
    status?: number;
    type: AppErrorType;
  }) {
    super(options.message);
    this.name = 'AppError';
    this.cause = options.cause;
    this.data = options.data;
    this.status = options.status;
    this.type = options.type;
  }
}

export type TypeOptions<TRequest> = {
  apiPath: string;
  method: Method;
  requestData?: TRequest;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  baseURL?: string;
  accessToken?: string;
  isLoading?: boolean;
};

export type TypeParams = {
  post: string;
  'taxCategory01[]'?: string[];
  'taxCategory02[]'?: string[];
  'taxCategory03[]'?: string[];
};
