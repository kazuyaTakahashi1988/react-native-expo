import { useEffect, useMemo, useState } from 'react';
import { useController } from 'react-hook-form';
import { StyleSheet, TextInput, View } from 'react-native';

import ErrorText from './_errorText';
import Label from './_label';

import type { TypeInput } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';

/* -----------------------------------------------
 * インプット項目
 * ----------------------------------------------- */
const Input = <TFieldValues extends FieldValues>(props: TypeInput<TFieldValues>) => {
  if (props.control != null && props.name != null) {
    return <ControlledInput {...(props as ControlledInputProps<TFieldValues>)} />;
  }

  return <UncontrolledInput {...props} />;
};

const ControlledInput = <TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  ...restProps
}: ControlledInputProps<TFieldValues>) => {
  const {
    field: { onBlur, onChange, value },
  } = useController({ control, name, rules });

  const inputValue = typeof value === 'string' ? value : '';

  return (
    <InputBase
      {...restProps}
      onBlur={onBlur}
      onChangeText={onChange}
      rules={rules}
      value={inputValue}
    />
  );
};

const UncontrolledInput = <TFieldValues extends FieldValues>(props: TypeInput<TFieldValues>) => {
  const sanitizedProps = props as Omit<TypeInput<TFieldValues>, 'control' | 'name'>;
  const {
    containerStyle,
    disabled = false,
    errorText,
    label,
    rules,
    style,
    ...textInputProps
  } = sanitizedProps;

  const initialValue =
    typeof textInputProps.defaultValue === 'string' ? textInputProps.defaultValue : '';
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (typeof textInputProps.defaultValue === 'string') {
      setValue(textInputProps.defaultValue);
    }
  }, [textInputProps.defaultValue]);

  return (
    <InputBase
      containerStyle={containerStyle}
      disabled={disabled}
      errorText={errorText}
      label={label}
      onChangeText={setValue}
      rules={rules}
      style={style}
      value={value}
      {...textInputProps}
    />
  );
};

const InputBase = <TFieldValues extends FieldValues>({
  containerStyle,
  disabled = false,
  errorText,
  label,
  rules,
  style,
  value,
  onBlur,
  onChangeText,
  ...textInputProps
}: InputBaseProps<TFieldValues>) => {
  const hasError = errorText?.message != null;
  const trackAnimatedStyle = useMemo(
    () => [hasError ? styles.inputError : null, disabled ? styles.inputDisabled : null],
    [disabled, hasError],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Label {...{ label, rules }} />
      <TextInput
        {...textInputProps}
        editable={!disabled}
        onBlur={onBlur}
        onChangeText={onChangeText}
        placeholderTextColor={'#9e9e9e'}
        style={[styles.input, trackAnimatedStyle, style]}
        value={value}
      />
      <ErrorText {...errorText} />
    </View>
  );
};

type ControlledInputProps<TFieldValues extends FieldValues> = TypeInput<TFieldValues> &
  Required<Pick<TypeInput<TFieldValues>, 'control' | 'name'>>;

type InputBaseProps<TFieldValues extends FieldValues> = Omit<
  TypeInput<TFieldValues>,
  'control' | 'name'
> & {
  value: string;
  onBlur?: () => void;
  onChangeText: (text: string) => void;
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
