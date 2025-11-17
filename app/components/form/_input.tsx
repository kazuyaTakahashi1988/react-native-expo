import { useMemo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import ErrorText from './_errorText';
import Label from './_label';
import { useRHFController } from '../../services/reactHookFormHelper';

import type { TypeInput } from '../../lib/types/typeComponents';
import type { FieldValues, UseControllerReturn } from 'react-hook-form';
import type { StyleProp, TextStyle } from 'react-native';

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
  const { controller } = useRHFController({ control, name, rules });

  const hasError = Boolean(errorText);
  const trackAnimatedStyle = useMemo(
    () => buildInputStateStyles(hasError, disabled),
    [disabled, hasError],
  );

  const controllerProps = buildControllerProps(controller);

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />
      <TextInput
        {...textInputProps}
        editable={!disabled}
        placeholderTextColor={'#9e9e9e'}
        style={[styles.input, ...trackAnimatedStyle, style]}
        {...controllerProps}
      />
      <ErrorText errorText={errorText} />
    </View>
  );
};

const buildInputStateStyles = (hasError: boolean, disabled: boolean): StyleProp<TextStyle>[] => {
  const computed: StyleProp<TextStyle>[] = [];

  if (hasError) {
    computed.push(styles.inputError);
  }
  if (disabled) {
    computed.push(styles.inputDisabled);
  }

  return computed;
};

const buildControllerProps = <TFieldValues extends FieldValues>(
  controller: UseControllerReturn<TFieldValues>,
) => {
  const controllerValue = controller.field.value;
  const value = typeof controllerValue === 'string' ? controllerValue : '';

  return {
    onBlur: controller.field.onBlur,
    onChangeText: controller.field.onChange,
    value,
  } as const;
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
