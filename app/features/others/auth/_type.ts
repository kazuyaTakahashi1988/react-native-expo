import type { FieldValues, UseFormReturn } from 'react-hook-form';

/* -----------------------------------------------
 * 画面固有のタイプ
 * ----------------------------------------------- */

export type TypeTabKey = 'signIn' | 'signUp' | 'verify';
export type TypeResult = {
  type?: 'success' | 'error';
  message?: string;
};

export type TypeAuthForm<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: () => void;
  visible: boolean;
};
