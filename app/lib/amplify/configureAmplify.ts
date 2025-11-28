import { getAmplifyConfig } from 'aws-amplify/react-native';
import { Amplify } from 'aws-amplify';

import type { TypeAmplifyClient, TypeAuthConfig } from '../types/typeService';

const amplifyClient: TypeAmplifyClient = Amplify as unknown as TypeAmplifyClient;

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

export const configureAmplify = (): void => {
  if (isConfigured) return;

  const nativeConfig = getAmplifyConfig();
  amplifyClient.configure({ ...nativeConfig, ...authConfig });
  isConfigured = true;
};
