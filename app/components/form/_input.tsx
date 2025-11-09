import { useController } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import ErrorText from './_errorText';

import type { TypeInput } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';
import type { StyleProp, TextStyle } from 'react-native';

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
  disabled = false,
  ...textInputProps
}: TypeInput<TFieldValues>) => {
  const {
    field: { onBlur, onChange, value },
  } = useController({ control, name, rules });

  const inputValue = normalizeInputValue(value);
  const hasError = errorText?.message != null;
  const placeholderColor = getPlaceholderColor(disabled);
  const labelStyles = buildLabelStyles(disabled);
  const inputStylesList = buildInputStyles(hasError, disabled, style);

  return (
    <View style={[inputStyles.container, containerStyle]}>
      <Text style={labelStyles}>{label}</Text>
      <TextInput
        {...textInputProps}
        editable={!disabled}
        onBlur={onBlur}
        onChangeText={onChange}
        placeholderTextColor={placeholderColor}
        style={inputStylesList}
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
  inputDisabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
    color: '#ccc',
  },
  disabledLabel: {
    color: '#ccc',
  },
});

const buildLabelStyles = (disabled: boolean): StyleProp<TextStyle>[] => {
  const styles: StyleProp<TextStyle>[] = [inputStyles.label];

  if (disabled) {
    styles.push(inputStyles.disabledLabel);
  }

  return styles;
};

const buildInputStyles = (
  hasError: boolean,
  disabled: boolean,
  customStyle: StyleProp<TextStyle> | undefined,
): StyleProp<TextStyle>[] => {
  const styles: StyleProp<TextStyle>[] = [inputStyles.input];

  if (hasError) {
    styles.push(inputStyles.inputError);
  }

  if (customStyle != null) {
    styles.push(customStyle);
  }

  if (disabled) {
    styles.push(inputStyles.inputDisabled);
  }

  return styles;
};

const getPlaceholderColor = (disabled: boolean): string => {
  if (disabled) {
    return '#ccc';
  }
  return '#9e9e9e';
};

const normalizeInputValue = (rawValue: unknown): string => {
  if (typeof rawValue === 'string') {
    return rawValue;
  }
  return '';
};

export default Input;
