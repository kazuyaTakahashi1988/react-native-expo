import { afterEach, describe, expect, it, vi } from 'vitest';

import { request } from '../../app/utils/apiHelper/client';
import { store } from '../../app/utils/storeHelper';

const { isAxiosErrorMock, requestMock } = vi.hoisted(() => ({
  isAxiosErrorMock: vi.fn(),
  requestMock: vi.fn(),
}));

vi.mock('axios', () => ({
  default: { isAxiosError: isAxiosErrorMock, request: requestMock },
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('request', () => {
  it('builds a request and returns a successful response', async () => {
    const response = { data: { id: 1 }, headers: {}, status: 200 };
    requestMock.mockResolvedValueOnce(response);

    const result = await request('POST', '/articles', {
      accessToken: 'token',
      baseURL: 'https://example.com',
      headers: { 'X-Request-ID': 'request-id' },
      isLoading: false,
      params: { page: 2 },
      requestData: { title: 'title' },
    });

    expect(requestMock).toHaveBeenCalledWith({
      data: { title: 'title' },
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer token',
        'Content-Type': 'application/json',
        'X-Request-ID': 'request-id',
      },
      method: 'POST',
      params: { page: 2 },
      url: 'https://example.com/articles',
    });
    expect(result).toEqual({ ok: true, response });
  });

  it('normalizes Axios errors', async () => {
    const error = {
      message: 'Not found',
      response: { data: { code: 'missing' }, status: 404 },
    };
    requestMock.mockRejectedValueOnce(error);
    isAxiosErrorMock.mockReturnValueOnce(true);

    const result = await request('GET', '/missing', { isLoading: false });

    expect(result).toEqual({
      error: {
        data: { code: 'missing' },
        message: 'Not found',
        status: 404,
      },
      ok: false,
    });
  });

  it('rethrows errors that are not produced by Axios', async () => {
    const error = new Error('Unexpected');
    requestMock.mockRejectedValueOnce(error);
    isAxiosErrorMock.mockReturnValueOnce(false);

    await expect(
      request('GET', '/unexpected', { isLoading: false }),
    ).rejects.toBe(error);
  });

  it('balances the global loading counter after a request', async () => {
    const initialCount = store.getState().loading.count;
    requestMock.mockResolvedValueOnce({
      data: {},
      headers: {},
      status: 200,
    });

    const pendingRequest = request('GET', '/articles');
    expect(store.getState().loading.count).toBe(initialCount + 1);

    await pendingRequest;
    expect(store.getState().loading.count).toBe(initialCount);
  });
});
