import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ToastProvider from './_toastProvider';

import type React from 'react';

/* -----------------------------------------------
 * AppRoot用のプロバイダーをまとめる
 * ----------------------------------------------- */

const AppRootProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <GestureHandlerRootView style={styles.container}>
    <SafeAreaProvider>
      <ToastProvider>{children}</ToastProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppRootProvider;
