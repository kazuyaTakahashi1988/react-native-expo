import { Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';
import Label from './_label';
import useOptionalController from './_useOptionalController';

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
  const { controller, isActive } = useOptionalController({ control, name, rules });
  const selectedValues = getSelectedValues(controller.field.value, isActive);
  const hasError = Boolean(errorText);

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />
      <View style={[styles.checkBoxGroup, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const isDisabled = getIsOptionDisabled(option.disabled, disabled, isActive);
          return (
            <Pressable
              accessibilityRole='checkbox'
              accessibilityState={{ checked: isSelected }}
              disabled={isDisabled}
              key={option.key ?? option.value}
              onPress={() => {
                handleToggleOption(option.value, selectedValues, controller.field.onChange, isActive);
              }}
              style={[styles.checkBoxRow, optionRowStyle]}
            >
              <View
                style={[
                  styles.checkBoxBase,
                  isSelected ? styles.checkBoxChecked : null,
                  hasError ? styles.checkBoxError : null,
                  isDisabled ? styles.checkBoxDisabled : null,
                ]}
              />
              <Text style={getOptionLabelStyle(isDisabled)}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <ErrorText errorText={errorText} />
    </View>
  );
};

const getSelectedValues = (value: unknown, isActive: boolean): string[] => {
  if (!isActive || !Array.isArray(value)) {
    return [];
  }
  return value as string[];
};

const getIsOptionDisabled = (
  optionDisabled: boolean | undefined,
  disabled: boolean,
  isActive: boolean,
): boolean => {
  if (!isActive) {
    return true;
  }

  return optionDisabled === true || disabled;
};

const handleToggleOption = (
  optionValue: string,
  selectedValues: string[],
  onChange: (value: string[]) => void,
  isActive: boolean,
) => {
  if (!isActive) {
    return;
  }

  if (selectedValues.includes(optionValue)) {
    onChange(selectedValues.filter((selected) => selected !== optionValue));
    return;
  }
  onChange([...selectedValues, optionValue]);
};

const getOptionLabelStyle = (disabled: boolean) => {
  if (!disabled) {
    return null;
  }
  return styles.checkBoxTextDisabled;
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
