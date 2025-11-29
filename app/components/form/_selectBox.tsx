import React from 'react';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import ErrorText from './_errorText';
import Label from './_label';
import { color } from '../../lib/mixin';
import { useRHFController } from '../../services/formHelper';

import type { TypeSelectBox, TypeSelectBoxOption } from '../../lib/types/typeComponents';
import type { ComponentProps } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/* -----------------------------------------------
 * セレクトボックス項目
 * ----------------------------------------------- */

const SelectBox = <TFieldValues extends FieldValues>({
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
  const pickerRef = React.useRef<RNPickerSelect | null>(null);
  const { controller } = useRHFController({ control, name, rules });

  const selectedValue = getSelectedValue(controller.field.value);
  const hasError = Boolean(errorText);
  const isDisabled = isSelectDisabled(disabled);

  const selectedOption = options.find((option) => option.value === selectedValue);
  const isPlaceholder = selectedOption == null;
  const displayLabel = getDisplayLabel(selectedOption, placeholder);

  const triggerStyles = buildTriggerStyles(triggerStyle, hasError, isDisabled);
  const triggerTextStyles = buildTriggerTextStyles(
    isPlaceholder,
    placeholderTextStyle,
    valueTextStyle,
    isDisabled,
  );

  const openPicker = () => {
    Keyboard.dismiss();
    pickerRef.current?.togglePicker(true);
  };

  const handleValueChange = buildValueChangeHandler(controller.field.onChange);

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />

      <Pressable
        accessibilityRole='button'
        disabled={isDisabled}
        onPress={openPicker}
        style={triggerStyles}
      >
        <Text style={triggerTextStyles}>{displayLabel}</Text>
      </Pressable>

      <RNPickerSelect
        disabled={isDisabled}
        doneText={doneText}
        items={options}
        onValueChange={handleValueChange}
        placeholder={{ label: placeholder, value: '' }}
        ref={(ref) => {
          pickerRef.current = ref;
        }}
        style={pickerSelectStyles ?? baseSelectStyles}
        useNativeAndroidPickerStyle={false}
        value={toPickerValue(selectedValue)}
      />

      <ErrorText errorText={errorText} />
    </View>
  );
};

const styles = StyleSheet.create({
  selectTrigger: {
    alignItems: 'center',
    backgroundColor: color.white,
    borderColor: '#d6d6d6',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selectTriggerDisabled: {
    backgroundColor: '#9e9e9e',
  },
  selectValueText: {
    color: '#212121',
    fontSize: 14,
  },
  selectValueTextDisabled: {
    color: color.white,
  },
  selectPlaceholderText: {
    color: '#9e9e9e',
    fontSize: 14,
  },
  inputError: {
    borderColor: '#e53935',
  },
});

const baseSelectStyles = {
  inputIOS: {
    height: 0,
    opacity: 0,
    padding: 0,
  },
  inputAndroid: {
    height: 0,
    opacity: 0,
    padding: 0,
  },
  inputWeb: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
    opacity: 0,
  },
  placeholder: {
    color: '#9e9e9e',
  },
  viewContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
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

const buildTriggerStyles = (
  triggerStyle: StyleProp<ViewStyle> | undefined,
  hasError: boolean,
  disabled: boolean,
): StyleProp<ViewStyle>[] => {
  const buildStyles: StyleProp<ViewStyle>[] = [
    styles.selectTrigger,
    disabled ? styles.selectTriggerDisabled : null,
  ];

  if (triggerStyle != null) {
    buildStyles.push(triggerStyle);
  }

  if (hasError) {
    buildStyles.push(styles.inputError);
  }

  return buildStyles;
};

const buildTriggerTextStyles = (
  isPlaceholder: boolean,
  placeholderTextStyle: StyleProp<TextStyle> | undefined,
  valueTextStyle: StyleProp<TextStyle> | undefined,
  disabled: boolean,
): StyleProp<TextStyle>[] => {
  const buildStyles: StyleProp<TextStyle>[] = [];

  if (isPlaceholder) {
    buildStyles.push(styles.selectPlaceholderText);
    if (placeholderTextStyle != null) {
      buildStyles.push(placeholderTextStyle);
    }
    return buildStyles;
  }

  buildStyles.push(styles.selectValueText);
  if (valueTextStyle != null) {
    buildStyles.push(valueTextStyle);
  }
  if (disabled) {
    buildStyles.push(styles.selectValueTextDisabled);
  }

  return buildStyles;
};

const getDisplayLabel = (
  selectedOption: TypeSelectBoxOption | undefined,
  placeholder: string,
): string => {
  if (selectedOption == null) {
    return placeholder;
  }
  return selectedOption.label;
};

const toPickerValue = (value: string): string | null => {
  if (value === '') {
    return null;
  }
  return value;
};

export default SelectBox;
