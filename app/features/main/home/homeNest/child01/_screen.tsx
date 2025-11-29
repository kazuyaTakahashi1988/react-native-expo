import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../../../components/button';
import { Layout } from '../../../../../components/layouts/layout';
import { color } from '../../../../../lib/mixin';
import { getArticleApi } from '../../../../../services/apiHelper';

import type { TypeArticle } from './_type';

/* -----------------------------------------------
 * Child01 画面
 * ----------------------------------------------- */

const Child01Screen: React.FC = () => {
  const [articles, setArticles] = React.useState<TypeArticle[] | null>(null);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  /*
   * 記事取得 ボタン処理
   */
  const getArticles = async () => {
    setIsDisabled(true);
    try {
      // 記事取得API処理
      const result = await getArticleApi();
      setArticles(result.data as TypeArticle[]);
    } catch (err) {
      console.error('Failed to fetch articles', err);
    } finally {
      setIsDisabled(false);
    }
  };

  /*
   * 記事へ飛ぶ ボタン処理
   */
  const goToLink = (link: string) => {
    void Linking.openURL(link);
  };

  return (
    <Layout>
      <Text style={styles.title}>API Helper{`\n`}Example</Text>

      {/* 記事取得 ボタン */}
      <Button
        disabled={isDisabled || articles != null}
        onPress={() => {
          void getArticles();
        }}
        style={styles.button}
        title='- 記事取得 -'
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
  articleButton: {
    minHeight: 'auto',
    padding: 8,
    width: '100%',
  },
});

export default Child01Screen;
