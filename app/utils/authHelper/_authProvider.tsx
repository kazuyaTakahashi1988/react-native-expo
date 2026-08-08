import { fetchAuthSession } from 'aws-amplify/auth';
import React from 'react';

import type { AuthStatus, TypeAuthContext } from '../../lib/types/typeUtils';

/* -----------------------------------------------
 * Auth用 Provider
 * ----------------------------------------------- */

export const AuthContext = React.createContext<TypeAuthContext | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [status, setStatus] = React.useState<AuthStatus>('checking');
  const [error, setError] = React.useState<Error | null>(null);

  /*
   * Auth状態を更新するための関数。
   * セッション確認中・未認証・認証済み・エラーの状態を明示的に遷移させる。
   */
  const refreshAuthState = React.useCallback(async () => {
    setStatus('checking');
    setError(null);

    try {
      const session = await fetchAuthSession();
      setStatus(session.tokens ? 'authenticated' : 'guest');
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err
          : new Error('認証状態の確認に失敗しました。'),
      );
      setStatus('error');
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
      status,
      error,
      refreshAuthState,
    }),
    [error, refreshAuthState, status],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
