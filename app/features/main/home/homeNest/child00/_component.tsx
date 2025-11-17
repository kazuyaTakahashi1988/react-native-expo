import { StyleSheet, Text, View } from 'react-native';

import type { TypeResultArea } from './_type';

/* -----------------------------------------------
 * submit 出力結果表示エリア
 * ----------------------------------------------- */

export const ResultArea: React.FC<TypeResultArea> = (formValues) => {
  const { dummyName, genres, inquiry, payment, theme, address, description } = formValues;

  return (
    <View style={resultStyles.result}>
      <Text style={resultStyles.resultTitle}>Submitted values</Text>
      <Text style={resultStyles.resultRow}>
        ラベル テキスト: {'\n'}[ {dummyName} ]
      </Text>
      <Text style={resultStyles.resultRow}>
        よく視聴するジャンル:
        {'\n'}[ {genres && genres.map((item) => `\n・${item}`)}
        {genres && '\n'} ]
      </Text>
      <Text style={resultStyles.resultRow}>
        お問い合わせ方法:
        {'\n'}[ {inquiry && inquiry.map((item) => `\n・${item}`)}
        {inquiry && '\n'} ]
      </Text>
      <Text style={resultStyles.resultRow}>
        お支払い方法: {'\n'}[ {payment} ]
      </Text>
      <Text style={resultStyles.resultRow}>
        テーマ色の選択: {'\n'}[ {theme} ]
      </Text>
      <Text style={resultStyles.resultRow}>
        都道府県: {'\n'}[ {address} ]
      </Text>
      <Text style={resultStyles.resultRow}>
        ご相談の内容: {'\n'}[ {description} ]
      </Text>
    </View>
  );
};

const resultStyles = StyleSheet.create({
  result: {
    backgroundColor: '#fff',
    borderColor: '#d6d6d6',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    rowGap: 8,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  resultRow: {
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingBottom: 16,
  },
});
