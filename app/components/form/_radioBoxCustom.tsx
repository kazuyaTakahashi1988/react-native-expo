import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import ErrorText from './_errorText';
import Label from './_label';
import { color } from '../../lib/mixin';
import { useRHFController } from '../../services/formHelper';

import type { TypeRadioBoxCustom, TypeToggleRadioOption } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';
import type { SharedValue } from 'react-native-reanimated';

/* -----------------------------------------------
 * ラヂオボックスカスタム項目
 * ----------------------------------------------- */

const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 28;
const KNOB_SIZE = 22;
const KNOB_MARGIN = (TRACK_HEIGHT - KNOB_SIZE) / 2;

const ERROR_COLOR = '#e53935';
const DISABLED_COLOR = '#9e9e9e';
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
  const progress: SharedValue<number> = useSharedValue<number>(isSelected ? 1 : 0);
  const isDisabled = disabled;

  React.useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, { duration: 200 });
  }, [isSelected, progress]);

  const trackAnimatedStyle = useAnimatedStyle(
    (): { backgroundColor: string } => ({
      backgroundColor: isDisabled
        ? DISABLED_COLOR
        : String(interpolateColor(progress.value, [0, 1], [inactiveColor, activeColor])),
    }),
    [activeColor, inactiveColor, isDisabled],
  );

  const knobAnimatedStyle = useAnimatedStyle(
    (): { transform: { translateX: number }[] } => ({
      transform: [
        {
          translateX: interpolate(progress.value, [0, 1], [KNOB_MARGIN, KNOB_MAX_TRANSLATE]),
        },
      ],
    }),
    [],
  );

  return (
    <Pressable
      accessibilityRole='radio'
      accessibilityState={accessibilityState}
      disabled={isDisabled}
      onPress={onPress}
      style={[styles.optionRow, optionRowStyle]}
    >
      <Animated.View
        style={[
          styles.track,
          hasError ? styles.trackError : styles.trackDefault,
          trackAnimatedStyle,
          trackStyle,
        ]}
      >
        <Animated.View
          style={[styles.knob, { backgroundColor: knobColor }, knobAnimatedStyle, knobStyle]}
        />
      </Animated.View>
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
      <ErrorText errorText={errorText} />
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
    borderColor: 'transparent',
  },
  trackError: {
    borderColor: ERROR_COLOR,
  },
  knob: {
    borderRadius: KNOB_SIZE / 2,
    elevation: 2,
    height: KNOB_SIZE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: KNOB_SIZE,
  },
  optionLabel: {
    fontSize: 14,
  },
  optionLabelDisabled: {
    color: '#9e9e9e',
  },
});

export default RadioBoxCustom;
