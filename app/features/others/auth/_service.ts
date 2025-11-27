import {
  signIn as signInWithCognito,
  signOut as signOutFromCognito,
  signUp as signUpWithCognito,
  verify as verifyWithCognito,
} from '../../../services/authHelper';

import type { TypeSignInValues, TypeSignUpValues, TypeVerifyValues } from './_type';

/* -----------------------------------------------
 * Auth 画面用サービス
 * ----------------------------------------------- */

// Sign Up
export const signUp = async (values: TypeSignUpValues) => {
  const response = await signUpWithCognito(values);

  return {
    message: 'Sign up succeeded. Please check your email for the verification code.',
    username: response?.user?.getUsername?.() ?? values.email,
  };
};

// Verify (Confirm Sign Up)
export const verify = async (values: TypeVerifyValues) => {
  await verifyWithCognito(values);

  return {
    message: 'Verification completed. You can now sign in.',
  };
};

// Sign In
export const signIn = async (values: TypeSignInValues) => {
  const response = await signInWithCognito(values);

  return {
    isSignedIn: Boolean(response?.isSignedIn),
    message: response?.isSignedIn ? 'Signed in successfully.' : 'Additional steps are required to complete sign in.',
    username: response?.username ?? values.email,
  };
};

// Sign Out
export const signOut = async () => {
  await signOutFromCognito();

  return {
    message: 'Signed out successfully.',
  };
};
