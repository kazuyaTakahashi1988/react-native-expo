import { SafeAreaProvider } from 'react-native-safe-area-context';

import ToastProvider from './_toastProvider';

import type React from 'react';

/* -----------------------------------------------
 * AppRoot用のプロバイダーをまとめる
 * ----------------------------------------------- */

const AppRootProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <SafeAreaProvider>
    <ToastProvider>{children}</ToastProvider>
  </SafeAreaProvider>
);

export default AppRootProvider;
