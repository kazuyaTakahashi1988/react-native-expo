import { fetchAuthSession } from 'aws-amplify/auth';
import React from 'react';

export const useAuthSession = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const refreshAuthSession = React.useCallback(async () => {
    try {
      const session = await fetchAuthSession();
      setIsLoggedIn(Boolean(session.tokens));
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  React.useEffect(() => {
    void refreshAuthSession();
  }, [refreshAuthSession]);

  return { isLoggedIn, refreshAuthSession };
};
