import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import ErrorText from './_errorText';
import Label from './_label';
import { color } from '../../lib/mixin';
import { useRHFController } from '../../services/formHelper';

import type { TypeBoxCustomOption, TypeCheckBoxCustom } from '../../lib/types/typeComponents';
import type React from 'react';
import type { FieldValues } from 'react-hook-form';

const AnimatedView = Animated.createAnimatedComponent(View);

/* -----------------------------------------------
 * オプション行（Reanimated付き）
 * ----------------------------------------------- */

const OptionRow: React.FC<TypeBoxCustomOption> = ({
  label,
  isSelected,
  isDisabled,
  hasError,
  optionRowStyle,
  onToggle,
}) => {
  const progress = useSharedValue(isSelected ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, {
      duration: 200,
    });
  }, [isSelected, progress]);

  // 背景色アニメーション（OFF: gray, ON: primary）
  const animatedBaseStyle = useAnimatedStyle(() => {
    // disabled のときは静的スタイルを優先
    if (isDisabled) {
      return {};
    }

    const backgroundColor = interpolateColor(progress.value, [0, 1], [color.gray, color.primary]);

    return {
      backgroundColor,
    };
  });

  // ノブの位置アニメーション
  const animatedKnobStyle = useAnimatedStyle(() => {
    const translateX = progress.value * 18; // 18px 移動
    return {
      transform: [{ translateX }],
    };
  });

  const getOptionLabelStyle = (disabled: boolean) => {
    if (!disabled) {
      return null;
    }
    return styles.checkBoxTextDisabled;
  };

  return (
    <Pressable
      accessibilityRole='checkbox'
      accessibilityState={{ checked: isSelected, disabled: isDisabled }}
      disabled={isDisabled}
      onPress={onToggle}
      style={[styles.checkBoxRow, optionRowStyle]}
    >
      <AnimatedView
        style={[
          styles.checkBoxBase,
          animatedBaseStyle,
          hasError ? styles.checkBoxError : null,
          isDisabled ? styles.checkBoxDisabled : null,
        ]}
      >
        <AnimatedView
          style={[
            styles.checkBoxKnob,
            animatedKnobStyle,
            isDisabled ? styles.checkBoxKnobDisabled : null,
          ]}
        />
      </AnimatedView>

      <Text style={getOptionLabelStyle(isDisabled)}>{label}</Text>
    </Pressable>
  );
};

/* -----------------------------------------------
 * チェックボックスカスタム項目（親コンポーネント）
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

  const getIsOptionDisabled = (
    optionDisabled: boolean | undefined,
    allDisabled: boolean,
  ): boolean => optionDisabled === true || allDisabled;

  const getToggleOption = (optionValue: string) => {
    if (selectedValues.includes(optionValue)) {
      return selectedValues.filter((selected) => selected !== optionValue);
    }
    return [...selectedValues, optionValue];
  };

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />
      <View style={[styles.checkBoxGroup, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const isDisabled = getIsOptionDisabled(option.disabled, disabled);

          /*
           * オプション行（Reanimated付き）
           */
          return (
            <OptionRow
              hasError={hasError}
              isDisabled={isDisabled}
              isSelected={isSelected}
              key={option.key ?? option.value}
              label={option.label}
              onToggle={() => {
                const toggleOption = getToggleOption(option.value);
                controller.field.onChange(toggleOption);
              }}
              optionRowStyle={optionRowStyle}
              value={option.value}
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
  checkBoxKnob: {
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
  checkBoxKnobDisabled: {
    backgroundColor: color.white,
    opacity: 0.7,
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
