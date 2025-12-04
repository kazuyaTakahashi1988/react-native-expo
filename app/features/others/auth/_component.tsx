import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../components/button';
import { Input } from '../../../components/form';
import { color } from '../../../lib/mixin';

import type { TypeAuthForm } from './_type';
import type {
  TypeSignInValues,
  TypeSignUpValues,
  TypeVerifyValues,
} from '../../../lib/types/typeService';
import type React from 'react';

// メールアドレス項目のバリデーションルール
const rules = {
  pattern: {
    message: 'Emailアドレスを入力してください。',
    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  },
  required: '必須項目です。',
};

/* -----------------------------------------------
 * Sign In フォーム
 * ----------------------------------------------- */
export const SignInForm: React.FC<TypeAuthForm<TypeSignInValues>> = ({
  form,
  onSubmit,
  visible,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>◇ Sign In - ログインフォーム</Text>

      {/* メールアドレス項目 */}
      <Input
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.email?.message}
        label='emailを入力してください'
        name='email'
        rules={rules}
      />

      {/* パスワード項目 */}
      <Input
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.password?.message}
        label='passwordを入力してください'
        name='password'
        rules={{ required: '必須項目です。' }}
        secureTextEntry
      />

      {/* submit & resetボタン */}
      <Button onPress={onSubmit} style={styles.submit} title='Sign In' />
      <Button
        onPress={() => {
          form.reset();
        }}
        pattern='secondary'
        style={styles.reset}
        title='Reset'
      />
    </View>
  );
};

/* -----------------------------------------------
 * Sign Up フォーム
 * ----------------------------------------------- */
export const SignUpForm: React.FC<TypeAuthForm<TypeSignUpValues>> = ({
  form,
  onSubmit,
  visible,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>◇ Sign Up - 登録フォーム</Text>

      {/* メールアドレス項目 */}
      <Input
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.email?.message}
        label='emailを入力してください'
        name='email'
        rules={rules}
      />

      {/* パスワード項目 */}
      <Input
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.password?.message}
        label='passwordを入力してください'
        name='password'
        rules={{ required: '必須項目です。' }}
        secureTextEntry
      />

      {/* submit & resetボタン */}
      <Button onPress={onSubmit} style={styles.submit} title='Sign Up' />
      <Button
        onPress={() => {
          form.reset();
        }}
        pattern='secondary'
        style={styles.reset}
        title='Reset'
      />
    </View>
  );
};

/* -----------------------------------------------
 * Verify フォーム
 * ----------------------------------------------- */
export const VerifyForm: React.FC<TypeAuthForm<TypeVerifyValues>> = ({
  form,
  onSubmit,
  visible,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>◇ Verify - 認証フォーム</Text>

      {/* verificationCode項目 */}
      <Input
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.verificationCode?.message}
        label='verificationCodeを入力してください'
        name='verificationCode'
        rules={{ required: '必須項目です。' }}
        secureTextEntry
      />

      {/* メールアドレス項目 */}
      <Input
        containerStyle={styles.input}
        control={form.control}
        errorText={form.formState.errors.email?.message}
        label='emailを入力してください'
        name='email'
        rules={rules}
      />

      {/* submit & resetボタン */}
      <Button onPress={onSubmit} style={styles.submit} title='Verify' />
      <Button
        onPress={() => {
          form.reset();
        }}
        pattern='secondary'
        style={styles.reset}
        title='Reset'
      />
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
    backgroundColor: color.white,
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
