import { fetchAuthSession } from 'aws-amplify/auth';
import React from 'react';

type TypeAuthSessionContext = {
  isAuth: boolean;
  fetchAuth: () => Promise<void>;
};

const AuthSessionContext = React.createContext<TypeAuthSessionContext | null>(null);

/* -----------------------------------------------
 * Auth用 Provider
 * ----------------------------------------------- */

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
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

  return <AuthSessionContext.Provider value={value}>{children}</AuthSessionContext.Provider>;
};

export const useAuthSession = () => {
  const context = React.useContext(AuthSessionContext);

  if (context === null) {
    throw new Error('useAuthSession must be used within AuthProvider');
  }

  return context;
};

export default AuthProvider;
