import type { FieldValues, UseFormReturn } from 'react-hook-form';

export type TypeTabKey = 'signIn' | 'signUp' | 'verify';

export type TypeAuthForm<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: () => void;
  visibled: boolean;
};
