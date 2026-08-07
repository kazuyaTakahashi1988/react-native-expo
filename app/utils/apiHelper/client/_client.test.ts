import axios from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { request } from './_client';
import { AppError } from '../../../lib/types/typeUtils';
import { store } from '../../storeHelper';

vi.mock('axios', () => ({
  default: {
    isAxiosError: (error: unknown) =>
      typeof error === 'object' && error !== null && 'isAxiosError' in error,
    isCancel: (error: unknown) =>
      typeof error === 'object' &&
      error !== null &&
      'cancelled' in error &&
      error.cancelled === true,
    request: vi.fn(),
  },
}));

const mockedRequest = vi.spyOn(axios, 'request');

afterEach(() => {
  vi.clearAllMocks();
});

describe('request', () => {
  it('uses explicit access tokens without reading browser storage', async () => {
    const response = { data: { id: 1 }, status: 200 };
    mockedRequest.mockResolvedValue(response);

    await expect(
      request('GET', '/articles', { accessToken: 'test-token' }),
    ).resolves.toBe(response);

    const requestConfig = mockedRequest.mock.calls[0][0];
    expect(requestConfig.headers).toEqual({
      Accept: 'application/json',
      Authorization: 'Bearer test-token',
      'Content-Type': 'application/json',
    });
    expect(requestConfig.url).toBe('https://api.example.com/articles');
    expect(store.getState().loading.count).toBe(0);
  });

  it('keeps loading state balanced when a request fails', async () => {
    mockedRequest.mockRejectedValue({
      isAxiosError: true,
      message: 'Service unavailable',
      response: { data: { code: 'unavailable' }, status: 503 },
    });
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const result = request('GET', '/articles');

    await expect(result).rejects.toMatchObject({
      data: { code: 'unavailable' },
      name: 'AppError',
      status: 503,
      type: 'server',
    });
    await expect(result).rejects.toBeInstanceOf(AppError);
    expect(store.getState().loading.count).toBe(0);
  });

  it.each([
    [undefined, 'network'],
    [401, 'unauthorized'],
    [422, 'validation'],
  ] as const)('maps status %s to %s errors', async (status, type) => {
    mockedRequest.mockRejectedValue({
      isAxiosError: true,
      message: 'Request failed',
      ...(status === undefined ? {} : { response: { status } }),
    });
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    await expect(request('GET', '/articles')).rejects.toMatchObject({ type });
  });
});
