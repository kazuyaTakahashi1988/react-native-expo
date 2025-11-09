import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, StyleSheet, Text, View } from 'react-native';

import { ResultArea } from './_component';
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
  const [submittedValues, setSubmittedValues] = useState<TypeFormValues | null>(null);

  // form設定
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<TypeFormValues>({
    defaultValues: {
      name: '',
      email: '',
      subscribe: [],
      subscribeCustom: [],
      plan: '',
      planCustom: '',
      country: '',
      note: '',
    },
  });

  // submitボタン処理
  const onSubmit = useCallback(() => {
    void handleSubmit((values: TypeFormValues) => {
      setSubmittedValues(values);
    })();
  }, [handleSubmit]);

  // resetボタン処理
  const onReset = () => {
    reset();
    setSubmittedValues(null);
  };

  return (
    <Layout>
      <Text style={styles.title}>react-hook-form example</Text>

      {/* Name インプット項目 */}
      <Input
        autoCapitalize='words'
        control={control}
        errorText={errors.name}
        label='Name インプット項目'
        name='name'
        placeholder='Jane Doe'
        rules={{ required: 'Name は必須です。' }}
      />

      {/* Email インプット項目 */}
      <Input
        autoCapitalize='none'
        control={control}
        errorText={errors.email}
        keyboardType='ascii-capable'
        label='Email インプット項目'
        name='email'
        placeholder='jane@example.com'
        rules={{
          pattern: {
            message: 'Emailアドレスを入力してください.',
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          },
          required: 'Email は必須です。',
        }}
      />

      {/* Subscribe チェックボックス項目 */}
      <CheckBox
        control={control}
        errorText={errors.subscribe}
        label='Subscribe チェックボックス項目'
        name='subscribe'
        options={[
          { label: 'チェックラベル-A', value: 'CheckValue-A' },
          { label: 'チェックラベル-B', value: 'CheckValue-B' },
          { label: 'チェックラベル-C', value: 'CheckValue-C' },
        ]}
        rules={{
          validate: (value) => value.length >= 2 || '2つ以上選択してください。',
          required: 'チェックボックス は必須です。',
        }}
      />

      {/* Subscribe Custom チェックボックスカスタム項目 */}
      <CheckBoxCustom
        activeColor='#22c55e'
        control={control}
        errorText={errors.subscribeCustom}
        label='Subscribe Custom チェックボックスカスタム項目'
        name='subscribeCustom'
        options={[
          { label: 'チェックカスタム-A', value: 'CheckCustom-A' },
          { label: 'チェックカスタム-B', value: 'CheckCustom-B' },
          { label: 'チェックカスタム-C', value: 'CheckCustom-C' },
        ]}
        rules={{ required: 'チェックボックスカスタム は必須です。' }}
      />

      {/* Plan ラヂオボックス項目 */}
      <RadioBox
        control={control}
        errorText={errors.plan}
        label='Plan ラヂオボックス項目'
        name='plan'
        options={[
          { label: 'ラヂオラベル-A', value: 'RadioValue-A' },
          { label: 'ラヂオラベル-B', value: 'RadioValue-B' },
          { label: 'ラヂオラベル-C', value: 'RadioValue-C' },
        ]}
        rules={{ required: 'ラヂオボックス は必須です。' }}
      />

      {/* Plan Custom ラヂオボックスカスタム項目 */}
      <RadioBoxCustom
        activeColor='#6366f1'
        control={control}
        errorText={errors.planCustom}
        label='Plan Custom ラヂオボックスカスタム項目'
        name='planCustom'
        options={[
          { label: 'ラヂオカスタム-A', value: 'RadioCustom-A' },
          { label: 'ラヂオカスタム-B', value: 'RadioCustom-B' },
          { label: 'ラヂオカスタム-C', value: 'RadioCustom-C' },
        ]}
        rules={{ required: 'ラヂオボックスカスタム は必須です。' }}
      />

      {/* Country セレクトボックス項目 */}
      <SelectBox
        control={control}
        errorText={errors.country}
        label='Country セレクトボックス項目'
        name='country'
        options={[
          { label: 'セレクトラベル-A', value: 'SelectValue-A' },
          { label: 'セレクトラベル-B', value: 'SelectValue-B' },
          { label: 'セレクトラベル-C', value: 'SelectValue-C' },
        ]}
        rules={{ required: 'セレクトボックス は必須です。' }}
      />

      {/* Note テキストエリア項目 */}
      <TextArea
        control={control}
        errorText={errors.note}
        label='Note テキストエリア項目'
        name='note'
        placeholder='メモや補足を入力してください'
        rules={{
          maxLength: {
            value: 200,
            message: '200文字以内で入力してください。',
          },
          required: 'テキストエリア は必須です。',
        }}
      />

      {/* submit ボタン */}
      <View style={styles.actions}>
        <Button onPress={onSubmit} title={isSubmitting ? 'Submitting…' : 'Submit'} />
        <Button color='#444' onPress={onReset} title='Reset' />
      </View>

      {/* submit 出力結果表示エリア */}
      <ResultArea {...submittedValues} />
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
  actions: {
    columnGap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});

export default Child00Screen;
