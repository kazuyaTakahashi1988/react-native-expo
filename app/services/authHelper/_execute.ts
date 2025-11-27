import { Amplify } from 'aws-amplify';
import {
  signIn as cognitoSignIn,
  signOut as cognitoSignOut,
  signUp as cognitoSignUp,
  confirmSignUp,
} from 'aws-amplify/auth';

import type { SignInResult, SignInValues, SignUpResult, SignUpValues, VerifyValues } from './types';
import type { ResourcesConfig } from 'aws-amplify';

type AmplifyClient = {
  configure: (config: ResourcesConfig) => void;
};

const amplifyClient: AmplifyClient = Amplify as unknown as AmplifyClient;

/* -----------------------------------------------
 * Cognito Auth ヘルパー
 * ----------------------------------------------- */

// Amplify 設定
const authConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'ap-northeast-1_ukr54toDk',
      userPoolClientId: '7qccrkdu7aq97so0cj0d61j0kv',
      loginWith: { email: true },
    },
  },
};

amplifyClient.configure(authConfig);

/*
 * Sign Up
 */
export const signUp = async (values: SignUpValues): Promise<SignUpResult> => {
  const response = await cognitoSignUp({
    username: values.email,
    password: values.password,
    options: {
      userAttributes: {
        email: values.email,
      },
    },
  });

  const username = response.username ?? values.email;

  return {
    isSignUpComplete: response.isSignUpComplete,
    nextStep: response.nextStep,
    username,
    userId: response.userId,
  };
};

/*
 * Sign In
 */
export const signIn = async (values: SignInValues): Promise<SignInResult> => {
  const response = await cognitoSignIn({
    username: values.email,
    password: values.password,
  });

  const username = response.username ?? values.email;

  return {
    isSignedIn: response.isSignedIn,
    nextStep: response.nextStep,
    username,
    userId: response.userId,
  };
};

/*
 * Verify（確認コード検証）
 */
export const verify = async (values: VerifyValues): Promise<void> => {
  await confirmSignUp({ username: values.email, confirmationCode: values.verificationCode });
};

/*
 * Sign Out
 */
export const signOut = async (): Promise<void> => {
  await cognitoSignOut();
};
