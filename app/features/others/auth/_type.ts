import type { FieldValues, UseFormReturn } from 'react-hook-form';

export type TypeTabKey = 'signIn' | 'signUp' | 'verify';

export type TypeAuthForm<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: () => void;
  visibled: boolean;
};

export interface TypeSignIValues extends FieldValues {
  email: string;
  password: string;
}
export interface TypeSignUpValues extends FieldValues {
  email: string;
  password: string;
}
export interface TypeVerifyValues extends FieldValues {
  verificationCode: string;
  email: string;
}
