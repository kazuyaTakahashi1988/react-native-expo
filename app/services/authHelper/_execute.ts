import '@aws-amplify/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Amplify } from 'aws-amplify';
import {
  signIn as cognitoSignIn,
  signOut as cognitoSignOut,
  signUp as cognitoSignUp,
  confirmSignUp,
} from 'aws-amplify/auth';

import type {
  TypeAmplifyClient,
  TypeAuthConfig,
  TypeAuthStorage,
  TypeSignInResult,
  TypeSignInValues,
  TypeSignUpResult,
  TypeSignUpValues,
  TypeVerifyValues,
} from '../../lib/types/typeService';

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isSignInResponse = (value: unknown): value is TypeSignInResult =>
  isObject(value) && ('isSignedIn' in value || 'nextStep' in value || 'userId' in value);

const isSignUpResponse = (value: unknown): value is TypeSignUpResult =>
  isObject(value) && ('isSignUpComplete' in value || 'nextStep' in value || 'userId' in value);

/* -----------------------------------------------
 * Cognito Auth ヘルパー
 * ----------------------------------------------- */

/*
 * Amplify 設定
 */
const amplifyClient: TypeAmplifyClient = Amplify as unknown as TypeAmplifyClient;

const storage: TypeAuthStorage = {
  getItem: (key) => AsyncStorage.getItem(key),
  setItem: (key, value) => AsyncStorage.setItem(key, value),
  removeItem: (key) => AsyncStorage.removeItem(key),
};

const authConfig: TypeAuthConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'ap-northeast-1_ukr54toDk',
      userPoolClientId: '7qccrkdu7aq97so0cj0d61j0kv',
      loginWith: { email: true },
    },
    storage,
  },
};

amplifyClient.configure(authConfig);

/*
 * Sign In 処理
 */
export const signIn = async (values: TypeSignInValues): Promise<TypeSignInResult> => {
  const result: unknown = await cognitoSignIn({
    username: values.email,
    password: values.password,
  });

  if (!isSignInResponse(result)) {
    throw new Error('Unexpected sign in response');
  }

  return result;
};

/*
 * Sign Up 処理
 */
export const signUp = async (values: TypeSignUpValues): Promise<TypeSignUpResult> => {
  const result: unknown = await cognitoSignUp({
    username: values.email,
    password: values.password,
    options: {
      userAttributes: {
        email: values.email,
      },
    },
  });

  if (!isSignUpResponse(result)) {
    throw new Error('Unexpected sign up response');
  }

  return result;
};

/*
 * Verify 処理
 */
export const verify = async (values: TypeVerifyValues): Promise<void> => {
  await confirmSignUp({ username: values.email, confirmationCode: values.verificationCode });
};

/*
 * Sign Out 処理
 */
export const signOut = async (): Promise<void> => {
  await cognitoSignOut();
};
