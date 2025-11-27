import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { ResultArea } from './_component';
import { Button } from '../../../../../components/button';
import {
  CheckBox,
  CheckBoxCustom,
  Input,
  RadioBox,
  RadioBoxCustom,
  SelectBox,
  TextArea,
} from '../../../../../components/form';
import { Layout } from '../../../../../components/layout';

import type { TypeFormValues } from './_type';

/* -----------------------------------------------
 * Child00 画面
 * ----------------------------------------------- */

const Child00Screen: React.FC = () => {
  const [formValues, setFormValues] = React.useState<TypeFormValues | null>(null);

  /*
   * RHForm使用設定
   */
  const form = useForm<TypeFormValues>({
    defaultValues: {
      dummyName: '',
      genres: [],
      inquiry: [],
      payment: '',
      theme: '',
      address: '',
      description: '',
    },
  });

  /*
   * エラーテキスト取得処理
   */
  const getErrorText = React.useCallback(
    (name: keyof TypeFormValues) => form.formState.errors[name]?.message,
    [form.formState.errors],
  );

  /*
   * submitボタン処理
   */
  const onSubmit = React.useCallback(() => {
    void form.handleSubmit((values: TypeFormValues) => {
      setFormValues(values);
    })();
  }, [form]);

  /*
   * resetボタン処理
   */
  const onReset = () => {
    form.reset();
    setFormValues(null);
  };

  return (
    <Layout>
      <Text style={styles.title}>react-hook-form{`\n`}example</Text>

      {/* インプット項目 */}
      <Input
        autoCapitalize='words'
        containerStyle={styles.container}
        control={form.control}
        errorText={getErrorText('dummyName')}
        label='ラベル テキスト'
        name='dummyName'
        placeholder='プレイスホルダー テキスト'
        rules={{ required: '必須項目です' }}
      />

      {/* チェックボックス項目 */}
      <CheckBox
        containerStyle={styles.container}
        control={form.control}
        errorText={getErrorText('genres')}
        label='よく視聴するジャンル'
        name='genres'
        options={[
          { label: 'アクション', value: 'action' },
          { label: 'コメディ', value: 'comedy' },
          { label: 'ドラマ', value: 'drama' },
        ]}
        rules={{
          validate: (value) => value.length >= 2 || '2つ以上選択してください。',
          required: '必須項目です',
        }}
      />

      {/* チェックボックスカスタム項目 */}
      <CheckBoxCustom
        activeColor='#22c55e'
        containerStyle={styles.container}
        control={form.control}
        errorText={getErrorText('inquiry')}
        label='お問い合わせ方法'
        name='inquiry'
        options={[
          { label: 'メール', value: 'email' },
          { label: 'SMS', value: 'sms' },
          { label: 'アプリ通知', value: 'push' },
        ]}
        rules={{ required: '必須項目です' }}
      />

      {/* ラヂオボックス項目 */}
      <RadioBox
        containerStyle={styles.container}
        control={form.control}
        errorText={getErrorText('payment')}
        label='お支払い方法'
        name='payment'
        options={[
          { label: 'クレジットカード', value: 'card' },
          { label: '銀行振込', value: 'bank' },
          { label: '電子マネー', value: 'wallet' },
        ]}
        rules={{ required: '必須項目です' }}
      />

      {/* ラヂオボックスカスタム項目 */}
      <RadioBoxCustom
        activeColor='#6366f1'
        containerStyle={styles.container}
        control={form.control}
        errorText={getErrorText('theme')}
        label='テーマ色の選択'
        name='theme'
        options={[
          { label: 'シアン', value: 'cyan' },
          { label: 'マゼンタ', value: 'magenta' },
          { label: 'イエロー', value: 'yellow' },
        ]}
        rules={{ required: '必須項目です' }}
      />

      {/* セレクトボックス項目 */}
      <SelectBox
        containerStyle={styles.container}
        control={form.control}
        errorText={getErrorText('address')}
        label='都道府県'
        name='address'
        options={[
          { label: '東京都', value: 'tokyo' },
          { label: '大阪府', value: 'osaka' },
          { label: '愛知県', value: 'aichi' },
        ]}
        placeholder='お住まいの地域を選択'
        rules={{ required: '必須項目です' }}
      />

      {/* テキストエリア項目 */}
      <TextArea
        containerStyle={styles.container}
        control={form.control}
        errorText={getErrorText('description')}
        label='ご相談の内容'
        name='description'
        placeholder='ご要望やご質問をご記入ください'
        rules={{
          maxLength: {
            value: 200,
            message: '200文字以内で入力してください。',
          },
          required: '必須項目です',
        }}
      />

      {/* submit ボタン */}
      <View style={styles.submit}>
        <Button onPress={onSubmit} title='Submit' />
        <Button onPress={onReset} pattern='secondary' title='Reset' />
      </View>

      {/* 出力結果エリア */}
      <ResultArea {...(formValues ?? {})} />
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
  submit: {
    columnGap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  container: {
    marginBottom: 24,
  },
});

export default Child00Screen;
