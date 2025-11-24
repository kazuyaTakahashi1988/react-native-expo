import { useCallback } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Linking, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../../../components/button';
import { CheckBox } from '../../../../../components/form';
import { Layout } from '../../../../../components/layout';
import { getCategorizedArticleApi } from '../../../../../services/apiHelper';

import type { TypeArticle, TypeFormValues } from './_type';

const Child02Screen: React.FC = () => {
  const [articles, setArticles] = React.useState<TypeArticle[] | null>(null);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

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
      setIsDisabled(true);
      // eslint-disable-next-line no-console
      console.log(values);
      try {
        const result = await getCategorizedArticleApi({
          post: 'custompost',
          'taxCategory01[]': values.taxCategory01,
          'taxCategory02[]': values.taxCategory02,
          'taxCategory03[]': values.taxCategory03,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
        setArticles(result.data as any);
      } catch (error) {
        console.error('Failed to fetch articles', error);
      } finally {
        setIsDisabled(false);
      }
    })();
  }, [form]);

  /*
   * resetボタン処理
   */
  const onReset = () => {
    form.reset();
    setArticles(null);
  };

  /*
   * 「記事へ飛ぶ」ボタン処理
   */
  const goToLink = (link: string) => {
    void Linking.openURL(link);
  };

  return (
    <Layout>
      <Text style={styles.title}>API Helper / react-hook-form{`\n`}example</Text>

      <View style={styles.category}>
        <CheckBox
          containerStyle={styles.container}
          control={form.control}
          label='[ - カテゴリー01 - ]'
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
          label='[ - カテゴリー02 - ]'
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
          label='[ - カテゴリー03 - ]'
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

      <Button
        disabled={isDisabled || articles != null}
        onPress={onSubmit}
        style={styles.button}
        title='選択したカテゴリーで記事を取得'
      />

      {/* 記事一覧の表示 */}
      {articles && (
        <View>
          {articles.map((elm) => (
            <View key={elm.id} style={styles.article}>
              <Text>記事ID: {elm.id}</Text>
              <Text style={styles.articleTitle}>{elm.title.rendered}</Text>
              <Button
                onPress={() => {
                  goToLink(elm.link);
                }}
                pattern='secondary'
                size='small'
                style={styles.articleButton}
                title='- 記事へ飛ぶ -'
              />
            </View>
          ))}
        </View>
      )}

      <Button onPress={onReset} pattern='secondary' style={styles.button} title='Reset' />
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
  article: {
    backgroundColor: '#fff',
    borderRadius: 8,
    display: 'flex',
    marginBottom: 16,
    padding: 12,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  articleButton: {
    minHeight: 'auto',
    padding: 8,
    width: '100%',
  },
});

export default Child02Screen;
