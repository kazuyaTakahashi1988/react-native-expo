import { Controller } from 'react-hook-form';
import { StyleSheet, TextInput, View } from 'react-native';

import ErrorText from './_errorText';
import Label from './_label';

import type { TypeInput } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';

/* -----------------------------------------------
 * インプット項目
 * ----------------------------------------------- */

const Input = <TFieldValues extends FieldValues>({
  containerStyle,
  control,
  disabled = false,
  errorText,
  label,
  name,
  rules,
  style,
  ...textInputProps
}: TypeInput<TFieldValues>) => {
  const hasError = errorText?.message != null;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onBlur, onChange, value },
      }) => {
        const inputValue = typeof value === 'string' ? value : '';
        const trackAnimatedStyle = [
          hasError ? styles.inputError : null,
          disabled ? styles.inputDisabled : null,
        ];

        return (
          <View style={[styles.container, containerStyle]}>
            <Label {...{ label, rules }} />
            <TextInput
              {...textInputProps}
              editable={!disabled}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholderTextColor={'#9e9e9e'}
              style={[styles.input, trackAnimatedStyle, style]}
              value={inputValue}
            />
            <ErrorText {...errorText} />
          </View>
        );
      }}
      rules={rules}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
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
  inputDisabled: {
    backgroundColor: '#9e9e9e',
    color: '#fff',
  },
});

export default Input;
