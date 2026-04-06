import { fetchAuthSession } from 'aws-amplify/auth';
import React from 'react';

type TypeAuthContext = {
  isAuth: boolean;
  fetchAuth: () => Promise<void>;
};

export const AuthContext = React.createContext<TypeAuthContext | null>(null);

/* -----------------------------------------------
 * Auth用 Provider
 * ----------------------------------------------- */

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState(false); // Authフラグ

  const fetchAuth = React.useCallback(async () => {
    try {
      const session = await fetchAuthSession();
      setIsAuth(Boolean(session.tokens));
    } catch {
      setIsAuth(false);
    }
  }, []);

  React.useEffect(() => {
    void fetchAuth();
  }, [fetchAuth]);

  const value = React.useMemo(
    () => ({
      isAuth,
      fetchAuth,
    }),
    [fetchAuth, isAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
