import {
  signIn as signInWithCognito,
  signOut as signOutFromCognito,
  signUp as signUpWithCognito,
  verify as verifyWithCognito,
} from '../../../services/authHelper';

import type {
  TypeSignInResult,
  TypeSignInValues,
  TypeSignUpResult,
  TypeSignUpValues,
  TypeVerifyValues,
} from '../../../lib/types/typeService';

/* -----------------------------------------------
 * Auth 画面用サービス
 * ----------------------------------------------- */

// Sign Up
type SignUpResponse = {
  message: string;
  username: string;
};

type VerifyResponse = {
  message: string;
};

type SignInResponse = {
  isSignedIn: boolean;
  message: string;
  username: string;
};

export const signUp = async (values: TypeSignUpValues): Promise<SignUpResponse> => {
  const response: TypeSignUpResult = await signUpWithCognito(values);

  return {
    message: 'Sign up succeeded. Please check your email for the verification code.',
    username: response.username ?? values.email,
  };
};

// Verify (Confirm Sign Up)
export const verify = async (values: TypeVerifyValues): Promise<VerifyResponse> => {
  await verifyWithCognito(values);

  return {
    message: 'Verification completed. You can now sign in.',
  };
};

// Sign In
export const signIn = async (values: TypeSignInValues): Promise<SignInResponse> => {
  const response: TypeSignInResult = await signInWithCognito(values);

  return {
    isSignedIn: Boolean(response.isSignedIn),
    message: response.isSignedIn
      ? 'Signed in successfully.'
      : 'Additional steps are required to complete sign in.',
    username: response.username ?? values.email,
  };
};

// Sign Out
type SignOutResponse = {
  message: string;
};

export const signOut = async (): Promise<SignOutResponse> => {
  await signOutFromCognito();

  return {
    message: 'Signed out successfully.',
  };
};
