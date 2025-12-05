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

import type { TypeBoxCustomOption, TypeRadioBoxCustom } from '../../lib/types/typeComponents';
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
    return styles.radioBoxTextDisabled;
  };

  return (
    <Pressable
      accessibilityRole='radio'
      accessibilityState={{ selected: isSelected, disabled: isDisabled }}
      disabled={isDisabled}
      onPress={onToggle}
      style={[styles.radioRow, optionRowStyle]}
    >
      <AnimatedView
        style={[
          styles.radioBoxBase,
          animatedBaseStyle,
          hasError ? styles.radioBoxError : null,
          isDisabled ? styles.radioBoxDisabled : null,
        ]}
      >
        <AnimatedView
          style={[
            styles.radioBoxKnob,
            animatedKnobStyle,
            isDisabled ? styles.radioBoxKnobDisabled : null,
          ]}
        />
      </AnimatedView>
      <Text style={getOptionLabelStyle(isDisabled)}>{label}</Text>
    </Pressable>
  );
};

/* -----------------------------------------------
 * ラヂオボックスカスタム項目（親コンポーネント）
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

  const getIsOptionDisabled = (
    optionDisabled: boolean | undefined,
    allDisabled: boolean,
  ): boolean => optionDisabled === true || allDisabled;

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />
      <View style={[styles.radioGroup, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
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
                controller.field.onChange(option.value);
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
  radioBoxKnob: {
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
  radioBoxKnobDisabled: {
    backgroundColor: color.white,
    opacity: 0.7,
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
