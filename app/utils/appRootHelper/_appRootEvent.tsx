import { enableScreens } from 'react-native-screens';

import { initializeNotifications } from '../notificationHelper';
import { useSplashDuration } from './_splash';

/* -----------------------------------------------
 * AppRoot（App.tsx）用の処理まとめ
 * ----------------------------------------------- */

export const AppRootEvent = {
  enableScreens,
  initializeNotifications,
  useSplashDuration,
};
