import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../../../components/button';
import { CheckBox } from '../../../../../components/form';
import { Layout } from '../../../../../components/layout';
import { getCategorizedArticleApi } from '../../../../../services/apiHelper';

import type { TypeFormValues } from './_type';

const Child02Screen: React.FC = () => {
  const [formValues, setFormValues] = useState<TypeFormValues | null>(null);

  /*
   * RHForm使用設定
   */
  const form = useForm<TypeFormValues>({
    defaultValues: {
      taxCategory01: [],
      taxCategory02: [],
      taxCategory03: [],
    },
  });

  /*
   * submitボタン処理
   */
  const onSubmit = useCallback(() => {
    void form.handleSubmit(async (values: TypeFormValues) => {
      setFormValues(values);
      try {
        const result = await getCategorizedArticleApi();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
        setFormValues(result.data as any);
      } catch (error) {
        console.error('Failed to fetch articles', error);
      } finally {
        // eslint-disable-next-line no-console
        console.log(formValues);
      }
    })();
  }, [form, formValues]);

  /*
   * resetボタン処理
   */
  const onReset = () => {
    form.reset();
    setFormValues(null);
  };

  return (
    <Layout>
      <Text style={styles.title}>API Helper / react-hook-form{`\n`}example</Text>

      <Button onPress={onReset} pattern='secondary' style={styles.button} title='Reset' />

      <View style={styles.category}>
        <CheckBox
          containerStyle={styles.container}
          control={form.control}
          label='カテゴリ01'
          name='taxCategory01'
          options={[
            { label: 'カテゴリー01_A', value: '18' },
            { label: 'カテゴリー01_B', value: '19' },
            { label: 'カテゴリー01_C', value: '20' },
            { label: 'カテゴリー01_D', value: '21' },
            { label: 'カテゴリー01_E', value: '22' },
          ]}
        />
        <CheckBox
          containerStyle={styles.container}
          control={form.control}
          label='カテゴリ02'
          name='taxCategory02'
          options={[
            { label: 'カテゴリー02_A', value: '23' },
            { label: 'カテゴリー02_B', value: '24' },
            { label: 'カテゴリー02_C', value: '25' },
            { label: 'カテゴリー02_D', value: '26' },
            { label: 'カテゴリー02_E', value: '27' },
          ]}
        />
        <CheckBox
          containerStyle={styles.container}
          control={form.control}
          label='カテゴリ03'
          name='taxCategory03'
          options={[
            { label: 'カテゴリー03_A', value: '28' },
            { label: 'カテゴリー03_B', value: '29' },
            { label: 'カテゴリー03_C', value: '30' },
            { label: 'カテゴリー03_D', value: '31' },
            { label: 'カテゴリー03_E', value: '32' },
          ]}
        />
      </View>

      <Button onPress={onSubmit} style={styles.button} title='選択したカテゴリーで記事を取得' />
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
  container: {
    marginBottom: 24,
  },
  category: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  button: {
    marginBottom: 16,
    minHeight: 'auto',
    padding: 8,
    width: '100%',
  },
});

export default Child02Screen;
