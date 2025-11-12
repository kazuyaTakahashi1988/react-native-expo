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
  const {
    field: { value, onChange },
  } = useController({ control, name, rules });

  const selectedValues = Array.isArray(value) ? (value as string[]) : [];
  const hasError = errorText?.message != null;

  const handleToggle = (optionValue: string) => {
    if (selectedValues.includes(optionValue)) {
      onChange(selectedValues.filter((selected) => selected !== optionValue));
      return;
    }
    onChange([...selectedValues, optionValue]);
  };

  const optionLabelStyle = (disabled?: boolean) => {
    return disabled === true ? styles.checkBoxTextDisabled : null;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Label {...{ label, rules }} />
      <View style={[styles.checkBoxGroup, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const isDisabled = () => {
            return option.disabled === true || disabled;
          };
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
      <ErrorText {...errorText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
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
