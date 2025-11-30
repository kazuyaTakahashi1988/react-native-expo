import React from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import ErrorText from './_errorText';
import Label from './_label';
import { color } from '../../lib/mixin';
import { useRHFController } from '../../services/formHelper';

import type { TypeSelectBox } from '../../lib/types/typeComponents';
import type { ComponentProps } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/* -----------------------------------------------
 * セレクトボックス (クロスプラットフォーム)
 * ----------------------------------------------- */

const SelectBoxNew = <TFieldValues extends FieldValues>({
  containerStyle,
  control,
  disabled = false,
  doneText,
  errorText,
  label,
  name,
  options,
  pickerSelectStyles,
  placeholder = '選択してください',
  placeholderTextStyle,
  rules,
  triggerStyle,
  valueTextStyle,
}: TypeSelectBox<TFieldValues>) => {
  const { controller } = useRHFController({ control, name, rules });

  const selectedValue = getSelectedValue(controller.field.value);
  const hasError = Boolean(errorText);
  const isDisabled = isSelectDisabled(disabled);

  const mergedPickerStyles = React.useMemo(
    () => buildPickerStyles({
      baseStyles: baseSelectStyles,
      pickerSelectStyles,
      triggerStyle,
      valueTextStyle,
      placeholderTextStyle,
      hasError,
      isDisabled,
    }),
    [pickerSelectStyles, triggerStyle, valueTextStyle, placeholderTextStyle, hasError, isDisabled],
  );

  const handleValueChange = buildValueChangeHandler(controller.field.onChange);

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />

      <RNPickerSelect
        disabled={isDisabled}
        doneText={doneText}
        items={options}
        onOpen={Keyboard.dismiss}
        onValueChange={handleValueChange}
        placeholder={{ label: placeholder, value: '' }}
        style={mergedPickerStyles}
        useNativeAndroidPickerStyle={false}
        value={toPickerValue(selectedValue)}
      />

      <ErrorText errorText={errorText} />
    </View>
  );
};

const baseInputStyle: TextStyle = {
  alignItems: 'center',
  backgroundColor: color.white,
  borderColor: color.gray100,
  borderRadius: 8,
  borderWidth: 1,
  color: color.black,
  flexDirection: 'row',
  fontSize: 14,
  minHeight: 44,
  paddingHorizontal: 12,
  paddingVertical: 10,
};

const baseSelectStyles = {
  inputIOS: baseInputStyle,
  inputAndroid: {
    ...baseInputStyle,
    paddingVertical: Platform.Version >= 30 ? 10 : 8,
  },
  inputWeb: {
    ...baseInputStyle,
    outlineStyle: 'none',
  },
  placeholder: {
    color: color.gray100,
    fontSize: 14,
  },
  viewContainer: {
    width: '100%',
  },
  iconContainer: {
    height: '100%',
    justifyContent: 'center',
    right: 12,
  },
  modalViewMiddle: {
    backgroundColor: color.white,
  },
  modalViewBottom: {
    backgroundColor: color.white,
  },
  done: {
    color: color.primary,
    fontSize: 16,
    fontWeight: '600',
  },
} satisfies NonNullable<ComponentProps<typeof RNPickerSelect>['style']>;

const buildPickerStyles = ({
  baseStyles,
  pickerSelectStyles,
  triggerStyle,
  valueTextStyle,
  placeholderTextStyle,
  hasError,
  isDisabled,
}: {
  baseStyles: NonNullable<ComponentProps<typeof RNPickerSelect>['style']>;
  pickerSelectStyles: ComponentProps<typeof RNPickerSelect>['style'];
  triggerStyle: StyleProp<ViewStyle> | undefined;
  valueTextStyle: StyleProp<TextStyle> | undefined;
  placeholderTextStyle: StyleProp<TextStyle> | undefined;
  hasError: boolean;
  isDisabled: boolean;
}): NonNullable<ComponentProps<typeof RNPickerSelect>['style']> => {
  const errorInputBorder: ViewStyle | undefined = hasError ? { borderColor: color.red } : undefined;
  const disabledInput: ViewStyle | TextStyle | undefined = isDisabled
    ? { backgroundColor: color.gray100, color: color.white }
    : undefined;

  const mergedInput = (base: TextStyle) =>
    StyleSheet.flatten([base, triggerStyle, valueTextStyle, errorInputBorder, disabledInput]);

  const mergedPlaceholder = StyleSheet.flatten([
    baseStyles.placeholder,
    placeholderTextStyle,
    isDisabled ? { color: color.white } : null,
  ]);

  return {
    inputIOS: StyleSheet.flatten([mergedInput(baseStyles.inputIOS as TextStyle), pickerSelectStyles?.inputIOS]),
    inputAndroid: StyleSheet.flatten([
      mergedInput(baseStyles.inputAndroid as TextStyle),
      pickerSelectStyles?.inputAndroid,
    ]),
    inputWeb: StyleSheet.flatten([mergedInput(baseStyles.inputWeb as TextStyle), pickerSelectStyles?.inputWeb]),
    placeholder: mergedPlaceholder,
    viewContainer: StyleSheet.flatten([baseStyles.viewContainer, pickerSelectStyles?.viewContainer]),
    iconContainer: StyleSheet.flatten([baseStyles.iconContainer, pickerSelectStyles?.iconContainer]),
    modalViewMiddle: StyleSheet.flatten([baseStyles.modalViewMiddle, pickerSelectStyles?.modalViewMiddle]),
    modalViewBottom: StyleSheet.flatten([baseStyles.modalViewBottom, pickerSelectStyles?.modalViewBottom]),
    done: StyleSheet.flatten([baseStyles.done, pickerSelectStyles?.done]),
  };
};

const buildValueChangeHandler = (
  onChange: ((value: string) => void) | undefined,
): ((selected: string | null) => void) => {
  if (!onChange) {
    return () => undefined;
  }
  return (selected: string | null) => {
    onChange(selected ?? '');
  };
};

const getSelectedValue = (rawValue: unknown): string => {
  return ensureString(rawValue);
};

const isSelectDisabled = (disabled: boolean): boolean => {
  return disabled;
};

const ensureString = (rawValue: unknown): string => {
  if (typeof rawValue === 'string') {
    return rawValue;
  }
  return '';
};

const toPickerValue = (value: string): string | null => {
  if (value === '') {
    return null;
  }
  return value;
};

export default SelectBoxNew;
