import type { FieldValues, UseFormReturn } from 'react-hook-form';

export type AuthFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  visibled: boolean;
  onSubmit: () => void;
};

export interface TypeSignIValues extends FieldValues {
  signInEmail: string;
  signInPassword: string;
}
export interface TypeSignUpValues extends FieldValues {
  signUpEmail: string;
  signUpPassword: string;
}
export interface TypeVerifyValues extends FieldValues {
  verificationCode: string;
  verifiEmail: string;
}
