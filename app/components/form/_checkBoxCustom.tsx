import { useEffect, useMemo, useRef } from 'react';
import { useController } from 'react-hook-form';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';

import type { TypeCheckBoxCustom, TypeToggleCheckOption } from '../../lib/types/typeComponents';
import type { ReactElement } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/* -----------------------------------------------
 * チェックボックスカスタム項目
 * ----------------------------------------------- */

const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 28;
const KNOB_SIZE = 22;
const KNOB_MARGIN = (TRACK_HEIGHT - KNOB_SIZE) / 2;

const ERROR_COLOR = '#e53935';

const ToggleCheckOption = ({
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
  disabled,
  value,
}: TypeToggleCheckOption) => {
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

  const trackAnimatedStyle = useMemo(() => {
    if (disabled) {
      return [
        styles.trackDisabled,
        { borderColor: hasError ? ERROR_COLOR : 'transparent' },
      ];
    }
    return {
      backgroundColor,
      borderColor: hasError ? ERROR_COLOR : 'transparent',
    };
  }, [backgroundColor, disabled, hasError]);

  const knobAnimatedStyle = useMemo(() => {
    if (disabled) {
      return [styles.knobDisabled, { transform: [{ translateX }] }];
    }
    return {
      backgroundColor: knobColor,
      transform: [{ translateX }],
    };
  }, [disabled, knobColor, translateX]);

  const optionRowStyles = buildOptionRowStyles(optionRowStyle, disabled);
  const optionLabelStyles = buildOptionLabelStyles(optionLabelStyle, disabled);
  const handlePress = () => {
    onPress(value);
  };

  return (
    <Pressable
      accessibilityRole='checkbox'
      accessibilityState={accessibilityState}
      disabled={disabled}
      onPress={handlePress}
      style={optionRowStyles}
    >
      <Animated.View style={[styles.track, trackAnimatedStyle, trackStyle]}>
        <Animated.View style={[styles.knob, knobAnimatedStyle, knobStyle]} />
      </Animated.View>
      <Text style={optionLabelStyles}>{label}</Text>
    </Pressable>
  );
};

// eslint-disable-next-line complexity
function CheckBoxCustom<TFieldValues extends FieldValues>(
  props: Readonly<TypeCheckBoxCustom<TFieldValues>>,
) {
  const {
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
    disabled = false,
  } = props;
  const {
    field: { value, onChange },
  } = useController({ control, name, rules });

  const selectedValues = normalizeSelectedValues(value);

  const hasError = errorText?.message != null;

  const activeColor = activeColorProp ?? '#007aff';
  const inactiveColor = inactiveColorProp ?? '#d1d5db';
  const knobColor = knobColorProp ?? '#ffffff';

  const labelStyles = buildLabelStyles(labelStyle, disabled);
  const optionListStyles = buildOptionListStyles(optionListStyle);
  const handleToggle = createToggleHandler(disabled, selectedValues, onChange);

  const toggleOptions = buildToggleOptions(options, {
    activeColor,
    disabled,
    handleToggle,
    hasError,
    inactiveColor,
    knobColor,
    knobStyle,
    optionLabelStyle,
    optionRowStyle,
    selectedValues,
    trackStyle,
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={labelStyles}>{label}</Text>
      <View style={optionListStyles}>{toggleOptions}</View>
      <ErrorText {...errorText} />
    </View>
  );
}

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
  disabledLabel: {
    color: '#ccc',
  },
  disabledRow: {
    opacity: 0.8,
  },
  disabledOptionLabel: {
    color: '#ccc',
  },
  trackDisabled: {
    backgroundColor: '#ccc',
  },
  knobDisabled: {
    backgroundColor: '#ccc',
  },
});

const normalizeSelectedValues = (rawValue: unknown): string[] => {
  if (Array.isArray(rawValue)) {
    return rawValue as string[];
  }
  return [];
};

const toggleValues = (selectedValues: string[], optionValue: string): string[] => {
  if (selectedValues.includes(optionValue)) {
    return selectedValues.filter((selected) => selected !== optionValue);
  }
  return [...selectedValues, optionValue];
};

const createToggleHandler = (
  disabled: boolean,
  selectedValues: string[],
  onChange: (values: string[]) => void,
): ((optionValue: string) => void) => {
  if (disabled) {
    return () => {};
  }

  return (optionValue: string) => {
    onChange(toggleValues(selectedValues, optionValue));
  };
};

type BuildToggleOptionsContext = {
  activeColor: string;
  disabled: boolean;
  handleToggle: (value: string) => void;
  hasError: boolean;
  inactiveColor: string;
  knobColor: string;
  knobStyle: StyleProp<ViewStyle> | undefined;
  optionLabelStyle: StyleProp<TextStyle> | undefined;
  optionRowStyle: StyleProp<ViewStyle> | undefined;
  selectedValues: string[];
  trackStyle: StyleProp<ViewStyle> | undefined;
};

const buildToggleOptions = (
  options: TypeCheckBoxCustom<FieldValues>['options'],
  context: BuildToggleOptionsContext,
): ReactElement[] =>
  options.map((option) => {
    const isSelected = context.selectedValues.includes(option.value);
    return (
      <ToggleCheckOption
        accessibilityState={{ checked: isSelected }}
        activeColor={context.activeColor}
        disabled={context.disabled}
        hasError={context.hasError}
        inactiveColor={context.inactiveColor}
        isSelected={isSelected}
        key={option.key ?? option.value}
        knobColor={context.knobColor}
        knobStyle={context.knobStyle}
        label={option.label}
        onPress={context.handleToggle}
        optionLabelStyle={context.optionLabelStyle}
        optionRowStyle={context.optionRowStyle}
        trackStyle={context.trackStyle}
        value={option.value}
      />
    );
  });

const buildLabelStyles = (
  customLabelStyle: StyleProp<TextStyle> | undefined,
  disabled: boolean,
): StyleProp<TextStyle>[] => {
  const stylesList: StyleProp<TextStyle>[] = [styles.label];

  if (customLabelStyle != null) {
    stylesList.push(customLabelStyle);
  }

  if (disabled) {
    stylesList.push(styles.disabledLabel);
  }

  return stylesList;
};

const buildOptionListStyles = (
  optionListStyle: StyleProp<ViewStyle> | undefined,
): StyleProp<ViewStyle>[] => {
  const stylesList: StyleProp<ViewStyle>[] = [styles.optionList];

  if (optionListStyle != null) {
    stylesList.push(optionListStyle);
  }

  return stylesList;
};

const buildOptionRowStyles = (
  optionRowStyle: StyleProp<ViewStyle> | undefined,
  disabled: boolean,
): StyleProp<ViewStyle>[] => {
  const stylesList: StyleProp<ViewStyle>[] = [styles.optionRow];

  if (optionRowStyle != null) {
    stylesList.push(optionRowStyle);
  }

  if (disabled) {
    stylesList.push(styles.disabledRow);
  }

  return stylesList;
};

const buildOptionLabelStyles = (
  optionLabelStyle: StyleProp<TextStyle> | undefined,
  disabled: boolean,
): StyleProp<TextStyle>[] => {
  const stylesList: StyleProp<TextStyle>[] = [styles.optionLabel];

  if (optionLabelStyle != null) {
    stylesList.push(optionLabelStyle);
  }

  if (disabled) {
    stylesList.push(styles.disabledOptionLabel);
  }

  return stylesList;
};

export default CheckBoxCustom;
