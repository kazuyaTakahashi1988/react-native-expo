import { StyleSheet, Text, View } from 'react-native';

import { color } from '../../../../../lib/mixin';

import type { TypeResultArea } from './_type';

/* -----------------------------------------------
 * 出力結果エリア
 * ----------------------------------------------- */

export const ResultArea: React.FC<TypeResultArea> = (formValues) => {
  // formValues が空なら離脱
  const hasValues = Object.keys(formValues).length > 0;
  if (!hasValues) {
    return null;
  }

  const { name, genres, inquiry, payment, theme, address, description } = formValues;

  return (
    <View style={styles.result}>
      <Text style={styles.resultTitle}>Submitted values</Text>
      {[
        { label: 'お名前', value: name },
        { label: 'よく視聴するジャンル', value: genres },
        { label: 'お問い合わせ方法', value: inquiry },
        { label: 'お支払い方法', value: payment },
        { label: 'テーマ色の選択', value: theme },
        { label: '都道府県', value: address },
        { label: 'ご相談の内容', value: description },
      ].map((elm, i) => (
        <View key={i} style={styles.resultRow}>
          <Text>{elm.label}</Text>
          <Text style={styles.resultRowValue}>
            {typeof elm.value === 'object'
              ? elm.value.map((_elm, _i) => <Text key={_i}>・{_elm}</Text>)
              : elm.value}
          </Text>
        </View>
      ))}
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
  resultRowValue: {
    backgroundColor: color.gray200,
    borderRadius: 8,
    marginTop: 5,
    padding: 8,
  },
});
