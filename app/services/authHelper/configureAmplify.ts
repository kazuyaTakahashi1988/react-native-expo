import '@aws-amplify/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Amplify } from 'aws-amplify';

import type { TypeAmplifyClient, TypeAuthConfig, TypeAuthStorage } from '../../lib/types/typeService';

const nativeStorage: TypeAuthStorage = {
  async getItem(key: string) {
    return AsyncStorage.getItem(key);
  },
  async setItem(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  },
  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
  },
};

const authConfig: TypeAuthConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'ap-northeast-1_ukr54toDk',
      userPoolClientId: '7qccrkdu7aq97so0cj0d61j0kv',
      loginWith: { email: true },
    },
    storage: nativeStorage,
  },
};

let isConfigured = false;

export const ensureAmplifyConfigured = (): TypeAmplifyClient => {
  if (!isConfigured) {
    (Amplify as unknown as TypeAmplifyClient).configure(authConfig);
    isConfigured = true;
  }

  return Amplify as unknown as TypeAmplifyClient;
};
