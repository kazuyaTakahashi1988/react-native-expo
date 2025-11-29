import { Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';
import Label from './_label';
import { color } from '../../lib/mixin';
import { useRHFController } from '../../services/formHelper';

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
  const { controller } = useRHFController({ control, name, rules });
  const selectedValues = getSelectedValues(controller.field.value);
  const hasError = Boolean(errorText);

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />
      <View style={[styles.checkBoxGroup, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const isDisabled = getIsOptionDisabled(option.disabled, disabled);
          return (
            <Pressable
              accessibilityRole='checkbox'
              accessibilityState={{ checked: isSelected }}
              disabled={isDisabled}
              key={option.key ?? option.value}
              onPress={() => {
                handleToggleOption(option.value, selectedValues, controller.field.onChange);
              }}
              style={[styles.checkBoxRow, optionRowStyle]}
            >
              <View
                style={[
                  styles.checkBoxBase,
                  hasError ? styles.checkBoxError : null,
                  isDisabled ? styles.checkBoxDisabled : null,
                ]}
              >
                {isSelected && (
                  <View style={[styles.checkBoxSelected, getSelectedStyle(isDisabled)]} />
                )}
              </View>

              <Text style={getOptionLabelStyle(isDisabled)}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <ErrorText errorText={errorText} />
    </View>
  );
};

const getSelectedValues = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value as string[];
};

const getIsOptionDisabled = (optionDisabled: boolean | undefined, disabled: boolean): boolean => {
  return optionDisabled === true || disabled;
};

const handleToggleOption = (
  optionValue: string,
  selectedValues: string[],
  onChange: (value: string[]) => void,
) => {
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

const getSelectedStyle = (disabled: boolean) => {
  if (!disabled) {
    return null;
  }
  return (styles.checkBoxSelected, styles.checkBoxSelectedDisabled);
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
    alignItems: 'center',
    borderColor: color.primary,
    borderRadius: 4,
    borderWidth: 2,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  checkBoxTextDisabled: {
    color: color.gray100,
  },
  checkBoxSelected: {
    backgroundColor: color.primary,
    borderRadius: 4,
    bottom: 0,
    height: 12,
    width: 12,
  },
  checkBoxSelectedDisabled: {
    backgroundColor: color.gray100,
  },
  checkBoxError: {
    borderColor: color.red,
  },
  checkBoxDisabled: {
    backgroundColor: color.white,
    borderColor: color.gray100,
  },
});

export default CheckBox;
