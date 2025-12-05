import { StyleSheet, TextInput, View } from 'react-native';

import ErrorText from './_errorText';
import Label from './_label';
import { color } from '../../lib/mixin';
import { useRHFController } from '../../services/formHelper';

import type { TypeInput } from '../../lib/types/typeComponents';
import type { FieldValues, UseControllerReturn } from 'react-hook-form';

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
  autoCapitalize = 'none',
  ...textInputProps
}: TypeInput<TFieldValues>) => {
  const { controller } = useRHFController({ control, name, rules });
  const hasError = Boolean(errorText);

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

  const controllerProps = buildControllerProps(controller);

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />
      <TextInput
        {...textInputProps}
        autoCapitalize={autoCapitalize}
        editable={!disabled}
        placeholderTextColor={color.gray100}
        style={[
          styles.input,
          style,
          hasError ? styles.inputError : null,
          disabled ? styles.inputDisabled : null,
        ]}
        {...controllerProps}
      />
      <ErrorText {...{ errorText }} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: color.white,
    borderColor: color.gray100,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputError: {
    borderColor: color.red,
  },
  inputDisabled: {
    backgroundColor: color.gray100,
    color: color.white,
  },
});

export default Input;
