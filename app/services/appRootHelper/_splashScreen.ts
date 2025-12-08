import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

/**
 * Keeps the Expo splash screen visible for at least the provided duration.
 */
export const useSplashScreenMinimumDuration = (durationMs: number) => {
  useEffect(() => {
    let isMounted = true;

    void SplashScreen.preventAutoHideAsync();

    const hideTimeout = setTimeout(() => {
      if (isMounted) {
        void SplashScreen.hideAsync();
      }
    }, durationMs);

    return () => {
      isMounted = false;
      clearTimeout(hideTimeout);
    };
  }, [durationMs]);
};
