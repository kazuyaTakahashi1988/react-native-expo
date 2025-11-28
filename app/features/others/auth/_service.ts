import {
  signOut as signOutFromCognito,
  verify as verifyWithCognito,
} from '../../../services/authHelper';

import type { TypeVerifyValues } from '../../../lib/types/typeService';

/* -----------------------------------------------
 * Auth 画面用サービス
 * ----------------------------------------------- */

type VerifyResponse = {
  message: string;
};

// Verify (Confirm Sign Up)
export const verify = async (values: TypeVerifyValues): Promise<VerifyResponse> => {
  await verifyWithCognito(values);

  return {
    message: 'Verification completed. You can now sign in.',
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
