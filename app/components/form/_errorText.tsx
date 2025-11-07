import { StyleSheet, Text } from 'react-native';

import type { TypeErrorText } from '../../lib/types/typeComponents';

const ErrorText: React.FC<TypeErrorText> = (errorsType) => {
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

export default ErrorText;
