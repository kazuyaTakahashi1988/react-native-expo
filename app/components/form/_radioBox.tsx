import { useController } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';

import type { TypeRadioBox } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/* -----------------------------------------------
 * ラヂオボックス項目
 * ----------------------------------------------- */

const RadioBox = <TFieldValues extends FieldValues>({
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
}: TypeRadioBox<TFieldValues>) => {
  const {
    field: { value, onChange },
  } = useController({ control, name, rules });

  const selectedValue = getSelectedValue(value);
  const hasError = errorText?.message != null;
  const labelStyles = buildLabelStyles(labelStyle, disabled);
  const optionListStyles = buildOptionListStyles(optionListStyle);
  const optionRowStyles = buildOptionRowStyles(optionRowStyle, disabled);
  const optionTextStyles = getOptionTextStyles(disabled);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={labelStyles}>{label}</Text>
      <View style={optionListStyles}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          const radioOuterStyles = buildRadioOuterStyles(isSelected, hasError, disabled);
          return (
            <Pressable
              accessibilityRole='radio'
              accessibilityState={{ selected: isSelected }}
              disabled={disabled}
              key={option.key ?? option.value}
              onPress={() => {
                onChange(option.value);
              }}
              style={optionRowStyles}
            >
              <View style={radioOuterStyles}>
                {isSelected ? <View style={buildRadioInnerStyles(disabled)} /> : null}
              </View>
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
  radioGroup: {
    rowGap: 12,
  },
  radioRow: {
    alignItems: 'center',
    columnGap: 12,
    flexDirection: 'row',
  },
  radioOuter: {
    alignItems: 'center',
    borderColor: '#007aff',
    borderRadius: 999,
    borderWidth: 2,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  radioOuterSelected: {
    borderColor: '#007aff',
  },
  radioInner: {
    backgroundColor: '#007aff',
    borderRadius: 999,
    height: 10,
    width: 10,
  },
  radioOuterError: {
    borderColor: '#e53935',
  },
  radioOuterDisabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  radioInnerDisabled: {
    backgroundColor: '#ccc',
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

const getSelectedValue = (rawValue: unknown): string => {
  if (typeof rawValue === 'string') {
    return rawValue;
  }
  return '';
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
  const stylesList: StyleProp<ViewStyle>[] = [styles.radioGroup];

  if (optionListStyle != null) {
    stylesList.push(optionListStyle);
  }

  return stylesList;
};

const buildOptionRowStyles = (
  optionRowStyle: StyleProp<ViewStyle> | undefined,
  disabled: boolean,
): StyleProp<ViewStyle>[] => {
  const stylesList: StyleProp<ViewStyle>[] = [styles.radioRow];

  if (optionRowStyle != null) {
    stylesList.push(optionRowStyle);
  }

  if (disabled) {
    stylesList.push(styles.disabledRow);
  }

  return stylesList;
};

const buildRadioOuterStyles = (
  isSelected: boolean,
  hasError: boolean,
  disabled: boolean,
): StyleProp<ViewStyle>[] => {
  const stylesList: StyleProp<ViewStyle>[] = [styles.radioOuter];

  if (isSelected) {
    stylesList.push(styles.radioOuterSelected);
  }

  if (hasError) {
    stylesList.push(styles.radioOuterError);
  }

  if (disabled) {
    stylesList.push(styles.radioOuterDisabled);
  }

  return stylesList;
};

const buildRadioInnerStyles = (disabled: boolean): StyleProp<ViewStyle>[] => {
  const stylesList: StyleProp<ViewStyle>[] = [styles.radioInner];

  if (disabled) {
    stylesList.push(styles.radioInnerDisabled);
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

export default RadioBox;
