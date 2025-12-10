import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

import { Navigation } from './navigation';
import { useSplashMinDuration } from './services/appRootService';
import { AppRootProvider } from './services/providerService';

import type React from 'react';

/* -----------------------------------------------
 * AppRoot
 * ----------------------------------------------- */

enableScreens(); // App起動前に呼び出す

const App: React.FC = () => {
  useSplashMinDuration(2000); // アプリ起動時、スプラッシュ画像を指定ミリ秒表示する処理

  return (
    <GestureHandlerRootView style={styles.container}>
      <AppRootProvider>
        <Navigation />
        <StatusBar style='auto' />
      </AppRootProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
