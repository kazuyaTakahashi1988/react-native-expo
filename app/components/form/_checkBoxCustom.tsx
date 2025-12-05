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

import type { TypeCheckBoxCustom } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';
import type { StyleProp, TextStyle } from 'react-native';

/* -----------------------------------------------
 * チェックボックスカスタム項目
 * ----------------------------------------------- */

const CheckBoxCustom = <TFieldValues extends FieldValues>({
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
}: TypeCheckBoxCustom<TFieldValues>) => {
  const { controller } = useRHFController({ control, name, rules });
  const hasError = Boolean(errorText);

  const getSelectedValues = (value: unknown): string[] => {
    if (!Array.isArray(value)) {
      return [];
    }
    return value as string[];
  };
  const selectedValues = getSelectedValues(controller.field.value);

  const getIsOptionDisabled = (optionDisabled: boolean | undefined, disabled: boolean): boolean => {
    return optionDisabled === true || disabled;
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

  /*
   * 適用スタイル
   */
  const getOptionLabelStyle = (disabled: boolean) => {
    if (!disabled) {
      return null;
    }
    return styles.checkBoxTextDisabled;
  };

  const knobOffsetRange = useMemo(
    () => [styles.checkBoxKcob.left ?? 0, styles.checkBoxKcobSelected.left ?? 0],
    [],
  );

  const CheckBoxOptionRow = useMemo(
    () =>
      ({
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
            accessibilityRole='checkbox'
            accessibilityState={{ checked: isSelected }}
            disabled={isDisabled}
            onPress={onPress}
            style={[styles.checkBoxRow, optionRowStyle]}
          >
            <Animated.View
              style={[
                styles.checkBoxBase,
                animatedBackgroundStyle,
                hasError ? styles.checkBoxError : null,
                isDisabled ? styles.checkBoxDisabled : null,
              ]}
            >
              <Animated.View
                style={[styles.checkBoxKcob, animatedKnobStyle, isDisabled ? styles.checkBoxKnobDisabled : null]}
              />
            </Animated.View>

            <Text style={labelStyle}>{optionLabel}</Text>
          </Pressable>
        );
      },
    [hasError, knobOffsetRange, optionRowStyle],
  );

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />
      <View style={[styles.checkBoxGroup, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const isDisabled = getIsOptionDisabled(option.disabled, disabled);
          return (
            <CheckBoxOptionRow
              isDisabled={isDisabled}
              isSelected={isSelected}
              key={option.key ?? option.value}
              labelStyle={getOptionLabelStyle(isDisabled)}
              onPress={() => {
                handleToggleOption(option.value, selectedValues, controller.field.onChange);
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
  checkBoxGroup: {
    rowGap: 12,
  },
  checkBoxRow: {
    alignItems: 'center',
    columnGap: 12,
    flexDirection: 'row',
  },
  checkBoxBase: {
    backgroundColor: color.gray,
    borderColor: color.gray,
    borderRadius: 20,
    borderWidth: 1,
    height: 30,
    justifyContent: 'center',
    width: 50,
  },
  checkBoxTextDisabled: {
    color: color.gray100,
  },
  checkBoxKcob: {
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
  checkBoxKnobDisabled: {
    backgroundColor: color.white,
  },
  checkBoxSelected: {
    backgroundColor: color.primary,
  },
  checkBoxError: {
    borderColor: color.red,
  },
  checkBoxDisabled: {
    backgroundColor: color.gray100,
    borderColor: color.gray100,
  },
});

export default CheckBoxCustom;
