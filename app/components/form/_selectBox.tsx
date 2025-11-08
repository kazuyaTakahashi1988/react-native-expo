import { type ComponentProps, useRef } from 'react';
import { type FieldValues, useController } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { ErrorText } from '.';

import type { TypeSelectBoxOption, TypeSelectBoxProps } from '../../lib/types/typeComponents';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/* -----------------------------------------------
 * セレクトボックス項目
 * ----------------------------------------------- */

const defaultPickerStyles = StyleSheet.create({
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
  selectValueText: {
    color: '#212121',
    fontSize: 14,
  },
  selectPlaceholderText: {
    color: '#9e9e9e',
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  container: {
    marginBottom: 16,
  },
  inputError: {
    borderColor: '#e53935',
  },
});

const basePickerSelectStyles = {
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
): StyleProp<ViewStyle>[] => {
  const styles: StyleProp<ViewStyle>[] = [defaultPickerStyles.selectTrigger];

  if (triggerStyle != null) {
    styles.push(triggerStyle);
  }

  if (hasError) {
    styles.push(defaultPickerStyles.inputError);
  }

  return styles;
};

const buildTriggerTextStyles = (
  isPlaceholder: boolean,
  placeholderTextStyle: StyleProp<TextStyle> | undefined,
  valueTextStyle: StyleProp<TextStyle> | undefined,
): StyleProp<TextStyle>[] => {
  const styles: StyleProp<TextStyle>[] = [];

  if (isPlaceholder) {
    styles.push(defaultPickerStyles.selectPlaceholderText);
    if (placeholderTextStyle != null) {
      styles.push(placeholderTextStyle);
    }
    return styles;
  }

  styles.push(defaultPickerStyles.selectValueText);
  if (valueTextStyle != null) {
    styles.push(valueTextStyle);
  }

  return styles;
};

const getDisplayLabel = (selectedOption: TypeSelectBoxOption | undefined, placeholder: string): string => {
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

const SelectBox = <TFieldValues extends FieldValues>({
  containerStyle,
  control,
  doneText = '完了',
  errorText,
  label,
  labelStyle,
  name,
  options,
  pickerSelectStyles,
  placeholder = '選択してください',
  placeholderTextStyle,
  rules,
  triggerStyle,
  valueTextStyle,
}: TypeSelectBoxProps<TFieldValues>) => {
  const pickerRef = useRef<RNPickerSelect | null>(null);

  const {
    field: { value, onChange },
  } = useController({ control, name, rules });

  const selectedValue = ensureString(value);
  const hasError = errorText?.message != null;

  const selectedOption = options.find((option) => option.value === selectedValue);
  const isPlaceholder = selectedOption == null;
  const displayLabel = getDisplayLabel(selectedOption, placeholder);

  const triggerStyles = buildTriggerStyles(triggerStyle, hasError);
  const triggerTextStyles = buildTriggerTextStyles(isPlaceholder, placeholderTextStyle, valueTextStyle);

  const openPicker = () => {
    Keyboard.dismiss();
    pickerRef.current?.togglePicker(true);
  };

  const handleValueChange = (selected: string | null) => {
    onChange(selected ?? '');
  };

  return (
    <View style={[defaultPickerStyles.container, containerStyle]}>
      <Text style={[defaultPickerStyles.label, labelStyle]}>{label}</Text>

      <Pressable accessibilityRole='button' onPress={openPicker} style={triggerStyles}>
        <Text style={triggerTextStyles}>{displayLabel}</Text>
      </Pressable>

      <RNPickerSelect
        ref={(ref) => {
          pickerRef.current = ref;
        }}
        doneText={doneText}
        items={options}
        onValueChange={handleValueChange}
        placeholder={{ label: placeholder, value: '' }}
        style={pickerSelectStyles ?? basePickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        value={toPickerValue(selectedValue)}
      />

      <ErrorText {...errorText} />
    </View>
  );
};

export default SelectBox;
