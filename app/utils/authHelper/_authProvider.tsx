import { fetchAuthSession } from 'aws-amplify/auth';
import React from 'react';

import type { TypeAuthContext } from '../../lib/types/typeUtils';
import type { TypeAuthStatus } from '../../lib/types/typeUtils';

/* -----------------------------------------------
 * Auth用 Provider
 * ----------------------------------------------- */

export const AuthContext = React.createContext<TypeAuthContext | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [authStatus, setAuthStatus] =
    React.useState<TypeAuthStatus>('initializing');

  /*
   * Auth状態を更新するための関数
   * ユーザーのサインイン状態を確認し、authStatus を更新する。
   */
  const refreshAuthState = React.useCallback(async () => {
    try {
      const session = await fetchAuthSession();
      setAuthStatus(session.tokens ? 'signedIn' : 'signedOut');
    } catch {
      setAuthStatus('signedOut');
    }
  }, []);

  /*
   * コンポーネントのマウント時に refreshAuthState を呼び出して、初期のサインイン状態を確認する。
   */
  React.useEffect(() => {
    void refreshAuthState();
  }, [refreshAuthState]);

  const value = React.useMemo(
    () => ({
      authStatus,
      refreshAuthState,
    }),
    [authStatus, refreshAuthState],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
