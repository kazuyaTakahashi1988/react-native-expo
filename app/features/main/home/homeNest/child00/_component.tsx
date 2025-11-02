import { StyleSheet, Text, View } from 'react-native';

import type { TypeFormValues } from './_type';
import type { FieldError, Merge } from 'react-hook-form';

/* -----------------------------------------------
 * submit 出力結果表示エリア
 * ----------------------------------------------- */
export const ResultArea: React.FC<TypeFormValues> = (submittedValues) => {
  const { name, email, subscribe, plan, country, note } = submittedValues;

  return (
    <View style={resultStyles.result}>
      <Text style={resultStyles.resultTitle}>Submitted values</Text>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
      <Text>
        Subscribe: {'\n'}
        {subscribe.length > 0
          ? subscribe.map((item) => {
              return item + '\n';
            })
          : null}
      </Text>
      <Text>Plan: {plan}</Text>
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

/* -----------------------------------------------
 * エラーテキスト
 * ----------------------------------------------- */
export const ErrorText: React.FC<Merge<FieldError, (FieldError | undefined)[]>> = (errorsType) => {
  if (errorsType.message == null) {
    return;
  }
  return <Text style={errorStyles.text}>{errorsType.message}</Text>;
};
const errorStyles = StyleSheet.create({
  text: {
    color: '#e53935',
    fontSize: 12,
    marginTop: 4,
  },
});
