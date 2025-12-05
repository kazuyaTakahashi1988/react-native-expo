import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';
import Label from './_label';
import { color } from '../../lib/mixin';
import { useRHFController } from '../../services/formHelper';

import type { TypeCheckBoxCustom, TypeToggleCheckOption } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';

/* -----------------------------------------------
 * チェックボックスカスタム項目
 * ----------------------------------------------- */

const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 28;
const KNOB_SIZE = 22;
const KNOB_MARGIN = (TRACK_HEIGHT - KNOB_SIZE) / 2;

const ERROR_COLOR = color.red;
const DISABLED_COLOR = color.gray100;
const KNOB_MAX_TRANSLATE = TRACK_WIDTH - KNOB_SIZE - KNOB_MARGIN;

const ToggleCheckOption = ({
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
}: TypeToggleCheckOption) => {
  const isDisabled = disabled;

  const trackBackgroundColor = isDisabled
    ? DISABLED_COLOR
    : isSelected
      ? activeColor
      : inactiveColor;

  const knobTranslation = isSelected ? KNOB_MAX_TRANSLATE : KNOB_MARGIN;

  return (
    <Pressable
      accessibilityRole='checkbox'
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

const CheckBoxCustom = <TFieldValues extends FieldValues>({
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
}: TypeCheckBoxCustom<TFieldValues>) => {
  const { controller } = useRHFController({ control, name, rules });
  const controllerValue = controller.field.value;

  const selectedValues = React.useMemo(() => getSelectedValues(controllerValue), [controllerValue]);

  const hasError = Boolean(errorText);

  const activeColor = activeColorProp ?? color.primary;
  const inactiveColor = inactiveColorProp ?? '#d1d5db';
  const knobColor = knobColorProp ?? color.white;

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />
      <View style={[styles.optionList, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const isDisabled = getIsOptionDisabled(option.disabled, disabled);
          return (
            <ToggleCheckOption
              accessibilityState={{ checked: isSelected }}
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
                handleToggleOption(option.value, selectedValues, controller.field.onChange);
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

const getSelectedValues = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value as string[];
};

const getIsOptionDisabled = (
  optionDisabled: boolean | undefined,
  disabled: boolean | undefined,
): boolean => {
  return optionDisabled === true || disabled === true;
};

const handleToggleOption = (
  optionValue: string,
  selectedValues: string[],
  onChange: (value: string[]) => void,
) => {
  if (selectedValues.includes(optionValue)) {
    onChange(selectedValues.filter((selected) => selected !== optionValue));
    return;
  }
  onChange([...selectedValues, optionValue]);
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

export default CheckBoxCustom;
