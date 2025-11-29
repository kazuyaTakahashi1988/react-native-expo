import React from 'react';
import { useForm } from 'react-hook-form';
import { Linking, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../../../components/button';
import { CheckBox } from '../../../../../components/form';
import { Layout } from '../../../../../components/layouts/layout';
import { color } from '../../../../../lib/mixin';
import { getCategorizedArticleApi } from '../../../../../services/apiHelper';

import type { TypeArticle, TypeFormValues } from './_type';

/* -----------------------------------------------
 * Child02 画面
 * ----------------------------------------------- */

const Child02Screen: React.FC = () => {
  const [articles, setArticles] = React.useState<TypeArticle | null>(null);
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
   * 選択したカテゴリーで記事を絞り込み検索 ボタン処理
   */
  const onSubmit = React.useCallback(() => {
    setIsDisabled(true);
    void form.handleSubmit(async (values: TypeFormValues) => {
      // 選択したカテゴリーをクエリパラム化
      const params = {
        post: 'custompost',
        'taxCategory01[]': values.taxCategory01,
        'taxCategory02[]': values.taxCategory02,
        'taxCategory03[]': values.taxCategory03,
      };
      try {
        // クエリパラム使用の記事取得API処理
        const result = await getCategorizedArticleApi(params);
        setArticles(result.data as TypeArticle);
      } catch (err) {
        console.error('Failed to fetch articles', err);
        setIsDisabled(false);
      }
    })();
  }, [form]);

  /*
   * reset ボタン処理
   */
  const onReset = () => {
    form.reset();
    setArticles(null);
    setIsDisabled(false);
  };

  return (
    <Layout>
      <Text style={styles.title}>API Helper & react-hook-form{`\n`}Example</Text>

      <View style={styles.category}>
        {/* taxCategory01 チェックボックス項目 */}
        <CheckBox
          containerStyle={styles.container}
          control={form.control}
          disabled={isDisabled}
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

        {/* taxCategory02 チェックボックス項目 */}
        <CheckBox
          containerStyle={styles.container}
          control={form.control}
          disabled={isDisabled}
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

        {/* taxCategory03 チェックボックス項目 */}
        <CheckBox
          containerStyle={styles.container}
          control={form.control}
          disabled={isDisabled}
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

      {/* submit ボタン */}
      <Button
        disabled={isDisabled}
        onPress={onSubmit}
        style={styles.button}
        title='選択したカテゴリーで記事を絞り込み検索'
      />
      <Text style={styles.container}>※ no ﾁｪｯｸなら全件取得</Text>

      {/* 記事一覧の表示 */}
      <Text style={styles.container}>取得件数：{articles?.length}</Text>
      {articles &&
        articles.map((elm) => (
          <View key={elm.id} style={styles.article}>
            <Text>記事ID: {elm.id}</Text>
            <Text style={styles.articleTitle}>{elm.getTheTitle}</Text>

            <View style={styles.articleCategories}>
              {elm.getTaxCategory01.map((_elm, _i) => (
                <Text key={_i}>・{_elm.name}</Text>
              ))}
              {elm.getTaxCategory02.map((_elm, _i) => (
                <Text key={_i}>・{_elm.name}</Text>
              ))}
              {elm.getTaxCategory03.map((_elm, _i) => (
                <Text key={_i}>・{_elm.name}</Text>
              ))}
            </View>

            <Button
              onPress={() => {
                void Linking.openURL(elm.getPermalink);
              }}
              pattern='secondary'
              size='small'
              style={styles.articleButton}
              title='- 記事へ飛ぶ -'
            />
          </View>
        ))}

      {/* reset ボタン */}
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
    backgroundColor: color.white,
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
  articleCategories: {
    fontSize: 12,
    marginBottom: 8,
  },
  articleButton: {
    minHeight: 'auto',
    padding: 8,
    width: '100%',
  },
});

export default Child02Screen;
