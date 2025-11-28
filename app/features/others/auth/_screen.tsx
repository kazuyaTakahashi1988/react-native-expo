import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { SignInForm, SignUpForm, VerifyForm } from './_component';
import { signOut, verify } from './_service';
import { Button } from '../../../components/button';
import { Layout } from '../../../components/layout';
import { signIn, signUp } from '../../../services/authHelper';

import type { TypeTabKey } from './_type';
import type {
  TypeSignInResult,
  TypeSignInValues,
  TypeSignUpResult,
  TypeSignUpValues,
  TypeVerifyValues,
} from '../../../lib/types/typeService';

/* -----------------------------------------------
 * Auth 画面
 * ----------------------------------------------- */

const AuthScreen: React.FC = () => {
  const [tabKey, setTabKey] = React.useState<TypeTabKey>('signIn');
  const [resultMessage, setResultMessage] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

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

  // submit（Sign In）処理
  const onSignInSubmit = React.useCallback(() => {
    void signInForm.handleSubmit((values: TypeSignInValues) => {
      setErrorMessage('');
      setResultMessage('');

      // Sign In 処理
      signIn(values)
        .then((res: TypeSignInResult) => {
          const message = res.isSignedIn
            ? 'Sign In 成功、ログイン済みだよ！'
            : 'Sign In 完了ためには追加の手順が必要だよ！';
          setResultMessage(message);
        })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : '残念、Sign In に失敗したよ...。';
          setErrorMessage(message);
        });
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

  // submit（Sign Up）処理
  const onSignUpSubmit = React.useCallback(() => {
    void signUpForm.handleSubmit((values: TypeSignUpValues) => {
      setErrorMessage('');
      setResultMessage('');

      // Sign Up 処理
      signUp(values)
        .then((res: TypeSignUpResult) => {
          const message =
            res.isSignUpComplete === true
              ? 'Sign Up 成功' // verify不必要 message
              : 'Sign Up 完了ためには確認コードをメールで確認してね！'; // verify必要 message
          setResultMessage(message);
          setTabKey('verify');
        })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : '残念、Sign Up に失敗したよ...。';
          setErrorMessage(message);
        });
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
      setErrorMessage('');
      setResultMessage('');

      verify(values)
        .then((res) => {
          setResultMessage(res.message);
        })
        .catch((error: unknown) => {
          setErrorMessage(error instanceof Error ? error.message : 'Verification failed.');
        });
    })();
  }, [verifyForm]);

  const onSignOutPress = React.useCallback(() => {
    setErrorMessage('');
    setResultMessage('');

    signOut()
      .then((res) => {
        setResultMessage(res.message);
      })
      .catch((error: unknown) => {
        setErrorMessage(error instanceof Error ? error.message : 'Sign out failed.');
      });
  }, []);

  return (
    <Layout>
      {/* タブボタン */}
      <View style={styles.tabButton}>
        {[
          { title: 'Sign In', key: 'signIn' as const },
          { title: 'Sign Up', key: 'signUp' as const },
          { title: 'Verify', key: 'verify' as const },
        ].map((elm, i) => (
          <Button
            key={i}
            onPress={() => {
              setTabKey(elm.key);
            }}
            {...(!isActive(elm.key) && { pattern: 'secondary' })}
            title={elm.title}
          />
        ))}
      </View>

      {/* メッセージ表示 */}
      {resultMessage !== '' ? <Text style={styles.result}>{resultMessage}</Text> : null}
      {errorMessage !== '' ? <Text style={styles.error}>{errorMessage}</Text> : null}

      {/* Sign In フォーム */}
      <SignInForm form={signInForm} onSubmit={onSignInSubmit} visibled={isActive('signIn')} />

      {/* Sign Up フォーム */}
      <SignUpForm form={signUpForm} onSubmit={onSignUpSubmit} visibled={isActive('signUp')} />

      {/* Verify フォーム */}
      <VerifyForm form={verifyForm} onSubmit={onVerifySubmit} visibled={isActive('verify')} />

      {/* Sign Out ボタン */}
      <Button onPress={onSignOutPress} pattern='secondary' title='Sign Out' />
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
  result: {
    color: '#2d6a4f',
    marginBottom: 12,
  },
  error: {
    color: '#c1121f',
    marginBottom: 12,
  },
});

export default AuthScreen;
