import { Amplify } from 'aws-amplify';
import {
  signIn as cognitoSignIn,
  signOut as cognitoSignOut,
  signUp as cognitoSignUp,
  confirmSignUp,
  fetchAuthSession,
} from 'aws-amplify/auth';
import React from 'react';

import type {
  TypeAmplifyClient,
  TypeAuthConfig,
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

const authConfig: TypeAuthConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.EXPO_PUBLIC_AUTH_USER_POOL_ID ?? '',
      userPoolClientId: process.env.EXPO_PUBLIC_AUTH_USER_POOL_CLIENT_ID ?? '',
      loginWith: { email: true },
    },
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
    options: {
      authFlowType: 'USER_PASSWORD_AUTH',
    },
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

/*
 * Auth情報 取得・更新処理
 * " fetchAuthSession() " だけで accessToken(bearerToken) も取得・格納可
 * " fetchUserAttributes() " なら userName / ID など取得・格納可
 */
export const useAuthSession = () => {
  const [isAuth, setIsAuth] = React.useState(false); // Authフラグ

  const fetchAuth = React.useCallback(async () => {
    try {
      const session = await fetchAuthSession();
      setIsAuth(Boolean(session.tokens));
    } catch {
      setIsAuth(false);
    }
  }, []);

  React.useEffect(() => {
    void fetchAuth();
  }, [fetchAuth]);

  return { isAuth, fetchAuth };
};
