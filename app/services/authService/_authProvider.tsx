import { fetchAuthSession } from 'aws-amplify/auth';
import React from 'react';

import type { TypeAuthContext } from '../../lib/types/typeService';

/* -----------------------------------------------
 * Auth用 Provider
 * ----------------------------------------------- */

export const AuthContext = React.createContext<TypeAuthContext | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = React.useState(false); // Authフラグ

  /*
   * Auth状態を更新するための関数
   * ユーザーのサインイン状態を確認し、isSignedIn ステートを更新する。
   */
  const refreshAuthState = React.useCallback(async () => {
    try {
      const session = await fetchAuthSession();
      setIsSignedIn(Boolean(session.tokens));
    } catch {
      setIsSignedIn(false);
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
      isSignedIn,
      refreshAuthState,
    }),
    [refreshAuthState, isSignedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
