import { StyleSheet, Text, View } from 'react-native';

import { color } from '../../../../../lib/mixin';

import type { TypeResultArea } from './_type';

/* -----------------------------------------------
 * 出力結果エリア
 * ----------------------------------------------- */

// formValues に値があれば出力結果エリア呼び出し
export const ResultArea: React.FC<TypeResultArea> = (formValues) => {
  const hasValues = Object.keys(formValues).length > 0;
  return hasValues ? <ResultAreaCalled {...formValues} /> : null;
};

// 出力結果エリア呼び出し
const ResultAreaCalled: React.FC<TypeResultArea> = (formValues) => {
  const { dummyName, genres, inquiry, payment, theme, address, description } = formValues;

  return (
    <View style={styles.result}>
      <Text style={styles.resultTitle}>Submitted values</Text>
      <Text style={styles.resultRow}>
        ラベル テキスト: {'\n'}[ {dummyName} ]
      </Text>
      <Text style={styles.resultRow}>
        よく視聴するジャンル:
        {'\n'}[ {genres && genres.map((item) => `\n・${item}`)}
        {genres && '\n'} ]
      </Text>
      <Text style={styles.resultRow}>
        お問い合わせ方法:
        {'\n'}[ {inquiry && inquiry.map((item) => `\n・${item}`)}
        {inquiry && '\n'} ]
      </Text>
      <Text style={styles.resultRow}>
        お支払い方法: {'\n'}[ {payment} ]
      </Text>
      <Text style={styles.resultRow}>
        テーマ色の選択: {'\n'}[ {theme} ]
      </Text>
      <Text style={styles.resultRow}>
        都道府県: {'\n'}[ {address} ]
      </Text>
      <Text style={styles.resultRow}>
        ご相談の内容: {'\n'}[ {description} ]
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  result: {
    backgroundColor: color.white,
    borderRadius: 8,
    padding: 16,
    rowGap: 8,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  resultRow: {
    borderBottomColor: color.gray,
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingBottom: 16,
  },
});
