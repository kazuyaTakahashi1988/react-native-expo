import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../components/button';
import { Input } from '../../../components/form';

import type { TypeAuthForm, TypeSignIValues, TypeSignUpValues, TypeVerifyValues } from './_type';
import type React from 'react';

/* -----------------------------------------------
 * Sign In フォーム
 * ----------------------------------------------- */
export const SignInForm: React.FC<TypeAuthForm<TypeSignIValues>> = ({
  form,
  onSubmit,
  visibled,
}) => {
  if (!visibled) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>◇ Sign In</Text>

      {/* メールアドレス 入力項目 */}
      <Input
        autoCapitalize='none'
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.email?.message}
        keyboardType='ascii-capable'
        label='emailを入力してください'
        name='email'
        placeholder='○○○○＠○○○○.com'
        rules={{
          pattern: {
            message: 'Emailアドレスを入力してください。',
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          },
          required: '必須項目です。',
        }}
      />

      {/* パスワード 入力項目 */}
      <Input
        autoCapitalize='none'
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.password?.message}
        label='passwordを入力してください'
        name='password'
        placeholder='○○○○○○○○'
        rules={{ required: '必須項目です。' }}
        secureTextEntry
      />

      {/* submit & resetボタン */}
      <Button onPress={onSubmit} style={styles.submit} title='Sign In' />
      <Button onPress={form.reset} pattern='secondary' style={styles.reset} title='Reset' />
    </View>
  );
};

/* -----------------------------------------------
 * Sign Up フォーム
 * ----------------------------------------------- */
export const SignUpForm: React.FC<TypeAuthForm<TypeSignUpValues>> = ({
  form,
  onSubmit,
  visibled,
}) => {
  if (!visibled) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>◇ Sign Up</Text>

      {/* メールアドレス 入力項目 */}
      <Input
        autoCapitalize='none'
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.email?.message}
        keyboardType='ascii-capable'
        label='emailを入力してください'
        name='email'
        placeholder='○○○○＠○○○○.com'
        rules={{
          pattern: {
            message: 'Emailアドレスを入力してください。',
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          },
          required: '必須項目です。',
        }}
      />

      {/* パスワード 入力項目 */}
      <Input
        autoCapitalize='none'
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.password?.message}
        label='passwordを入力してください'
        name='password'
        placeholder='○○○○○○○○'
        rules={{ required: '必須項目です。' }}
        secureTextEntry
      />

      {/* submit & resetボタン */}
      <Button onPress={onSubmit} style={styles.submit} title='Sign Up' />
      <Button onPress={form.reset} pattern='secondary' style={styles.reset} title='Reset' />
    </View>
  );
};

/* -----------------------------------------------
 * Verify フォーム
 * ----------------------------------------------- */
export const VerifyForm: React.FC<TypeAuthForm<TypeVerifyValues>> = ({
  form,
  onSubmit,
  visibled,
}) => {
  if (!visibled) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>◇ Verify</Text>

      {/* verificationCode 入力項目 */}
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

      {/* メールアドレス 入力項目 */}
      <Input
        autoCapitalize='none'
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.email?.message}
        keyboardType='ascii-capable'
        label='emailを入力してください'
        name='email'
        placeholder='○○○○＠○○○○.com'
        rules={{
          pattern: {
            message: 'Emailアドレスを入力してください。',
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          },
          required: '必須項目です。',
        }}
      />

      {/* submit & resetボタン */}
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
