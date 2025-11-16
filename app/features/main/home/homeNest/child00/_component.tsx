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
      <Text>dummyName: {dummyName}</Text>
      <Text>
        genres: {'\n'}
        {genres && genres.map((item) => `${item}\n`)}
      </Text>
      <Text>
        inquiry: {'\n'}
        {inquiry && inquiry.map((item) => `${item}\n`)}
      </Text>
      <Text>payment: {payment}</Text>
      <Text>theme: {theme}</Text>
      <Text>address: {address}</Text>
      <Text>description: {description}</Text>
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
