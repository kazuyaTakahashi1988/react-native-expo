import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../components/button';
import { Input } from '../../../components/form';

import type { AuthFormProps, TypeSignIValues, TypeSignUpValues, TypeVerifyValues } from './_type';
import type React from 'react';

/*
 * Sign In フォーム
 */
export const SignInForm: React.FC<AuthFormProps<TypeSignIValues>> = ({
  form,
  visibled,
  onSubmit,
}) => {
  if (!visibled) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>◇ Sign In</Text>
      <Input
        autoCapitalize='none'
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.signInEmail?.message}
        keyboardType='ascii-capable'
        label='emailを入力してください'
        name='signInEmail'
        placeholder='○○○○＠○○○○.com'
        rules={{
          pattern: {
            message: 'Emailアドレスを入力してください。',
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/,
          },
          required: '必須項目です。',
        }}
      />
      <Input
        autoCapitalize='none'
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.signInPassword?.message}
        label='passwordを入力してください'
        name='signInPassword'
        placeholder='○○○○○○○○'
        rules={{ required: '必須項目です。' }}
        secureTextEntry
      />
      <Button onPress={onSubmit} style={styles.submit} title='Sign In' />
      <Button onPress={form.reset} pattern='secondary' style={styles.reset} title='Reset' />
    </View>
  );
};

/*
 * Sign Up フォーム
 */
export const SignUpForm: React.FC<AuthFormProps<TypeSignUpValues>> = ({
  form,
  visibled,
  onSubmit,
}) => {
  if (!visibled) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>◇ Sign Up</Text>
      <Input
        autoCapitalize='none'
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.signUpEmail?.message}
        keyboardType='ascii-capable'
        label='emailを入力してください'
        name='signUpEmail'
        placeholder='○○○○＠○○○○.com'
        rules={{
          pattern: {
            message: 'Emailアドレスを入力してください。',
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/,
          },
          required: '必須項目です。',
        }}
      />
      <Input
        autoCapitalize='none'
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.signUpPassword?.message}
        label='passwordを入力してください'
        name='signUpPassword'
        placeholder='○○○○○○○○'
        rules={{ required: '必須項目です。' }}
        secureTextEntry
      />
      <Button onPress={onSubmit} style={styles.submit} title='Sign Up' />
      <Button onPress={form.reset} pattern='secondary' style={styles.reset} title='Reset' />
    </View>
  );
};

/*
 * Verify フォーム
 */
export const VerifyForm: React.FC<AuthFormProps<TypeVerifyValues>> = ({
  form,
  visibled,
  onSubmit,
}) => {
  if (!visibled) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>◇ Verify</Text>
      <Input
        autoCapitalize='none'
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.verificationCode?.message}
        label='verificationCodeを入力してください'
        name='verificationCode'
        placeholder='○○○○○○○○'
        rules={{ required: '必須項目です。' }}
        secureTextEntry
      />
      <Input
        autoCapitalize='none'
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.verifiEmail?.message}
        keyboardType='ascii-capable'
        label='emailを入力してください'
        name='verifiEmail'
        placeholder='○○○○＠○○○○.com'
        rules={{
          pattern: {
            message: 'Emailアドレスを入力してください。',
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/,
          },
          required: '必須項目です。',
        }}
      />
      <Button onPress={onSubmit} style={styles.submit} title='Verify' />
      <Button onPress={form.reset} pattern='secondary' style={styles.reset} title='Reset' />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
  },
  container: {
    backgroundColor: '#fff',
    marginBottom: 24,
    padding: 24,
  },
  input: {
    marginTop: 24,
  },
  submit: {
    marginTop: 24,
    width: '100%',
  },
  reset: {
    marginTop: 24,
    minHeight: 'auto',
    padding: 8,
    width: '100%',
  },
});
