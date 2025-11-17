import { useController } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';
import Label from './_label';

import type { TypeCheckBox } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';

/* -----------------------------------------------
 * チェックボックス項目
 * ----------------------------------------------- */

const CheckBox = <TFieldValues extends FieldValues>({
  containerStyle,
  control,
  disabled = false,
  errorText,
  label,
  name,
  optionListStyle,
  optionRowStyle,
  options,
  rules,
}: TypeCheckBox<TFieldValues>) => {
  const shouldUseController = Boolean(control && name);
  const controller = shouldUseController ? useController({ control, name, rules }) : null;
  const controllerValue = controller?.field.value;

  const selectedValues = Array.isArray(controllerValue) ? (controllerValue as string[]) : [];
  const hasError = Boolean(errorText);

  const handleToggle = (optionValue: string) => {
    if (!shouldUseController || controller == null) {
      return;
    }

    if (selectedValues.includes(optionValue)) {
      controller.field.onChange(selectedValues.filter((selected) => selected !== optionValue));
      return;
    }
    controller.field.onChange([...selectedValues, optionValue]);
  };

  const optionLabelStyle = (disabled?: boolean) => {
    return disabled === true ? styles.checkBoxTextDisabled : null;
  };

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />
      <View style={[styles.checkBoxGroup, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const isDisabled = () => option.disabled === true || disabled || !shouldUseController;
          return (
            <Pressable
              accessibilityRole='checkbox'
              accessibilityState={{ checked: isSelected }}
              disabled={isDisabled()}
              key={option.key ?? option.value}
              onPress={() => {
                handleToggle(option.value);
              }}
              style={[styles.checkBoxRow, optionRowStyle]}
            >
              <View
                style={[
                  styles.checkBoxBase,
                  isSelected ? styles.checkBoxChecked : null,
                  hasError ? styles.checkBoxError : null,
                  isDisabled() ? styles.checkBoxDisabled : null,
                ]}
              />
              <Text style={optionLabelStyle(isDisabled())}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <ErrorText errorText={errorText} />
    </View>
  );
};

const styles = StyleSheet.create({
  checkBoxGroup: {
    rowGap: 12,
  },
  checkBoxRow: {
    alignItems: 'center',
    columnGap: 12,
    flexDirection: 'row',
  },
  checkBoxBase: {
    borderColor: '#007aff',
    borderRadius: 4,
    borderWidth: 2,
    height: 20,
    width: 20,
  },
  checkBoxTextDisabled: {
    color: '#9e9e9e',
  },
  checkBoxChecked: {
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  checkBoxError: {
    borderColor: '#e53935',
  },
  checkBoxDisabled: {
    backgroundColor: '#9e9e9e',
    borderColor: '#9e9e9e',
  },
});

export default CheckBox;
