import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { SignInForm, SignUpForm, VerifyForm } from './_component';
import { Button } from '../../../components/button';
import { Layout } from '../../../components/layout';

import type { TypeSignIValues, TypeSignUpValues, TypeVerifyValues } from './_type';

/* -----------------------------------------------
 * Auth 画面
 * ----------------------------------------------- */

const AuthScreen: React.FC = () => {
  const [tabKey, setTabKey] = React.useState<'signIn' | 'signUp' | 'verify'>('signIn');

  /* ---------------------------------------------
   * Sign In の RHForm使用設定
   * --------------------------------------------- */
  const signInForm = useForm<TypeSignIValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  }); // フォーム設定

  const onSignInSubmit = React.useCallback(() => {
    void signInForm.handleSubmit((values: TypeSignIValues) => {
      // eslint-disable-next-line no-console
      console.log(values);
    })();
  }, [signInForm]); // submitボタン処理

  /* ---------------------------------------------
   * Sign Up の RHForm使用設定
   * --------------------------------------------- */
  const signUpForm = useForm<TypeSignUpValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  }); // フォーム設定

  const onSignUpSubmit = React.useCallback(() => {
    void signUpForm.handleSubmit((values: TypeSignUpValues) => {
      // eslint-disable-next-line no-console
      console.log(values);
    })();
  }, [signUpForm]); // submitボタン処理

  /* ---------------------------------------------
   * verify の RHForm使用設定
   * --------------------------------------------- */
  const verifyForm = useForm<TypeVerifyValues>({
    defaultValues: {
      verificationCode: '',
      email: '',
    },
  }); // フォーム設定

  const onVerifySubmit = React.useCallback(() => {
    void verifyForm.handleSubmit((values: TypeVerifyValues) => {
      // eslint-disable-next-line no-console
      console.log(values);
    })();
  }, [verifyForm]); // submitボタン処理

  /*
   * tabKey マッチフラグ
   */
  const keyMatch = (key: string) => {
    return tabKey === key;
  };

  return (
    <Layout>
      {/* タブ */}
      <View style={styles.tab}>
        <Button
          onPress={() => {
            setTabKey('signIn');
          }}
          {...(!keyMatch('signIn') && { pattern: 'secondary' })}
          title='Sign In'
        />
        <Button
          onPress={() => {
            setTabKey('signUp');
          }}
          {...(!keyMatch('signUp') && { pattern: 'secondary' })}
          title='Sign Up'
        />
        <Button
          onPress={() => {
            setTabKey('verify');
          }}
          {...(!keyMatch('verify') && { pattern: 'secondary' })}
          title='Verify'
        />
      </View>

      {/* Sign In フォーム */}
      <SignInForm form={signInForm} onSubmit={onSignInSubmit} visibled={keyMatch('signIn')} />

      {/* Sign Up フォーム */}
      <SignUpForm form={signUpForm} onSubmit={onSignUpSubmit} visibled={keyMatch('signUp')} />

      {/* Verify フォーム */}
      <VerifyForm form={verifyForm} onSubmit={onVerifySubmit} visibled={keyMatch('verify')} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  tab: {
    columnGap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
});

export default AuthScreen;
