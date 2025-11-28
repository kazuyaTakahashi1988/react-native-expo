import '@aws-amplify/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

import type { TypeAmplifyClient, TypeAuthConfig } from '../../lib/types/typeService';

const authConfig: TypeAuthConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'ap-northeast-1_ukr54toDk',
      userPoolClientId: '7qccrkdu7aq97so0cj0d61j0kv',
      loginWith: { email: true },
    },
  },
};

let isConfigured = false;

export const ensureAmplifyConfigured = (): TypeAmplifyClient => {
  if (!isConfigured) {
    cognitoUserPoolsTokenProvider.setKeyValueStorage(AsyncStorage);
    (Amplify as unknown as TypeAmplifyClient).configure(authConfig);
    isConfigured = true;
  }

  return Amplify as unknown as TypeAmplifyClient;
};
