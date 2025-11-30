import React from 'react';
import { Keyboard, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
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
  const pickerRef = React.useRef<RNPickerSelect | null>(null);
  const isWeb = Platform.OS === 'web';
  const { controller } = useRHFController({ control, name, rules });

  const selectedValue = getSelectedValue(controller.field.value);
  const hasError = Boolean(errorText);
  const isDisabled = isSelectDisabled(disabled);

  const selectedOption = options.find((option) => option.value === selectedValue);
  const isPlaceholder = selectedOption == null;
  const displayLabel = getDisplayLabel(selectedOption, placeholder);

  const triggerStyles = React.useMemo(
    () => buildTriggerStyles({ triggerStyle, hasError, isDisabled }),
    [triggerStyle, hasError, isDisabled],
  );

  const triggerTextStyles = React.useMemo(
    () =>
      buildTriggerTextStyles({
        isPlaceholder,
        placeholderTextStyle,
        valueTextStyle,
        isDisabled,
      }),
    [isPlaceholder, placeholderTextStyle, valueTextStyle, isDisabled],
  );

  const mergedPickerStyles = React.useMemo(
    () =>
      buildPickerStyles({
        baseStyles: isWeb ? baseWebSelectStyles : baseNativeSelectStyles,
        pickerSelectStyles,
        valueTextStyle,
        placeholderTextStyle,
        hasError,
        isDisabled,
        isWeb,
      }),
    [isWeb, pickerSelectStyles, valueTextStyle, placeholderTextStyle, hasError, isDisabled],
  );

  const handleValueChange = buildValueChangeHandler(controller.field.onChange);

  const openPicker = () => {
    if (isWeb) return;
    Keyboard.dismiss();
    pickerRef.current?.togglePicker(true);
  };

  const pickerElement = (
    <RNPickerSelect
      disabled={isDisabled}
      doneText={doneText}
      items={options}
      onOpen={Keyboard.dismiss}
      onValueChange={handleValueChange}
      placeholder={{ label: placeholder, value: '' }}
      ref={(ref) => {
        pickerRef.current = ref;
      }}
      style={mergedPickerStyles}
      useNativeAndroidPickerStyle={false}
      value={toPickerValue(selectedValue)}
    />
  );

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />

      {isWeb ? (
        pickerElement
      ) : (
        <>
          <Pressable
            accessibilityRole='button'
            disabled={isDisabled}
            onPress={openPicker}
            style={triggerStyles}
          >
            <Text style={triggerTextStyles}>{displayLabel}</Text>
          </Pressable>

          {pickerElement}
        </>
      )}

      <ErrorText errorText={errorText} />
    </View>
  );
};

const baseTriggerStyle: ViewStyle = {
  alignItems: 'center',
  backgroundColor: color.white,
  borderColor: color.gray100,
  borderRadius: 8,
  borderWidth: 1,
  flexDirection: 'row',
  minHeight: 44,
  paddingHorizontal: 12,
  paddingVertical: 10,
};

const baseValueTextStyle: TextStyle = {
  color: color.black,
  fontSize: 14,
};

const hiddenInput: TextStyle = {
  height: 0,
  opacity: 0,
  padding: 0,
};

const baseNativeSelectStyles = {
  inputIOS: hiddenInput,
  inputAndroid: hiddenInput,
  placeholder: {
    color: color.gray100,
    fontSize: 14,
  },
  viewContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
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

const baseWebSelectStyles = {
  inputWeb: {
    ...baseTriggerStyle,
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
  valueTextStyle,
  placeholderTextStyle,
  hasError,
  isDisabled,
  isWeb,
}: {
  baseStyles: NonNullable<ComponentProps<typeof RNPickerSelect>['style']>;
  pickerSelectStyles: ComponentProps<typeof RNPickerSelect>['style'];
  valueTextStyle: StyleProp<TextStyle> | undefined;
  placeholderTextStyle: StyleProp<TextStyle> | undefined;
  hasError: boolean;
  isDisabled: boolean;
  isWeb: boolean;
}): NonNullable<ComponentProps<typeof RNPickerSelect>['style']> => {
  const errorInputBorder: ViewStyle | undefined = hasError && isWeb ? { borderColor: color.red } : undefined;
  const disabledInput: ViewStyle | TextStyle | undefined = isDisabled && isWeb
    ? { backgroundColor: color.gray100, color: color.white }
    : undefined;

  const mergedWebInput = (base: TextStyle) =>
    StyleSheet.flatten([base, valueTextStyle, errorInputBorder, disabledInput]);

  const mergedPlaceholder = StyleSheet.flatten([
    baseStyles.placeholder,
    placeholderTextStyle,
    isDisabled ? { color: color.white } : null,
  ]);

  return {
    inputIOS: StyleSheet.flatten([baseStyles.inputIOS as TextStyle, pickerSelectStyles?.inputIOS]),
    inputAndroid: StyleSheet.flatten([
      baseStyles.inputAndroid as TextStyle,
      pickerSelectStyles?.inputAndroid,
    ]),
    inputWeb: StyleSheet.flatten([mergedWebInput(baseStyles.inputWeb as TextStyle), pickerSelectStyles?.inputWeb]),
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

const buildTriggerStyles = ({
  triggerStyle,
  hasError,
  isDisabled,
}: {
  triggerStyle: StyleProp<ViewStyle> | undefined;
  hasError: boolean;
  isDisabled: boolean;
}): StyleProp<ViewStyle>[] => {
  const styles: StyleProp<ViewStyle>[] = [baseTriggerStyle];

  if (triggerStyle != null) {
    styles.push(triggerStyle);
  }

  if (hasError) {
    styles.push({ borderColor: color.red });
  }

  if (isDisabled) {
    styles.push({ backgroundColor: color.gray100 });
  }

  return styles;
};

const buildTriggerTextStyles = ({
  isPlaceholder,
  placeholderTextStyle,
  valueTextStyle,
  isDisabled,
}: {
  isPlaceholder: boolean;
  placeholderTextStyle: StyleProp<TextStyle> | undefined;
  valueTextStyle: StyleProp<TextStyle> | undefined;
  isDisabled: boolean;
}): StyleProp<TextStyle>[] => {
  const styles: StyleProp<TextStyle>[] = [];

  if (isPlaceholder) {
    styles.push({ ...baseValueTextStyle, color: color.gray100 });
    if (placeholderTextStyle != null) {
      styles.push(placeholderTextStyle);
    }
    if (isDisabled) {
      styles.push({ color: color.white });
    }
    return styles;
  }

  styles.push(baseValueTextStyle);

  if (valueTextStyle != null) {
    styles.push(valueTextStyle);
  }

  if (isDisabled) {
    styles.push({ color: color.white });
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
  return selectedOption.label ?? placeholder;
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
