import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { GlobalLoading } from '../../components/layouts/layout';
import { store } from '../storeService';
import AuthProvider from './_authProvider';
import ToastProvider from './_toastProvider';

import type React from 'react';

/* -----------------------------------------------
 * App.tsx（AppRoot）用のプロバイダー
 * ----------------------------------------------- */

const AppRootProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Provider store={store}>
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <AuthProvider>
          <ToastProvider>
            {children}
            <GlobalLoading />
          </ToastProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppRootProvider;
