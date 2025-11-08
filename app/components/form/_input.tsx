import { type FieldValues, useController } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import ErrorText from './_errorText';

import type { TypeInput } from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * インプット項目
 * ----------------------------------------------- */

const Input = <TFieldValues extends FieldValues>({
  containerStyle,
  control,
  errorText,
  label,
  name,
  rules,
  style,
  ...textInputProps
}: TypeInput<TFieldValues>) => {
  const {
    field: { onBlur, onChange, value },
  } = useController({ control, name, rules });

  const inputValue = typeof value === 'string' ? value : '';
  const hasError = errorText?.message != null;

  return (
    <View style={[inputStyles.container, containerStyle]}>
      <Text style={inputStyles.label}>{label}</Text>
      <TextInput
        {...textInputProps}
        onBlur={onBlur}
        onChangeText={onChange}
        style={[inputStyles.input, hasError ? inputStyles.inputError : null, style]}
        value={inputValue}
      />
      <ErrorText {...errorText} />
    </View>
  );
};

const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#d6d6d6',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputError: {
    borderColor: '#e53935',
  },
});

export default Input;
