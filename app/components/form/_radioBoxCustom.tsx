import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';
import Label from './_label';
import { color } from '../../lib/mixin';
import { useRHFController } from '../../services/formHelper';

import type { TypeRadioBoxCustom, TypeToggleRadioOption } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';

/* -----------------------------------------------
 * ラヂオボックスカスタム項目
 * ----------------------------------------------- */

const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 28;
const KNOB_SIZE = 22;
const KNOB_MARGIN = (TRACK_HEIGHT - KNOB_SIZE) / 2;

const ERROR_COLOR = color.red;
const DISABLED_COLOR = color.gray100;
const KNOB_MAX_TRANSLATE = TRACK_WIDTH - KNOB_SIZE - KNOB_MARGIN;

const ToggleRadioOption = ({
  label,
  disabled = false,
  isSelected,
  onPress,
  accessibilityState,
  hasError,
  activeColor,
  inactiveColor,
  knobColor,
  optionRowStyle,
  optionLabelStyle,
  trackStyle,
  knobStyle,
}: TypeToggleRadioOption) => {
  const isDisabled = disabled;

  const trackBackgroundColor = isDisabled
    ? DISABLED_COLOR
    : isSelected
      ? activeColor
      : inactiveColor;

  const knobTranslation = isSelected ? KNOB_MAX_TRANSLATE : KNOB_MARGIN;

  return (
    <Pressable
      accessibilityRole='radio'
      accessibilityState={accessibilityState}
      disabled={isDisabled}
      onPress={onPress}
      style={[styles.optionRow, optionRowStyle]}
    >
      <View
        style={[
          styles.track,
          hasError ? styles.trackError : styles.trackDefault,
          { backgroundColor: trackBackgroundColor },
          trackStyle,
        ]}
      >
        <View
          style={[
            styles.knob,
            { backgroundColor: knobColor },
            { transform: [{ translateX: knobTranslation }] },
            knobStyle,
          ]}
        />
      </View>
      <Text
        style={[
          styles.optionLabel,
          optionLabelStyle,
          isDisabled ? styles.optionLabelDisabled : null,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const RadioBoxCustom = <TFieldValues extends FieldValues>({
  activeColor: activeColorProp,
  containerStyle,
  control,
  disabled,
  errorText,
  inactiveColor: inactiveColorProp,
  knobColor: knobColorProp,
  label,
  name,
  optionListStyle,
  optionRowStyle,
  optionLabelStyle,
  options,
  rules,
  trackStyle,
  knobStyle,
}: TypeRadioBoxCustom<TFieldValues>) => {
  const { controller } = useRHFController({ control, name, rules });
  const controllerValue = controller.field.value;

  const selectedValue = React.useMemo(() => getSelectedValue(controllerValue), [controllerValue]);

  const hasError = Boolean(errorText);

  const activeColor = activeColorProp ?? color.primary;
  const inactiveColor = inactiveColorProp ?? '#d1d5db';
  const knobColor = knobColorProp ?? color.white;

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />
      <View style={[styles.optionList, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          const isDisabled = getIsOptionDisabled(option.disabled, disabled);
          return (
            <ToggleRadioOption
              accessibilityState={{ selected: isSelected }}
              activeColor={activeColor}
              disabled={isDisabled}
              hasError={hasError}
              inactiveColor={inactiveColor}
              isSelected={isSelected}
              key={option.key ?? option.value}
              knobColor={knobColor}
              knobStyle={knobStyle}
              label={option.label}
              onPress={() => {
                handleSelectOption(option.value, controller.field.onChange);
              }}
              optionLabelStyle={optionLabelStyle}
              optionRowStyle={optionRowStyle}
              trackStyle={trackStyle}
            />
          );
        })}
      </View>
      <ErrorText {...{ errorText }} />
    </View>
  );
};

const getSelectedValue = (value: unknown): string => {
  if (typeof value !== 'string') {
    return '';
  }
  return value;
};

const getIsOptionDisabled = (
  optionDisabled: boolean | undefined,
  disabled: boolean | undefined,
): boolean => {
  return optionDisabled === true || disabled === true;
};

const handleSelectOption = (optionValue: string, onChange: (value: string) => void) => {
  onChange(optionValue);
};

const styles = StyleSheet.create({
  optionList: {
    rowGap: 12,
  },
  optionRow: {
    alignItems: 'center',
    columnGap: 12,
    flexDirection: 'row',
  },
  track: {
    borderRadius: TRACK_HEIGHT / 2,
    borderWidth: 1,
    height: TRACK_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: KNOB_MARGIN,
    width: TRACK_WIDTH,
  },
  trackDefault: {
    borderColor: color.transparent,
  },
  trackError: {
    borderColor: ERROR_COLOR,
  },
  knob: {
    borderRadius: KNOB_SIZE / 2,
    elevation: 2,
    height: KNOB_SIZE,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: KNOB_SIZE,
  },
  optionLabel: {
    fontSize: 14,
  },
  optionLabelDisabled: {
    color: color.gray100,
  },
});

export default RadioBoxCustom;
