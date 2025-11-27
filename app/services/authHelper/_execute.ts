import { Amplify, Auth } from 'aws-amplify';

import type { SignInResult, SignInValues, SignUpResult, SignUpValues, VerifyValues } from './types';
import type { ResourcesConfig } from 'aws-amplify';

type AuthClient = {
  signUp: (input: {
    username: string;
    password: string;
    options: { userAttributes: { email: string } };
  }) => Promise<SignUpResult>;
  signIn: (input: { username: string; password: string }) => Promise<SignInResult>;
  confirmSignUp: (username: string, confirmationCode: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AmplifyClient = {
  configure: (config: ResourcesConfig) => void;
};

const amplifyClient: AmplifyClient = Amplify as unknown as AmplifyClient;
const authClient: AuthClient = Auth as unknown as AuthClient;

/* -----------------------------------------------
 * Cognito Auth ヘルパー
 * ----------------------------------------------- */

// Amplify 設定
const authConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      region: 'ap-northeast-1',
      userPoolId: 'ap-northeast-1_rKjlyQsbS',
      userPoolClientId: '40oec5o56lukbe6ch1s9al1qh',
      loginWith: { email: true },
    },
  },
};

amplifyClient.configure(authConfig);

/*
 * Sign Up
 */
export const signUp = async (values: SignUpValues): Promise<SignUpResult> => {
  const response = await authClient.signUp({
    username: values.email,
    password: values.password,
    options: {
      userAttributes: {
        email: values.email,
      },
    },
  });

  const username = response.username ?? values.email;

  return { isSignUpComplete: response.isSignUpComplete, nextStep: response.nextStep, username, userId: response.userId };
};

/*
 * Sign In
 */
export const signIn = async (values: SignInValues): Promise<SignInResult> => {
  const response = await authClient.signIn({
    username: values.email,
    password: values.password,
  });

  const username = response.username ?? values.email;

  return { isSignedIn: response.isSignedIn, nextStep: response.nextStep, username, userId: response.userId };
};

/*
 * Verify（確認コード検証）
 */
export const verify = async (values: VerifyValues): Promise<void> => {
  await authClient.confirmSignUp(values.email, values.verificationCode);
};

/*
 * Sign Out
 */
export const signOut = async (): Promise<void> => {
  await authClient.signOut();
};
