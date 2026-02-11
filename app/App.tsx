import { StatusBar } from 'expo-status-bar';

import { Navigation } from './navigation';
import { appRootService } from './services/appRootService'; // App.tsx（AppRoot）用の処理まとめ
import { AppRootProvider } from './services/providerService'; // App.tsx（AppRoot）用のプロバイダーまとめ

import type React from 'react';

/* -----------------------------------------------
 * AppRoot
 * ----------------------------------------------- */

appRootService.enableScreens(); // アプリ起動前に呼び出す

const App: React.FC = () => {
  appRootService.useSplashDuration(2000); // アプリ起動時、スプラッシュ画像を指定ミリ秒表示する処理

  return (
    <AppRootProvider>
      <Navigation />
      <StatusBar style='auto' />
    </AppRootProvider>
  );
};

export default App;
