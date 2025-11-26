import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { SignInForm, SignUpForm, VerifyForm } from './_component';
import { Button } from '../../../components/button';
import { Layout } from '../../../components/layout';

import type { TypeSignIValues, TypeSignUpValues, TypeVerifyValues } from './_type';

const InformationScreen: React.FC = () => {
  const [tabKey, setTabKey] = React.useState<'signIn' | 'signUp' | 'verify'>('signIn');

  /*
   * RHForm使用設定
   */
  const signInForm = useForm<TypeSignIValues>({
    defaultValues: {
      signInEmail: '',
      signInPassword: '',
    },
  });
  const signUpForm = useForm<TypeSignUpValues>({
    defaultValues: {
      signUpEmail: '',
      signUpPassword: '',
    },
  });
  const verifyForm = useForm<TypeVerifyValues>({
    defaultValues: {
      verificationCode: '',
      verifiEmail: '',
    },
  });

  /*
   * submitボタン処理
   */
  const onSignInSubmit = React.useCallback(() => {
    void signInForm.handleSubmit((values: TypeSignIValues) => {
      // eslint-disable-next-line no-console
      console.log(values);
    })();
  }, [signInForm]);

  const onSignUpSubmit = React.useCallback(() => {
    void signUpForm.handleSubmit((values: TypeSignUpValues) => {
      // eslint-disable-next-line no-console
      console.log(values);
    })();
  }, [signUpForm]);

  const onVerifySubmit = React.useCallback(() => {
    void verifyForm.handleSubmit((values: TypeVerifyValues) => {
      // eslint-disable-next-line no-console
      console.log(values);
    })();
  }, [verifyForm]);

  return (
    <Layout>
      {/* タブ */}
      <View style={styles.tab}>
        <Button
          onPress={() => {
            setTabKey('signIn');
          }}
          pattern={tabKey === 'signIn' ? 'primary' : 'secondary'}
          title='Sign In'
        />
        <Button
          onPress={() => {
            setTabKey('signUp');
          }}
          pattern={tabKey === 'signUp' ? 'primary' : 'secondary'}
          title='Sign Up'
        />
        <Button
          onPress={() => {
            setTabKey('verify');
          }}
          pattern={tabKey === 'verify' ? 'primary' : 'secondary'}
          title='Verify'
        />
      </View>

      {/* Sign In フォーム */}
      <SignInForm form={signInForm} onSubmit={onSignInSubmit} visibled={tabKey === 'signIn'} />

      {/* Sign Up フォーム */}
      <SignUpForm form={signUpForm} onSubmit={onSignUpSubmit} visibled={tabKey === 'signUp'} />

      {/* Verify フォーム */}
      <VerifyForm form={verifyForm} onSubmit={onVerifySubmit} visibled={tabKey === 'verify'} />
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

export default InformationScreen;
