import { Amplify, Auth } from 'aws-amplify';

import type { TypeSignInValues, TypeSignUpValues, TypeVerifyValues } from '../../features/others/auth/_type';

/* -----------------------------------------------
 * Cognito Auth ヘルパー
 * ----------------------------------------------- */

// Amplify 設定
Amplify.configure({
  Auth: {
    region: 'ap-northeast-1',
    userPoolId: 'ap-northeast-1_rKjlyQsbS',
    userPoolWebClientId: '40oec5o56lukbe6ch1s9al1qh',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
});

/*
 * Sign Up
 */
export const signUp = async (values: TypeSignUpValues) =>
  Auth.signUp({
    username: values.email,
    password: values.password,
    attributes: {
      email: values.email,
    },
  });

/*
 * Sign In
 */
export const signIn = async (values: TypeSignInValues) =>
  Auth.signIn({
    username: values.email,
    password: values.password,
  });

/*
 * Verify（確認コード検証）
 */
export const verify = async (values: TypeVerifyValues) =>
  Auth.confirmSignUp(values.email, values.verificationCode);

/*
 * Sign Out
 */
export const signOut = async () => Auth.signOut();
