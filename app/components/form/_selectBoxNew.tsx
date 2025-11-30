import React from 'react';
import { Keyboard, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
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

type PickerRef = { togglePicker?: () => void } | null;

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
  valueTextStyle,
}: TypeSelectBox<TFieldValues>) => {
  const pickerRef = React.useRef<PickerRef>(null);
  const { controller } = useRHFController({ control, name, rules });

  const platformState = React.useMemo(() => ({
    isWeb: Platform.OS === 'web',
    isIOS: Platform.OS === 'ios',
  }), []);

  const fieldState = React.useMemo(() => {
    const selectedValue = getSelectedValue(controller.field.value);
    const selectedOption = options.find((option) => option.value === selectedValue);

    return {
      selectedValue,
      selectedOption,
      displayedLabel: selectedOption?.label ?? placeholder,
      isPlaceholder: !selectedOption,
    };
  }, [controller.field.value, options, placeholder]);

  const isDisabled = isSelectDisabled(disabled);
  const hasError = Boolean(errorText);

  const mergedPickerStyles = React.useMemo(
    () =>
      buildPickerStyles({
        baseStyles: selectBaseStyles(platformState.isWeb),
        pickerSelectStyles,
        valueTextStyle,
        placeholderTextStyle,
        hasError,
        isDisabled,
        isWeb: platformState.isWeb,
      }),
    [platformState.isWeb, pickerSelectStyles, valueTextStyle, placeholderTextStyle, hasError, isDisabled],
  );

  const handleValueChange = buildValueChangeHandler(controller.field.onChange);

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
      style={platformState.isIOS ? iosHiddenPickerStyles : mergedPickerStyles}
      useNativeAndroidPickerStyle={false}
      value={toPickerValue(fieldState.selectedValue)}
    />
  );

  const handleOpenPicker = () => {
    Keyboard.dismiss();
    pickerRef.current?.togglePicker?.();
  };

  const textStyle = buildDisplayedTextStyle({
    mergedPickerStyles,
    valueTextStyle,
    placeholderTextStyle,
    isPlaceholder: fieldState.isPlaceholder,
    isDisabled,
  });

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />
      {platformState.isIOS ? (
        <View>
          {pickerElement}
          <Pressable
            disabled={isDisabled}
            onPress={handleOpenPicker}
            style={mergedPickerStyles.inputIOS as StyleProp<ViewStyle>}
          >
            <Text style={textStyle}>{fieldState.displayedLabel}</Text>
          </Pressable>
        </View>
      ) : (
        pickerElement
      )}
      <ErrorText errorText={errorText} />
    </View>
  );
};

const iosHiddenPickerStyles = {
  inputIOS: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  viewContainer: {
    position: 'absolute',
    width: 1,
    height: 1,
  },
  placeholder: { color: 'transparent' },
} satisfies NonNullable<ComponentProps<typeof RNPickerSelect>['style']>;

const baseNativeSelectStyles = {
  inputIOS: {
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
  },
  inputAndroid: {
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
  },
  placeholder: {
    color: color.gray100,
    fontSize: 14,
  },
  viewContainer: {
    width: '100%',
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

const selectBaseStyles = (isWeb: boolean) => (isWeb ? baseWebSelectStyles : baseNativeSelectStyles);

// The style merging involves multiple conditionally included fragments, so we allow a higher complexity here.
// eslint-disable-next-line complexity
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
  const sharedInputStyles = composeInputState({ hasError, isDisabled, isWeb, valueTextStyle });
  const placeholder = composePlaceholder({ baseStyles, placeholderTextStyle, isDisabled });

  return {
    inputIOS: StyleSheet.flatten([
      composeInput(baseStyles.inputIOS as TextStyle, sharedInputStyles),
      pickerSelectStyles?.inputIOS,
    ]),
    inputAndroid: StyleSheet.flatten([
      composeInput(baseStyles.inputAndroid as TextStyle, sharedInputStyles),
      pickerSelectStyles?.inputAndroid,
    ]),
    inputWeb: StyleSheet.flatten([
      composeInput(baseStyles.inputWeb as TextStyle, sharedInputStyles),
      pickerSelectStyles?.inputWeb,
    ]),
    placeholder,
    viewContainer: StyleSheet.flatten([baseStyles.viewContainer, pickerSelectStyles?.viewContainer]),
    iconContainer: StyleSheet.flatten([baseStyles.iconContainer, pickerSelectStyles?.iconContainer]),
    modalViewMiddle: StyleSheet.flatten([baseStyles.modalViewMiddle, pickerSelectStyles?.modalViewMiddle]),
    modalViewBottom: StyleSheet.flatten([baseStyles.modalViewBottom, pickerSelectStyles?.modalViewBottom]),
    done: StyleSheet.flatten([baseStyles.done, pickerSelectStyles?.done]),
  };
};

const buildDisplayedTextStyle = ({
  mergedPickerStyles,
  valueTextStyle,
  placeholderTextStyle,
  isPlaceholder,
  isDisabled,
}: {
  mergedPickerStyles: NonNullable<ComponentProps<typeof RNPickerSelect>['style']>;
  valueTextStyle: StyleProp<TextStyle> | undefined;
  placeholderTextStyle: StyleProp<TextStyle> | undefined;
  isPlaceholder: boolean;
  isDisabled: boolean;
}) => {
  const baseTextStyle = isPlaceholder ? mergedPickerStyles.placeholder : mergedPickerStyles.inputIOS;
  const disabledColor = isDisabled ? { color: color.white } : null;

  return StyleSheet.flatten([baseTextStyle, valueTextStyle, isPlaceholder ? placeholderTextStyle : null, disabledColor]);
};

const composeInputState = ({
  hasError,
  isDisabled,
  isWeb,
  valueTextStyle,
}: {
  hasError: boolean;
  isDisabled: boolean;
  isWeb: boolean;
  valueTextStyle: StyleProp<TextStyle> | undefined;
}) => {
  const errorInputBorder: ViewStyle | undefined = hasError ? { borderColor: color.red } : undefined;
  const disabledInput: ViewStyle | TextStyle | undefined = isDisabled
    ? { backgroundColor: color.gray100, color: color.white }
    : undefined;

  return StyleSheet.flatten([valueTextStyle, errorInputBorder, disabledInput, isWeb ? null : { paddingVertical: 10 }]);
};

const composePlaceholder = ({
  baseStyles,
  placeholderTextStyle,
  isDisabled,
}: {
  baseStyles: NonNullable<ComponentProps<typeof RNPickerSelect>['style']>;
  placeholderTextStyle: StyleProp<TextStyle> | undefined;
  isDisabled: boolean;
}) => {
  return StyleSheet.flatten([
    baseStyles.placeholder,
    placeholderTextStyle,
    isDisabled ? { color: color.white } : null,
  ]);
};

const composeInput = (base: TextStyle, sharedInputStyles: StyleProp<TextStyle>) => {
  return StyleSheet.flatten([base, sharedInputStyles]);
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
