import { StyleSheet, Text } from 'react-native';

import type { TypeErrorText } from '../../lib/types/typeComponents';

type ErrorTextProps = {
  errorText?: TypeErrorText;
};

/* -----------------------------------------------
 * エラーテキスト
 * ----------------------------------------------- */

const ErrorText: React.FC<ErrorTextProps> = ({ errorText }) => {
  if (errorText == null) {
    return null;
  }
  return <Text style={errorStyles.text}>{errorText}</Text>;
};
const errorStyles = StyleSheet.create({
  text: {
    color: '#e53935',
    fontSize: 12,
    marginTop: 4,
  },
});

export default ErrorText;
