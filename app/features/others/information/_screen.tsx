import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../components/button';
import { Input } from '../../../components/form';
import { Layout } from '../../../components/layout';

export type TypeFormValues = {
  signInEmail: string;
  signInPassword: string;
};
export type TypeFormValues01 = {
  signUpEmail: string;
  signUpPassword: string;
};
export type TypeFormValues02 = {
  verificationCode: string;
  verifiEmail: string;
};

// eslint-disable-next-line complexity
const InformationScreen: React.FC = () => {
  const [tab, setTab] = React.useState<'signIn' | 'signUp' | 'verify'>('signIn');
  /*
   * RHForm使用設定
   */
  const signInForm = useForm<TypeFormValues>({
    defaultValues: {
      signInEmail: '',
      signInPassword: '',
    },
  });
  const signUpForm = useForm<TypeFormValues01>({
    defaultValues: {
      signUpEmail: '',
      signUpPassword: '',
    },
  });
  const verifyForm = useForm<TypeFormValues02>({
    defaultValues: {
      verificationCode: '',
      verifiEmail: '',
    },
  });

  return (
    <Layout>
      <View style={styles.tab}>
        <Button
          onPress={() => {
            setTab('signIn');
          }}
          pattern={tab !== 'signIn' ? 'secondary' : undefined}
          title='Sign In'
        />
        <Button
          onPress={() => {
            setTab('signUp');
          }}
          pattern={tab !== 'signUp' ? 'secondary' : undefined}
          title='Sign Up'
        />
        <Button
          onPress={() => {
            setTab('verify');
          }}
          pattern={tab !== 'verify' ? 'secondary' : undefined}
          title='Verify'
        />
      </View>

      {/* Sign In フォーム */}
      {tab === 'signIn' && (
        <View style={styles.container}>
          <Text style={styles.title}>◇ Sign In</Text>
          <Input
            autoCapitalize='none'
            containerStyle={styles.input}
            control={signInForm.control}
            errorText={signInForm.formState.errors.signInEmail?.message}
            keyboardType='ascii-capable'
            label='emailを入力してください'
            name='signInEmail'
            placeholder='○○○○＠○○○○.com'
            rules={{
              pattern: {
                message: 'Emailアドレスを入力してください.',
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/,
              },
              required: '必須項目です。',
            }}
          />
          <Input
            autoCapitalize='none'
            containerStyle={styles.input}
            control={signInForm.control}
            errorText={signInForm.formState.errors.signInPassword?.message}
            label='passwordを入力してください'
            name='signInPassword'
            placeholder='○○○○○○○○'
            rules={{ required: '必須項目です。' }}
            secureTextEntry
          />
          {/* submit ボタン */}
          <Button style={styles.submit} title='Sign In' />
          <Button pattern='secondary' style={styles.reset} title='Reset' />
        </View>
      )}

      {/* Sign Up フォーム */}
      {tab === 'signUp' && (
        <View style={styles.container}>
          <Text style={styles.title}>◇ Sign Up</Text>
          <Input
            autoCapitalize='none'
            containerStyle={styles.input}
            control={signUpForm.control}
            errorText={signUpForm.formState.errors.signUpEmail?.message}
            keyboardType='ascii-capable'
            label='emailを入力してください'
            name='signUpEmail'
            placeholder='○○○○＠○○○○.com'
            rules={{
              pattern: {
                message: 'Emailアドレスを入力してください.',
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/,
              },
              required: '必須項目です。',
            }}
          />
          <Input
            autoCapitalize='none'
            containerStyle={styles.input}
            control={signUpForm.control}
            errorText={signUpForm.formState.errors.signUpPassword?.message}
            label='passwordを入力してください'
            name='signUpPassword'
            placeholder='○○○○○○○○'
            rules={{ required: '必須項目です。' }}
            secureTextEntry
          />
          {/* submit ボタン */}
          <Button style={styles.submit} title='Sign Up' />
          <Button pattern='secondary' style={styles.reset} title='Reset' />
        </View>
      )}

      {/* Verify フォーム */}
      {tab === 'verify' && (
        <View style={styles.container}>
          <Text style={styles.title}>◇ Verify</Text>
          <Input
            autoCapitalize='none'
            containerStyle={styles.input}
            control={verifyForm.control}
            errorText={verifyForm.formState.errors.verificationCode?.message}
            label='verificationCodeを入力してください'
            name='verificationCode'
            placeholder='○○○○○○○○'
            rules={{ required: '必須項目です。' }}
            secureTextEntry
          />
          <Input
            autoCapitalize='none'
            containerStyle={styles.input}
            control={verifyForm.control}
            errorText={verifyForm.formState.errors.verifiEmail?.message}
            keyboardType='ascii-capable'
            label='emailを入力してください'
            name='verifiEmail'
            placeholder='○○○○＠○○○○.com'
            rules={{
              pattern: {
                message: 'Emailアドレスを入力してください.',
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/,
              },
              required: '必須項目です。',
            }}
          />
          {/* submit ボタン */}
          <Button style={styles.submit} title='Verify' />
          <Button pattern='secondary' style={styles.reset} title='Reset' />
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
  },
  tab: {
    columnGap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
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

export default InformationScreen;
