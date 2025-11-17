import { useEffect, useMemo } from 'react';
import { useController } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import ErrorText from './_errorText';
import Label from './_label';

import type { TypeCheckBoxCustom, TypeToggleCheckOption } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';

/* -----------------------------------------------
 * チェックボックスカスタム項目
 * ----------------------------------------------- */

const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 28;
const KNOB_SIZE = 22;
const KNOB_MARGIN = (TRACK_HEIGHT - KNOB_SIZE) / 2;

const ERROR_COLOR = '#e53935';
const DISABLED_COLOR = '#9e9e9e';
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
  const progress: SharedValue<number> = useSharedValue<number>(isSelected ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, { duration: 200 });
  }, [isSelected, progress]);

  const trackAnimatedStyle = useAnimatedStyle(
    (): { backgroundColor: string } => ({
      backgroundColor: disabled
        ? DISABLED_COLOR
        : String(interpolateColor(progress.value, [0, 1], [inactiveColor, activeColor])),
    }),
    [activeColor, disabled, inactiveColor],
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
      accessibilityRole='checkbox'
      accessibilityState={accessibilityState}
      disabled={disabled}
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
        style={[styles.optionLabel, optionLabelStyle, disabled ? styles.optionLabelDisabled : null]}
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
  const shouldUseController = Boolean(control && name);
  const controller = shouldUseController ? useController({ control, name, rules }) : null;
  const controllerValue = controller?.field.value;

  const selectedValues = useMemo(
    () => (Array.isArray(controllerValue) ? (controllerValue as string[]) : []),
    [controllerValue],
  );

  const hasError = Boolean(errorText);

  const activeColor = activeColorProp ?? '#007aff';
  const inactiveColor = inactiveColorProp ?? '#d1d5db';
  const knobColor = knobColorProp ?? '#ffffff';

  const handleToggle = (optionValue: string) => {
    if (!shouldUseController || controller == null) {
      return;
    }

    if (selectedValues.includes(optionValue)) {
      controller.field.onChange(selectedValues.filter((selected) => selected !== optionValue));
      return;
    }
    controller.field.onChange([...selectedValues, optionValue]);
  };

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />
      <View style={[styles.optionList, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const isDisabled = () => option.disabled === true || disabled || !shouldUseController;
          return (
            <ToggleCheckOption
              accessibilityState={{ checked: isSelected }}
              activeColor={activeColor}
              disabled={isDisabled()}
              hasError={hasError}
              inactiveColor={inactiveColor}
              isSelected={isSelected}
              key={option.key ?? option.value}
              knobColor={knobColor}
              knobStyle={knobStyle}
              label={option.label}
              onPress={() => {
                handleToggle(option.value);
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

export default CheckBoxCustom;
