import { useMemo } from 'react';
import { useController } from 'react-hook-form';
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
  const {
    field: { onBlur, onChange, value },
  } = useController({ control, name, rules });

  const inputValue = typeof value === 'string' ? value : '';
  const hasError = Boolean(errorText);
  const trackAnimatedStyle = useMemo(
    () => [hasError ? styles.inputError : null, disabled ? styles.inputDisabled : null],
    [disabled, hasError],
  );

  return (
    <View style={containerStyle}>
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
      <ErrorText errorText={errorText} />
    </View>
  );
};

const styles = StyleSheet.create({
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
