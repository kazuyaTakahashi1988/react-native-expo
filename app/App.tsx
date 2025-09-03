import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

import Navigation from './navigation';

import type React from 'react';

enableScreens(); //  App起動前に呼び出す

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar style='auto' />
    </SafeAreaProvider>
  );
};

export default App;
