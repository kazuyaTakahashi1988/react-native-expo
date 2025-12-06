import { StyleSheet, Text } from 'react-native';

import { color } from '../../lib/mixin';

import type { TypeErrorText } from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * エラーテキスト
 * ----------------------------------------------- */

const ErrorText: React.FC<{ errorText?: TypeErrorText }> = ({ errorText }) => {
  const isErrorText = Boolean(errorText);
  if (!isErrorText) {
    return null;
  }

  return <Text style={styles.text}>{errorText}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: color.red,
    fontSize: 12,
    marginTop: 4,
  },
});

export default ErrorText;
