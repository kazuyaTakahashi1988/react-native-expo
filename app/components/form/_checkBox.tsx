import { useController } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';

import type { TypeCheckBox } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

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
  disabled = false,
}: TypeCheckBox<TFieldValues>) => {
  const {
    field: { value, onChange },
  } = useController({ control, name, rules });

  const selectedValues = getSelectedValues(value);
  const hasError = errorText?.message != null;
  const labelStyles = buildLabelStyles(labelStyle, disabled);
  const optionListStyles = buildOptionListStyles(optionListStyle);
  const optionTextStyles = getOptionTextStyles(disabled);

  const handleToggle = (optionValue: string) => {
    if (disabled) {
      return;
    }
    onChange(toggleCheckboxValues(selectedValues, optionValue));
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={labelStyles}>{label}</Text>
      <View style={optionListStyles}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const checkboxBaseStyles = buildCheckboxBaseStyles(isSelected, hasError, disabled);
          const optionRowStyles = buildOptionRowStyles(optionRowStyle, disabled);
          return (
            <Pressable
              accessibilityRole='checkbox'
              accessibilityState={{ checked: isSelected }}
              disabled={disabled}
              key={option.key ?? option.value}
              onPress={() => {
                handleToggle(option.value);
              }}
              style={optionRowStyles}
            >
              <View style={checkboxBaseStyles} />
              <Text style={optionTextStyles}>{option.label}</Text>
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
  checkboxDisabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  disabledLabel: {
    color: '#ccc',
  },
  disabledRow: {
    opacity: 0.8,
  },
  disabledOptionText: {
    color: '#ccc',
  },
});

const getSelectedValues = (rawValue: unknown): string[] => {
  if (Array.isArray(rawValue)) {
    return rawValue as string[];
  }
  return [];
};

const toggleCheckboxValues = (selectedValues: string[], optionValue: string): string[] => {
  if (selectedValues.includes(optionValue)) {
    return selectedValues.filter((selected) => selected !== optionValue);
  }
  return [...selectedValues, optionValue];
};

const buildLabelStyles = (
  customLabelStyle: StyleProp<TextStyle> | undefined,
  disabled: boolean,
): StyleProp<TextStyle>[] => {
  const stylesList: StyleProp<TextStyle>[] = [styles.label];

  if (customLabelStyle != null) {
    stylesList.push(customLabelStyle);
  }

  if (disabled) {
    stylesList.push(styles.disabledLabel);
  }

  return stylesList;
};

const buildOptionListStyles = (
  optionListStyle: StyleProp<ViewStyle> | undefined,
): StyleProp<ViewStyle>[] => {
  const stylesList: StyleProp<ViewStyle>[] = [styles.checkboxGroup];

  if (optionListStyle != null) {
    stylesList.push(optionListStyle);
  }

  return stylesList;
};

const buildOptionRowStyles = (
  optionRowStyle: StyleProp<ViewStyle> | undefined,
  disabled: boolean,
): StyleProp<ViewStyle>[] => {
  const stylesList: StyleProp<ViewStyle>[] = [styles.checkboxRow];

  if (optionRowStyle != null) {
    stylesList.push(optionRowStyle);
  }

  if (disabled) {
    stylesList.push(styles.disabledRow);
  }

  return stylesList;
};

const buildCheckboxBaseStyles = (
  isSelected: boolean,
  hasError: boolean,
  disabled: boolean,
): StyleProp<ViewStyle>[] => {
  const stylesList: StyleProp<ViewStyle>[] = [styles.checkboxBase];

  if (isSelected) {
    stylesList.push(styles.checkboxChecked);
  }

  if (hasError) {
    stylesList.push(styles.checkboxError);
  }

  if (disabled) {
    stylesList.push(styles.checkboxDisabled);
  }

  return stylesList;
};

const getOptionTextStyles = (disabled: boolean): StyleProp<TextStyle>[] => {
  const stylesList: StyleProp<TextStyle>[] = [];

  if (disabled) {
    stylesList.push(styles.disabledOptionText);
  }

  return stylesList;
};

export default CheckBox;
