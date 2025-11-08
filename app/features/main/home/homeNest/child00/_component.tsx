import { type FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { TypeResultArea } from './_type';

/* -----------------------------------------------
 * submit 出力結果表示エリア
 * ----------------------------------------------- */

export const ResultArea: FC<TypeResultArea> = (submittedValues) => {
  const { name, email, subscribe, plan, country, note, subscribeCustom, planCustom } =
    submittedValues;

  // 各値が空の場合、マウントせず離脱
  const isBlank = (v: unknown): boolean =>
    v == null || (typeof v === 'string' && v.trim() === '') || (Array.isArray(v) && v.length === 0);
  const hasMissingValues = [
    name,
    email,
    subscribe,
    plan,
    country,
    note,
    subscribeCustom,
    planCustom,
  ].some(isBlank);
  if (hasMissingValues) {
    return null;
  }

  return (
    <View style={resultStyles.result}>
      <Text style={resultStyles.resultTitle}>Submitted values</Text>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
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
    marginTop: 24,
    padding: 16,
    rowGap: 8,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});
