import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { SignInForm, SignUpForm, VerifyForm } from './_component';
import { Button } from '../../../components/button';
import { Layout } from '../../../components/layouts/layout';
import { color } from '../../../lib/mixin';
import { signIn, signOut, signUp, verify } from '../../../services/authHelper';

import type { TypeResult, TypeTabKey } from './_type';
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
  const [result, setResult] = React.useState<TypeResult>({});

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
      setResult({});

      // Sign In 処理
      signIn(values)
        .then((res: TypeSignInResult) => {
          const message = res.isSignedIn
            ? 'Sign In 成功、ログイン済みだよ！'
            : 'Sign In にはまだ追加手順（Verify）が必要だよ！';
          setResult({ type: 'success', message });
          signInForm.reset();
        })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : 'Sign In に失敗したよ...';
          setResult({ type: 'error', message });
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
      setResult({});

      // Sign Up 処理
      signUp(values)
        .then((res: TypeSignUpResult) => {
          const noVerify = res.isSignUpComplete === true; // verifyの手順必要かフラグ
          const message = noVerify
            ? 'Sign Up 成功! Sign In しよう！' // verify 不要時
            : 'OK！ Verify用のコードをメールで送ったから確認してね！'; // verify 必要時
          setTabKey(noVerify ? 'signIn' : 'verify');
          setResult({ type: 'success', message });
          signUpForm.reset();
        })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : 'Sign Up に失敗したよ...';
          setResult({ type: 'error', message });
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

  // submit（Verify）処理
  const onVerifySubmit = React.useCallback(() => {
    void verifyForm.handleSubmit((values: TypeVerifyValues) => {
      setResult({});

      // Verify 処理
      verify(values)
        .then(() => {
          setTabKey('signIn');
          setResult({ type: 'success', message: 'Verify 完了、Sign In できるよ！' });
          verifyForm.reset();
        })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : 'Verify に失敗したよ...';
          setResult({ type: 'error', message });
        });
    })();
  }, [verifyForm]);

  /*
   * Sign Out ボタン処理
   */
  const onSignOutPress = React.useCallback(() => {
    setResult({});

    // Sign Out 処理
    signOut()
      .then(() => {
        setResult({ type: 'success', message: '正常に Sign Out したよ！' });
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Sign Out に失敗したよ...';
        setResult({ type: 'error', message });
      });
  }, []);

  return (
    <Layout>
      <Text style={styles.title}>Auth Example</Text>

      {/* タブボタン */}
      <View style={styles.tabButton}>
        {[
          { title: 'Sign In', key: 'signIn' as const },
          { title: 'Sign Up', key: 'signUp' as const },
          { title: 'Verify', key: 'verify' as const },
        ].map((elm) => (
          <Button
            key={elm.key}
            onPress={() => {
              setTabKey(elm.key);
              setResult({});
            }}
            {...(!isActive(elm.key) && { pattern: 'secondary' })}
            title={elm.title}
          />
        ))}
      </View>

      {/* 成功 or エラーメッセージ表示 */}
      {result.message !== '' && (
        <Text style={result.type === 'success' ? styles.success : styles.error}>
          {result.message}
        </Text>
      )}

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
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  tabButton: {
    columnGap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  success: {
    color: color.green,
    marginBottom: 12,
  },
  error: {
    color: color.red,
    marginBottom: 12,
  },
});

export default AuthScreen;
