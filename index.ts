import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';

import App from './app/App';

if (Platform.OS !== 'web') {
  // Amplify needs native random values polyfilled on iOS/Android
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { loadGetRandomValues } = require('@aws-amplify/react-native');
  loadGetRandomValues();
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
