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
      region: 'ap-northeast-1',
    },
  },
};

let isConfigured = false;

export const configureAmplify = (): void => {
  if (isConfigured) return;

  const nativeStorageConfig: TypeAuthConfig['Auth'] =
    Platform.OS === 'web'
      ? baseAuthConfig.Auth
      : {
          ...baseAuthConfig.Auth,
          // Use AsyncStorage directly to align with Amplify's native defaults
          storage: AsyncStorage,
        };

  amplifyClient.configure({
    ...baseAuthConfig,
    Auth: nativeStorageConfig,
  });
  isConfigured = true;
};
