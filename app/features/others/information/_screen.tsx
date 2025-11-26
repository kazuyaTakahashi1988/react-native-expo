/* eslint-disable complexity */
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

const InformationScreen: React.FC = () => {
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
  const verifiForm = useForm<TypeFormValues02>({
    defaultValues: {
      verificationCode: '',
      verifiEmail: '',
    },
  });

  return (
    <Layout>
      <View style={styles.container}>
        {/* SignIn フォーム項目 */}
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
          rules={{
            minLength: {
              message: 'Password は6文字以上で入力してください。',
              value: 6,
            },
            required: '必須項目です。',
          }}
          secureTextEntry
        />
        {/* submit ボタン */}
        <View style={styles.submit}>
          <Button title='Sign In' />
          <Button pattern='secondary' title='Reset' />
        </View>
      </View>

      {/* SignUp フォーム項目 */}
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
          rules={{
            minLength: {
              message: 'Password は6文字以上で入力してください。',
              value: 6,
            },
            required: '必須項目です。',
          }}
          secureTextEntry
        />
        {/* submit ボタン */}
        <View style={styles.submit}>
          <Button title='Sign Up' />
          <Button pattern='secondary' title='Reset' />
        </View>
      </View>

      {/* verification フォーム項目 */}
      <View style={styles.container}>
        <Text style={styles.title}>◇ verification</Text>
        <Input
          autoCapitalize='none'
          containerStyle={styles.input}
          control={verifiForm.control}
          errorText={verifiForm.formState.errors.verificationCode?.message}
          label='verificationコード入力 項目'
          name='verificationCode'
          placeholder='○○○○○○○○'
          rules={{
            minLength: {
              message: 'Password は6文字以上で入力してください。',
              value: 6,
            },
            required: '必須項目です。',
          }}
          secureTextEntry
        />
        <Input
          autoCapitalize='none'
          containerStyle={styles.input}
          control={verifiForm.control}
          errorText={verifiForm.formState.errors.verifiEmail?.message}
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
        <View style={styles.submit}>
          <Button title='Verify' />
          <Button pattern='secondary' title='Reset' />
        </View>
      </View>
    </Layout>
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
    columnGap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
});

export default InformationScreen;
