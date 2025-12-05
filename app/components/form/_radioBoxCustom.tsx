import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect, useMemo } from 'react';

import ErrorText from './_errorText';
import Label from './_label';
import { color } from '../../lib/mixin';
import { useRHFController } from '../../services/formHelper';

import type { TypeRadioBoxCustom } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';
import type { StyleProp, TextStyle } from 'react-native';

/* -----------------------------------------------
 * ラヂオボックスカスタム項目
 * ----------------------------------------------- */

const RadioBoxCustom = <TFieldValues extends FieldValues>({
  containerStyle,
  control,
  disabled = false,
  errorText,
  label,
  name,
  optionListStyle,
  optionRowStyle,
  options,
  rules,
}: TypeRadioBoxCustom<TFieldValues>) => {
  const { controller } = useRHFController({ control, name, rules });
  const hasError = Boolean(errorText);

  const getSelectedValue = (value: unknown): string => {
    if (typeof value !== 'string') {
      return '';
    }
    return value;
  };
  const selectedValue = getSelectedValue(controller.field.value);

  const getIsOptionDisabled = (optionDisabled: boolean | undefined, disabled: boolean): boolean => {
    return optionDisabled === true || disabled;
  };

  const handleSelectOption = (optionValue: string, onChange: (value: string) => void) => {
    onChange(optionValue);
  };

  /*
   * 適用スタイル
   */
  const getOptionLabelStyle = (disabled: boolean) => {
    if (!disabled) {
      return null;
    }
    return styles.radioBoxTextDisabled;
  };

  const knobOffsetRange = useMemo(
    () => [styles.radioBoxKcob.left ?? 0, styles.checkBoxKcobSelected.left ?? 0],
    [],
  );

  const RadioBoxOptionRow = ({
    isDisabled,
    isSelected,
    labelStyle,
    onPress,
    optionLabel,
  }: {
    isDisabled: boolean;
    isSelected: boolean;
    labelStyle: StyleProp<TextStyle>;
    onPress: () => void;
    optionLabel: string;
  }) => {
    const animation = useSharedValue(isSelected ? 1 : 0);

    useEffect(() => {
      animation.value = withTiming(isSelected ? 1 : 0, { duration: 200 });
    }, [animation, isSelected]);

    const animatedBackgroundStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(animation.value, [0, 1], [color.gray, color.primary]),
    }));

    const animatedKnobStyle = useAnimatedStyle(() => ({
      left: knobOffsetRange[0] + (knobOffsetRange[1] - knobOffsetRange[0]) * animation.value,
    }));

    return (
      <Pressable
        accessibilityRole='radio'
        accessibilityState={{ selected: isSelected }}
        disabled={isDisabled}
        onPress={onPress}
        style={[styles.radioRow, optionRowStyle]}
      >
        <Animated.View
          style={[
            styles.radioBoxBase,
            animatedBackgroundStyle,
            hasError ? styles.radioBoxError : null,
            isDisabled ? styles.radioBoxDisabled : null,
          ]}
        >
          <Animated.View
            style={[styles.radioBoxKcob, animatedKnobStyle, isDisabled ? styles.checkBoxKcobDisabled : null]}
          />
        </Animated.View>
        <Text style={labelStyle}>{optionLabel}</Text>
      </Pressable>
    );
  };

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />
      <View style={[styles.radioGroup, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          const isDisabled = getIsOptionDisabled(option.disabled, disabled);
          return (
            <RadioBoxOptionRow
              isDisabled={isDisabled}
              isSelected={isSelected}
              key={option.key ?? option.value}
              labelStyle={getOptionLabelStyle(isDisabled)}
              onPress={() => {
                handleSelectOption(option.value, controller.field.onChange);
              }}
              optionLabel={option.label}
            />
          );
        })}
      </View>
      <ErrorText {...{ errorText }} />
    </View>
  );
};

const styles = StyleSheet.create({
  radioGroup: {
    rowGap: 12,
  },
  radioRow: {
    alignItems: 'center',
    columnGap: 12,
    flexDirection: 'row',
  },
  radioBoxBase: {
    backgroundColor: color.gray,
    borderColor: color.gray,
    borderRadius: 20,
    borderWidth: 1,
    height: 30,
    justifyContent: 'center',
    width: 50,
  },
  radioBoxTextDisabled: {
    color: color.gray100,
  },
  radioBoxKcob: {
    backgroundColor: color.white,
    borderRadius: 22,
    height: 22,
    left: 5,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: 22,
  },
  checkBoxKcobSelected: {
    left: 23,
  },
  checkBoxKcobDisabled: {
    backgroundColor: color.white,
  },
  checkBoxSelected: {
    backgroundColor: color.primary,
  },
  radioBoxError: {
    borderColor: color.red,
  },
  radioBoxDisabled: {
    backgroundColor: color.gray100,
    borderColor: color.gray100,
  },
});

export default RadioBoxCustom;
