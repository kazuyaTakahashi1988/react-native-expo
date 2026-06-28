import { StatusBar } from 'expo-status-bar';

import { GlobalLoading } from './components/loading';
import { Navigation } from './navigation';
import {
  AppRootEvent, // AppRoot（App.tsx）用の処理まとめ
  AppRootProvider, // AppRoot（App.tsx）用のプロバイダーまとめ
} from './services/appRootService';

import type React from 'react';

/* -----------------------------------------------
 * AppRoot
 * ----------------------------------------------- */

AppRootEvent.enableScreens(); // アプリ起動前に呼び出す

const App: React.FC = () => {
  AppRootEvent.useSplashDuration(2000); // アプリ起動時、スプラッシュ画像を指定ミリ秒表示する処理

  return (
    <AppRootProvider>
      <GlobalLoading />
      <Navigation />
      <StatusBar style='auto' />
    </AppRootProvider>
  );
};

export default App;
