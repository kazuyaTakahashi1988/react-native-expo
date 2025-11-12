import { StyleSheet, Text } from 'react-native';

import type { TypeLabel } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';

/* -----------------------------------------------
 * ラベル
 * ----------------------------------------------- */

const Label = <TFieldValues extends FieldValues>({ label, rules }: TypeLabel<TFieldValues>) => {
  if (label == null) return;

  return (
    <Text style={styles.label}>
      {label} {rules && <Text style={styles.comma}>※</Text>}
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
    color: '#e53935',
    fontSize: 10,
  },
});

export default Label;
