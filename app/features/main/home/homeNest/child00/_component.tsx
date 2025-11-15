import { StyleSheet, Text, View } from 'react-native';

import type { TypeResultArea } from './_type';

/* -----------------------------------------------
 * submit 出力結果表示エリア
 * ----------------------------------------------- */

export const ResultArea: React.FC<TypeResultArea> = (submittedValues) => {
  const { name, subscribe, plan, country, note, subscribeCustom, planCustom } = submittedValues;

  return (
    <View style={resultStyles.result}>
      <Text style={resultStyles.resultTitle}>Submitted values</Text>
      <Text>Name: {name}</Text>
      <Text>
        Subscribe: {'\n'}
        {subscribe && subscribe.map((item) => `${item}\n`)}
      </Text>
      <Text>
        Subscribe Custom: {'\n'}
        {subscribeCustom && subscribeCustom.map((item) => `${item}\n`)}
      </Text>
      <Text>Plan: {plan}</Text>
      <Text>Plan Custom: {planCustom}</Text>
      <Text>Country: {country}</Text>
      <Text>note: {note}</Text>
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
