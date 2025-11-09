import { useRef } from 'react';
import { useController } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import ErrorText from './_errorText';

import type { TypeSelectBox, TypeSelectBoxOption } from '../../lib/types/typeComponents';
import type { ComponentProps, RefObject } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/* -----------------------------------------------
 * セレクトボックス項目
 * ----------------------------------------------- */

// eslint-disable-next-line complexity
function SelectBox<TFieldValues extends FieldValues>(
  props: Readonly<TypeSelectBox<TFieldValues>>,
) {
  const {
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
    disabled = false,
  } = props;
  const pickerRef = useRef<RNPickerSelect | null>(null);

  const {
    field: { value, onChange },
  } = useController({ control, name, rules });

  const selectedValue = ensureString(value);
  const hasError = errorText?.message != null;

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
  const labelStyles = buildLabelStyles(labelStyle, disabled);
  const openPicker = buildPickerOpener(disabled, pickerRef);
  const handleValueChange = createValueChangeHandler(onChange);
  const assignPickerRef = createPickerRefAssigner(pickerRef);

  return (
    <View style={[defaultPickerStyles.container, containerStyle]}>
      <Text style={labelStyles}>
        {label}
      </Text>

      <Pressable
        accessibilityRole='button'
        disabled={disabled}
        onPress={openPicker}
        style={triggerStyles}
      >
        <Text style={triggerTextStyles}>{displayLabel}</Text>
      </Pressable>

      <RNPickerSelect
        disabled={disabled}
        doneText={doneText}
        items={options}
        onValueChange={handleValueChange}
        placeholder={{ label: placeholder, value: '' }}
        ref={assignPickerRef}
        style={pickerSelectStyles ?? basePickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        value={toPickerValue(selectedValue)}
      />

      <ErrorText {...errorText} />
    </View>
  );
}

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
  selectTextDisabled: {
    color: '#ccc',
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
  selectTriggerDisabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  disabledLabel: {
    color: '#ccc',
  },
});

const buildLabelStyles = (
  customLabelStyle: StyleProp<TextStyle> | undefined,
  disabled: boolean,
): StyleProp<TextStyle>[] => {
  const styles: StyleProp<TextStyle>[] = [defaultPickerStyles.label];

  if (customLabelStyle != null) {
    styles.push(customLabelStyle);
  }

  if (disabled) {
    styles.push(defaultPickerStyles.disabledLabel);
  }

  return styles;
};

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
  disabled: boolean,
): StyleProp<ViewStyle>[] => {
  const styles: StyleProp<ViewStyle>[] = [defaultPickerStyles.selectTrigger];

  if (triggerStyle != null) {
    styles.push(triggerStyle);
  }

  if (hasError) {
    styles.push(defaultPickerStyles.inputError);
  }

  if (disabled) {
    styles.push(defaultPickerStyles.selectTriggerDisabled);
  }

  return styles;
};

const buildTriggerTextStyles = (
  isPlaceholder: boolean,
  placeholderTextStyle: StyleProp<TextStyle> | undefined,
  valueTextStyle: StyleProp<TextStyle> | undefined,
  disabled: boolean,
): StyleProp<TextStyle>[] => {
  const baseStyle = isPlaceholder
    ? defaultPickerStyles.selectPlaceholderText
    : defaultPickerStyles.selectValueText;

  const styles: StyleProp<TextStyle>[] = [baseStyle];
  const customStyle = isPlaceholder ? placeholderTextStyle : valueTextStyle;

  if (customStyle != null) {
    styles.push(customStyle);
  }

  if (disabled) {
    styles.push(defaultPickerStyles.selectTextDisabled);
  }

  return styles;
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

const buildPickerOpener = (
  disabled: boolean,
  pickerRef: RefObject<RNPickerSelect | null>,
): (() => void) => {
  if (disabled) {
    return () => {};
  }

  return () => {
    Keyboard.dismiss();
    pickerRef.current?.togglePicker(true);
  };
};

const createValueChangeHandler = (
  onChange: (value: string) => void,
): ((selected: string | null) => void) => {
  return (selected) => {
    onChange(selected ?? '');
  };
};

const createPickerRefAssigner = (
  pickerRef: RefObject<RNPickerSelect | null>,
): ((ref: RNPickerSelect | null) => void) => {
  return (ref) => {
    pickerRef.current = ref;
  };
};

export default SelectBox;
