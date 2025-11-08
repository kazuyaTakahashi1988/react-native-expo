import { type FieldValues, useController } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';

import type { TypeCheckBox } from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * チェックボックス項目
 * ----------------------------------------------- */

const CheckBox = <TFieldValues extends FieldValues>({
  containerStyle,
  control,
  errorText,
  label,
  labelStyle,
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

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={[styles.checkboxGroup, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <Pressable
              key={option.key ?? option.value}
              accessibilityRole='checkbox'
              accessibilityState={{ checked: isSelected }}
              onPress={() => {
                handleToggle(option.value);
              }}
              style={[styles.checkboxRow, optionRowStyle]}
            >
              <View
                style={[
                  styles.checkboxBase,
                  isSelected ? styles.checkboxChecked : null,
                  hasError ? styles.checkboxError : null,
                ]}
              />
              <Text>{option.label}</Text>
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
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  checkboxGroup: {
    rowGap: 12,
  },
  checkboxRow: {
    alignItems: 'center',
    columnGap: 12,
    flexDirection: 'row',
  },
  checkboxBase: {
    borderColor: '#007aff',
    borderRadius: 4,
    borderWidth: 2,
    height: 20,
    width: 20,
  },
  checkboxChecked: {
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  checkboxError: {
    borderColor: '#e53935',
  },
});

export default CheckBox;
