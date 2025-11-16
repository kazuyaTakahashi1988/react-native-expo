import { StyleSheet, Text, View } from 'react-native';

import type { TypeResultArea } from './_type';

/* -----------------------------------------------
 * submit 出力結果表示エリア
 * ----------------------------------------------- */

export const ResultArea: React.FC<TypeResultArea> = (submittedValues) => {
  const { dummyName, genres, inquiry, payment, theme, address, description } = submittedValues;

  return (
    <View style={resultStyles.result}>
      <Text style={resultStyles.resultTitle}>Submitted values</Text>
      <Text>
        ラベル テキスト: {'\n'}[ {dummyName} ]
      </Text>
      <Text>
        よく視聴するジャンル:
        {'\n'}[ {genres && genres.map((item) => `\n・${item}`)}
        {genres && '\n'} ]
      </Text>
      <Text>
        お問い合わせ方法:
        {'\n'}[ {inquiry && inquiry.map((item) => `\n・${item}`)}
        {inquiry && '\n'} ]
      </Text>
      <Text>
        お支払い方法: {'\n'}[ {payment} ]
      </Text>
      <Text>
        テーマ色の選択: {'\n'}[ {theme} ]
      </Text>
      <Text>
        都道府県: {'\n'}[ {address} ]
      </Text>
      <Text>
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
  },
});
