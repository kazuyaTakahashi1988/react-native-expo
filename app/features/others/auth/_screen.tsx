import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { SignInForm, SignUpForm, VerifyForm } from './_component';
import { Button } from '../../../components/button';
import { Layout } from '../../../components/layout';

import type { TypeSignInValues, TypeSignUpValues, TypeTabKey, TypeVerifyValues } from './_type';

/* -----------------------------------------------
 * Auth 画面
 * ----------------------------------------------- */

const AuthScreen: React.FC = () => {
  const [tabKey, setTabKey] = React.useState<TypeTabKey>('signIn');

  /*
   * tabKey アクティブ判定
   */
  const isActive = (key: TypeTabKey) => tabKey === key;

  /*
   * Sign In の RHForm使用設定
   */
  const signInForm = useForm<TypeSignInValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // submit処理
  const onSignInSubmit = React.useCallback(() => {
    void signInForm.handleSubmit((values: TypeSignInValues) => {
      // eslint-disable-next-line no-console
      console.log(values);
    })();
  }, [signInForm]);

  /*
   * Sign Up の RHForm使用設定
   */
  const signUpForm = useForm<TypeSignUpValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // submit処理
  const onSignUpSubmit = React.useCallback(() => {
    void signUpForm.handleSubmit((values: TypeSignUpValues) => {
      // eslint-disable-next-line no-console
      console.log(values);
    })();
  }, [signUpForm]);

  /*
   * verify の RHForm使用設定
   */
  const verifyForm = useForm<TypeVerifyValues>({
    defaultValues: {
      verificationCode: '',
      email: '',
    },
  });

  // submit処理
  const onVerifySubmit = React.useCallback(() => {
    void verifyForm.handleSubmit((values: TypeVerifyValues) => {
      // eslint-disable-next-line no-console
      console.log(values);
    })();
  }, [verifyForm]);

  return (
    <Layout>
      {/* タブボタン */}
      <View style={styles.tabButton}>
        {[
          { title: 'Sign In', key: 'signIn' as const },
          { title: 'Sign Up', key: 'signUp' as const },
          { title: 'Verify', key: 'verify' as const },
        ].map((elm, index) => (
          <Button
            key={index}
            onPress={() => {
              setTabKey(elm.key);
            }}
            {...(!isActive(elm.key) && { pattern: 'secondary' })}
            title={elm.title}
          />
        ))}
      </View>

      {/* Sign In フォーム */}
      <SignInForm form={signInForm} onSubmit={onSignInSubmit} visibled={isActive('signIn')} />

      {/* Sign Up フォーム */}
      <SignUpForm form={signUpForm} onSubmit={onSignUpSubmit} visibled={isActive('signUp')} />

      {/* Verify フォーム */}
      <VerifyForm form={verifyForm} onSubmit={onVerifySubmit} visibled={isActive('verify')} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    columnGap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
});

export default AuthScreen;
