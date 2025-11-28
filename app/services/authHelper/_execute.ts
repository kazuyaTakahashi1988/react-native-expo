import { Amplify } from 'aws-amplify';
import {
  signIn as cognitoSignIn,
  signOut as cognitoSignOut,
  signUp as cognitoSignUp,
  confirmSignUp,
} from 'aws-amplify/auth';

import type {
  TypeAmplifyClient,
  TypeResourcesConfig,
  TypeSignInResult,
  TypeSignInValues,
  TypeSignUpResult,
  TypeSignUpValues,
  TypeVerifyValues,
} from '../../lib/types/typeService';

const amplifyClient: TypeAmplifyClient = Amplify as unknown as TypeAmplifyClient;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isSignUpResponse = (value: unknown): value is TypeSignUpResult =>
  isObject(value) && ('isSignUpComplete' in value || 'nextStep' in value || 'userId' in value);

const isSignInResponse = (value: unknown): value is TypeSignInResult =>
  isObject(value) && ('isSignedIn' in value || 'nextStep' in value || 'userId' in value);

/* -----------------------------------------------
 * Cognito Auth ヘルパー
 * ----------------------------------------------- */

// Amplify 設定
const authConfig: TypeResourcesConfig = {
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
 * Sign In
 */
export const signIn = async (values: TypeSignInValues): Promise<TypeSignInResult> => {
  const response: unknown = await cognitoSignIn({
    username: values.email,
    password: values.password,
  });

  if (!isSignInResponse(response)) {
    throw new Error('Unexpected sign in response');
  }

  const username = response.username ?? values.email;

  return {
    isSignedIn: response.isSignedIn,
    nextStep: response.nextStep,
    username,
    userId: response.userId,
  };
};

/*
 * Sign Up
 */
export const signUp = async (values: TypeSignUpValues): Promise<TypeSignUpResult> => {
  const response: unknown = await cognitoSignUp({
    username: values.email,
    password: values.password,
    options: {
      userAttributes: {
        email: values.email,
      },
    },
  });

  if (!isSignUpResponse(response)) {
    throw new Error('Unexpected sign up response');
  }

  const username = response.username ?? values.email;

  return {
    isSignUpComplete: response.isSignUpComplete,
    nextStep: response.nextStep,
    username,
    userId: response.userId,
  };
};

/*
 * Verify（確認コード検証）
 */
export const verify = async (values: TypeVerifyValues): Promise<void> => {
  await confirmSignUp({ username: values.email, confirmationCode: values.verificationCode });
};

/*
 * Sign Out
 */
export const signOut = async (): Promise<void> => {
  await cognitoSignOut();
};
