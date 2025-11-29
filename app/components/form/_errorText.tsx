import { StyleSheet, Text } from 'react-native';

import { color } from '../../lib/mixin';

import type { TypeErrorText } from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * エラーテキスト
 * ----------------------------------------------- */

const ErrorText: React.FC<{ errorText?: TypeErrorText }> = ({ errorText }) => {
  if (errorText == null) {
    return null;
  }
  return <Text style={errorStyles.text}>{errorText}</Text>;
};
const errorStyles = StyleSheet.create({
  text: {
    color: color.red,
    fontSize: 12,
    marginTop: 4,
  },
});

export default ErrorText;
