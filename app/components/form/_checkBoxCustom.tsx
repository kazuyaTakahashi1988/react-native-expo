import { useEffect, useMemo, useRef } from 'react';
import { useController } from 'react-hook-form';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';

import type { TypeCheckBoxCustom } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';
import type { PressableProps } from 'react-native';

/* -----------------------------------------------
 * チェックボックスカスタム項目
 * ----------------------------------------------- */

const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 28;
const KNOB_SIZE = 22;
const KNOB_MARGIN = (TRACK_HEIGHT - KNOB_SIZE) / 2;

const ERROR_COLOR = '#e53935';

const ToggleOption = ({
  label,
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
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  accessibilityState: PressableProps['accessibilityState'];
  hasError: boolean;
  activeColor: string;
  inactiveColor: string;
  knobColor: string;
  optionRowStyle: TypeCheckBoxCustom<FieldValues>['optionRowStyle'];
  optionLabelStyle: TypeCheckBoxCustom<FieldValues>['optionLabelStyle'];
  trackStyle: TypeCheckBoxCustom<FieldValues>['trackStyle'];
  knobStyle: TypeCheckBoxCustom<FieldValues>['knobStyle'];
}) => {
  const animation = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isSelected ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animation, isSelected]);

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [KNOB_MARGIN, TRACK_WIDTH - KNOB_SIZE - KNOB_MARGIN],
  });

  const trackAnimatedStyle = useMemo(
    () => ({
      backgroundColor,
      borderColor: hasError ? ERROR_COLOR : 'transparent',
    }),
    [backgroundColor, hasError],
  );

  const knobAnimatedStyle = useMemo(
    () => ({
      backgroundColor: knobColor,
      transform: [{ translateX }],
    }),
    [knobColor, translateX],
  );

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole='checkbox'
      accessibilityState={accessibilityState}
      style={[styles.optionRow, optionRowStyle]}
    >
      <Animated.View style={[styles.track, trackAnimatedStyle, trackStyle]}>
        <Animated.View style={[styles.knob, knobAnimatedStyle, knobStyle]} />
      </Animated.View>
      <Text style={[styles.optionLabel, optionLabelStyle]}>{label}</Text>
    </Pressable>
  );
};

const CheckBoxCustom = <TFieldValues extends FieldValues>({
  activeColor: activeColorProp,
  containerStyle,
  control,
  errorText,
  inactiveColor: inactiveColorProp,
  knobColor: knobColorProp,
  label,
  labelStyle,
  name,
  optionListStyle,
  optionRowStyle,
  optionLabelStyle,
  options,
  rules,
  trackStyle,
  knobStyle,
}: TypeCheckBoxCustom<TFieldValues>) => {
  const {
    field: { value, onChange },
  } = useController({ control, name, rules });

  const selectedValues = useMemo(() => (Array.isArray(value) ? (value as string[]) : []), [value]);

  const hasError = errorText?.message != null;

  const activeColor = activeColorProp ?? '#007aff';
  const inactiveColor = inactiveColorProp ?? '#d1d5db';
  const knobColor = knobColorProp ?? '#ffffff';

  const handleToggle = (optionValue: string) => {
    if (selectedValues.includes(optionValue)) {
      onChange(selectedValues.filter((selected) => selected !== optionValue));
      return;
    }
    onChange([...selectedValues, optionValue]);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={[styles.optionList, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <ToggleOption
              key={option.key ?? option.value}
              label={option.label}
              isSelected={isSelected}
              onPress={() => {
                handleToggle(option.value);
              }}
              accessibilityState={{ checked: isSelected }}
              hasError={hasError}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              knobColor={knobColor}
              optionRowStyle={optionRowStyle}
              optionLabelStyle={optionLabelStyle}
              trackStyle={trackStyle}
              knobStyle={knobStyle}
            />
          );
        })}
      </View>
      <ErrorText {...errorText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
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
});

export default CheckBoxCustom;
