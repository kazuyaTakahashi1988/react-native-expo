import AsyncStorage from '@react-native-async-storage/async-storage';
import { Amplify } from 'aws-amplify';
import { Platform } from 'react-native';

import type { TypeAmplifyClient, TypeAuthConfig } from '../types/typeService';

const amplifyClient: TypeAmplifyClient = Amplify as unknown as TypeAmplifyClient;

const baseAuthConfig: TypeAuthConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'ap-northeast-1_ukr54toDk',
      userPoolClientId: '7qccrkdu7aq97so0cj0d61j0kv',
      loginWith: { email: true },
    },
  },
};

const createFrozenStorageAdapter = () => {
  const adapter = {
    async getItem(key: string) {
      return AsyncStorage.getItem(key);
    },
    async setItem(key: string, value: string) {
      await AsyncStorage.setItem(key, value);
    },
    async removeItem(key: string) {
      await AsyncStorage.removeItem(key);
    },
    async clear() {
      await AsyncStorage.clear();
    },
  } as const;

  Object.values(adapter).forEach((value) => {
    if (typeof value === 'function') {
      Object.freeze(value);
    }
  });

  return Object.freeze(adapter);
};

let isConfigured = false;

export const configureAmplify = (): void => {
  if (isConfigured) return;

  const nativeStorageConfig: TypeAuthConfig =
    Platform.OS === 'web'
      ? {}
      : {
          Auth: {
            ...baseAuthConfig.Auth,
            // Use AsyncStorage for token persistence on native platforms
            storage: createFrozenStorageAdapter(),
          },
        };

  amplifyClient.configure({ ...baseAuthConfig, ...nativeStorageConfig });
  isConfigured = true;
};
