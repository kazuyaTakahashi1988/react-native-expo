import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { SignInForm, SignUpForm, VerifyForm } from './_component';
import { Button } from '../../../components/button';
import { Layout } from '../../../components/layout';
import { signIn, signOut, signUp, verify } from '../../../services/authHelper';

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
            : 'Sign In にはまだ追加手順（Verify）が必要だよ！';
          setResultMessage(message);
        })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : 'Sign In に失敗したよ...';
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
          const noVerify = res.isSignUpComplete === true; // verifyの手順を必要かフラグ
          const message = noVerify
            ? 'Sign Up 成功! Sign In しよう！' // verify 不要時
            : 'OK！ Sign Up 完了ために確認コードをメールで確認してね！'; // verify 必要時
          setResultMessage(message);
          setTabKey(noVerify ? 'signIn' : 'verify');
        })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : 'Sign Up に失敗したよ...';
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

  // submit（verify）処理
  const onVerifySubmit = React.useCallback(() => {
    void verifyForm.handleSubmit((values: TypeVerifyValues) => {
      setErrorMessage('');
      setResultMessage('');

      // verify 処理
      verify(values)
        .then(() => {
          setResultMessage('verify 完了、Sign In できるよ！');
          setTabKey('signIn');
        })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : 'verify に失敗したよ...';
          setErrorMessage(message);
        });
    })();
  }, [verifyForm]);

  /*
   * Sign Out ボタン処理
   */
  const onSignOutPress = React.useCallback(() => {
    setErrorMessage('');
    setResultMessage('');

    // Sign Out 処理
    signOut()
      .then(() => {
        setResultMessage('正常にサインアウトしたよ！');
      })
      .catch((error: unknown) => {
        setErrorMessage(error instanceof Error ? error.message : 'Sign out に失敗したよ...');
      });
  }, []);

  /*
   * タブボタン処理
   */
  const onTabPress = (tabKey: TypeTabKey) => {
    setErrorMessage('');
    setResultMessage('');
    setTabKey(tabKey);
  };

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
              onTabPress(elm.key);
            }}
            {...(!isActive(elm.key) && { pattern: 'secondary' })}
            title={elm.title}
          />
        ))}
      </View>

      {/* 成功・異常 メッセージ表示 */}
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
