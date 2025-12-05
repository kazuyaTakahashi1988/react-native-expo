import { StyleSheet, Text } from 'react-native';

import { color } from '../../lib/mixin';

import type { TypeLabel } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';

/* -----------------------------------------------
 * ラベル
 * ----------------------------------------------- */

const Label = <TFieldValues extends FieldValues>({ label, rules }: TypeLabel<TFieldValues>) => {
  const isLabel = Boolean(label);
  if (!isLabel) {
    return null;
  }

  const isRequired = Boolean(rules?.required);

  return (
    <Text style={styles.label}>
      {label} {isRequired ? <Text style={styles.comma}>※</Text> : null}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    display: 'flex',
    fontSize: 14,
    fontWeight: '500',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  comma: {
    color: color.red,
    fontSize: 10,
  },
});

export default Label;
