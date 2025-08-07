import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

import Navigation from './navigation';

enableScreens(); // App起動前に呼び出す

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar style='auto' />
    </SafeAreaProvider>
  );
};

export default App;
