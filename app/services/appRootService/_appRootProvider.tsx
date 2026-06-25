import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DialogProvider } from '../../components/dialog';
import { ToastProvider } from '../../components/toast';
import { AuthProvider } from '../authService';
import { StoreProvider } from '../storeService';

import type React from 'react';

/* -----------------------------------------------
 * AppRoot（App.tsx）用のプロバイダーまとめ
 * ----------------------------------------------- */

const AppRootProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <GestureHandlerRootView style={styles.container}>
    <SafeAreaProvider>
      <AuthProvider>
        <StoreProvider>
          <ToastProvider>
            <DialogProvider>{children}</DialogProvider>
          </ToastProvider>
        </StoreProvider>
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
