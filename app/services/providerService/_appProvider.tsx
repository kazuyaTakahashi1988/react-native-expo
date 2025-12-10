import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ToastProvider from './_toastProvider';

/* -----------------------------------------------
 * アプリ全体のプロバイダーをまとめる
 * ----------------------------------------------- */

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <SafeAreaProvider>
    <ToastProvider>{children}</ToastProvider>
  </SafeAreaProvider>
);

export default AppProvider;
