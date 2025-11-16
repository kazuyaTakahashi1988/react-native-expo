import { useRef } from 'react';
import { useController } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import ErrorText from './_errorText';
import Label from './_label';

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
  const pickerRef = useRef<RNPickerSelect | null>(null);

  const {
    field: { value, onChange },
  } = useController({ control, name, rules });

  const selectedValue = ensureString(value);
  const hasError = Boolean(errorText);

  const selectedOption = options.find((option) => option.value === selectedValue);
  const isPlaceholder = selectedOption == null;
  const displayLabel = getDisplayLabel(selectedOption, placeholder);

  const triggerStyles = buildTriggerStyles(triggerStyle, hasError, disabled);
  const triggerTextStyles = buildTriggerTextStyles(
    isPlaceholder,
    placeholderTextStyle,
    valueTextStyle,
    disabled,
  );

  const openPicker = () => {
    Keyboard.dismiss();
    pickerRef.current?.togglePicker(true);
  };

  const handleValueChange = (selected: string | null) => {
    onChange(selected ?? '');
  };

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />

      <Pressable accessibilityRole='button' onPress={openPicker} style={triggerStyles}>
        <Text style={triggerTextStyles}>{displayLabel}</Text>
      </Pressable>

      <RNPickerSelect
        disabled={disabled}
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
    backgroundColor: '#fff',
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
    color: '#fff',
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
    backgroundColor: '#fff',
  },
  modalViewBottom: {
    backgroundColor: '#fff',
  },
  done: {
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
  },
} satisfies NonNullable<ComponentProps<typeof RNPickerSelect>['style']>;

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
