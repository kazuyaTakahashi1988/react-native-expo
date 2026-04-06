import { fetchAuthSession } from 'aws-amplify/auth';
import React from 'react';

import type { TypeAuthContext } from '../../lib/types/typeService';

/* -----------------------------------------------
 * Auth用 Provider
 * ----------------------------------------------- */
export const AuthContext = React.createContext<TypeAuthContext | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = React.useState(false); // Authフラグ

  const refreshAuthState = React.useCallback(async () => {
    try {
      const session = await fetchAuthSession();
      setIsSignedIn(Boolean(session.tokens));
    } catch {
      setIsSignedIn(false);
    }
  }, []);

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
