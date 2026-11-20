import { StatusBar } from 'expo-status-bar';

import { GlobalLoading } from './components/loading';
import { Navigation } from './navigation';
import {
  AppRootEvent, // AppRoot（App.tsx）用の処理まとめ
  AppRootProvider, // AppRoot（App.tsx）用のプロバイダーまとめ
} from './utils/appRootHelper';

import type React from 'react';

/* -----------------------------------------------
 * AppRoot
 * ----------------------------------------------- */

// React Navigation の画面遷移を高速化する処理
AppRootEvent.enableScreens();

// 通知の初期化処理
void AppRootEvent.initializeNotifications().catch(() => {
  console.warn('通知の初期化に失敗しました。配信設定を確認してください。');
});

const App: React.FC = () => {
  // アプリ起動時、スプラッシュ画像を指定ミリ秒表示する処理
  AppRootEvent.useSplashDuration(2000);

  return (
    <AppRootProvider>
      <GlobalLoading />
      <Navigation />
      <StatusBar style='auto' />
    </AppRootProvider>
  );
};

export default App;
