import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthProvider from './_authProvider';
import ToastProvider from './_toastProvider';

import type React from 'react';

/* -----------------------------------------------
 * App.tsx（AppRoot）用のプロバイダー
 * ----------------------------------------------- */

const AppRootProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <GestureHandlerRootView style={styles.container}>
    <SafeAreaProvider>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppRootProvider;
