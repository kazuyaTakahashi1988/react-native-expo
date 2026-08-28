import React from 'react';
import { useForm } from 'react-hook-form';
import { Linking, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../../../components/button';
import { RadioBox } from '../../../../../components/form';
import { Layout } from '../../../../../components/layouts/layout';
import { color } from '../../../../../lib/mixin';
import { getCategorizedArticleApi } from '../../../../../utils/apiHelper';

import type { TypeArticle, TypeFormValues } from './_type';

/* -----------------------------------------------
 * Home > Child02 画面
 * ----------------------------------------------- */

const Child02Screen: React.FC = () => {
  const [articles, setArticles] = React.useState<TypeArticle | null>(null);

  /*
   * RHForm 使用設定
   */
  const form = useForm<TypeFormValues>({
    defaultValues: {
      category: '',
      category02: '',
      category03: '',
    },
  });

  /*
   * 選択したカテゴリーで記事を絞り込み検索 ボタン処理
   */
  const onSubmit = React.useCallback(() => {
    void form.handleSubmit(async (values: TypeFormValues) => {
      /*
       * 選択したカテゴリーでクエリパラム（以下の形を）生成
       * {filters: 'category[equals]value[and]category02[equals]value[and]category03[equals]value'}
       */
      const filters = [
        ['category', values.category],
        ['category02', values.category02],
        ['category03', values.category03],
      ]
        .filter(([, value]) => value !== '')
        .map(([key, value]) => `${key}[equals]${value}`)
        .join('[and]');
      const params = { filters };

      // クエリパラム使用の記事取得API
      const result = await getCategorizedArticleApi(params);

      if (result.success) {
        // 記事一覧をセット
        setArticles(result.response.data as TypeArticle);
      } else {
        // エラー処理
        console.error('Failed to fetch articles', result.error);
      }
    })();
  }, [form]);

  /*
   * 記事へ飛ぶ ボタン処理
   */
  const goToLink = (link: string) => {
    void Linking.openURL(
      `https://micro-cms.empty-service.com/customblog/detail/${link}`,
    );
  };

  /*
   * reset ボタン処理
   */
  const onReset = () => {
    form.reset();
    setArticles(null);
  };

  return (
    <Layout>
      <Text style={styles.title}>
        API Helper & react-hook-form{`\n`}Example
      </Text>

      <View style={styles.category}>
        {/* category ラジオボックス項目 */}
        <RadioBox
          containerStyle={styles.container}
          control={form.control}
          disabled={Boolean(articles)}
          label='[ - カテゴリ01 - ]'
          name='category'
          options={[
            { label: 'テクノロジー', value: '3xciupsonl' },
            { label: 'チュートリアル', value: '5ci_ujb_2' },
            { label: '更新情報', value: '750gmh55dvw9' },
          ]}
        />

        {/* category02 ラジオボックス項目 */}
        <RadioBox
          containerStyle={styles.container}
          control={form.control}
          disabled={Boolean(articles)}
          label='[ - カテゴリ02 - ]'
          name='category02'
          options={[
            { label: '雑記', value: 'jkicehskeu17' },
            { label: '生活の知恵', value: 'dm3k91z2f0m' },
            { label: '趣味', value: 'oykfhu616' },
          ]}
        />

        {/* category03 ラジオボックス項目 */}
        <RadioBox
          containerStyle={styles.container}
          control={form.control}
          disabled={Boolean(articles)}
          label='[ - カテゴリ03 - ]'
          name='category03'
          options={[
            { label: '黄色', value: 'csgjis8q26wg' },
            { label: '赤色', value: 'fj437k900' },
            { label: '青色', value: 'jbwnpdv6h' },
          ]}
        />
      </View>

      {/* submit ボタン */}
      <Button
        disabled={Boolean(articles)}
        onPress={onSubmit}
        style={styles.button}
        title='選択したカテゴリーで記事を絞り込み検索'
      />
      <Text style={styles.container}>※ 未選択なら全件取得</Text>

      {/* 記事一覧の表示 */}
      <Text style={styles.container}>
        取得件数：{articles ? articles.contents.length : 0}
      </Text>

      {articles ? (
        <View>
          {articles.contents.map((elm) => (
            <View key={elm.id} style={styles.article}>
              <Text>記事ID: {elm.id}</Text>
              <Text style={styles.articleTitle}>{elm.title}</Text>
              <Text style={styles.articleCategories}>
                カテゴリ01：{elm.category.name}
                <br />
                カテゴリ02：{elm.category02.name}
                <br />
                カテゴリ03：{elm.category03.name}
              </Text>
              <Button
                onPress={() => {
                  goToLink(elm.id);
                }}
                pattern='secondary'
                size='small'
                style={styles.articleButton}
                title='- 記事へ飛ぶ -'
              />
            </View>
          ))}
        </View>
      ) : null}

      {/* reset ボタン */}
      <Button
        onPress={onReset}
        pattern='secondary'
        style={styles.button}
        title='Reset'
      />
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
