import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

/* -----------------------------------------------
 *  アプリ起動時、スプラッシュ画像を指定ミリ秒表示する処理
 * ----------------------------------------------- */
export const useSplashMinDuration = (duration: number) => {
  useEffect(() => {
    let isMounted = true;

    void SplashScreen.preventAutoHideAsync();

    const hideTimeout = setTimeout(() => {
      if (isMounted) {
        void SplashScreen.hideAsync();
      }
    }, duration);

    return () => {
      isMounted = false;
      clearTimeout(hideTimeout);
    };
  }, [duration]);
};
