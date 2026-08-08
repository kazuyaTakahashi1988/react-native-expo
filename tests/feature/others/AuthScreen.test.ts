import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthScreen } from '../../../app/features/others/auth';
import {
  findByProp,
  flushPromises,
  renderScreen,
  resetScreenTestState,
} from '../../screenTestUtils';

const { refreshAuthStateMock, signInMock, useAuthMock } = vi.hoisted(() => ({
  refreshAuthStateMock: vi.fn(),
  signInMock: vi.fn(),
  useAuthMock: vi.fn(),
}));

vi.mock('../../../app/utils/authHelper', () => ({
  signIn: signInMock,
  signOut: vi.fn(),
  signUp: vi.fn(),
  useAuth: useAuthMock,
  verify: vi.fn(),
}));

describe('AuthScreen', () => {
  beforeEach(() => {
    resetScreenTestState();
    signInMock.mockReset();
    refreshAuthStateMock.mockReset();
    useAuthMock.mockReturnValue({
      error: null,
      refreshAuthState: refreshAuthStateMock,
      status: 'guest',
    });
  });

  it('signs in with submitted values and refreshes auth state', async () => {
    signInMock.mockResolvedValueOnce({ isSignedIn: true });
    const tree = renderScreen(AuthScreen, {});

    (findByProp(tree, 'visible', true).onSubmit as () => void)();
    await flushPromises();

    expect(signInMock).toHaveBeenCalledWith({ email: '', password: '' });
    expect(refreshAuthStateMock).toHaveBeenCalledOnce();
  });
});
