import { Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';
import Label from './_label';
import { color } from '../../lib/mixin';
import { useRHFController } from '../../services/formHelper';

import type { TypeRadioBoxCustom } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';
import type { StyleProp, ViewStyle } from 'react-native';

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

  const getKnobStyle = (selected: boolean, disabled: boolean) => {
    const buildStyles: StyleProp<ViewStyle>[] = [];

    if (selected) {
      buildStyles.push(styles.checkBoxKcobSelected);
    }

    if (disabled) {
      buildStyles.push(styles.checkBoxKcobDisabled);
    }

    return buildStyles;
  };

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />
      <View style={[styles.radioGroup, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          const isDisabled = getIsOptionDisabled(option.disabled, disabled);
          return (
            <Pressable
              accessibilityRole='radio'
              accessibilityState={{ selected: isSelected }}
              disabled={isDisabled}
              key={option.key ?? option.value}
              onPress={() => {
                handleSelectOption(option.value, controller.field.onChange);
              }}
              style={[styles.radioRow, optionRowStyle]}
            >
              <View
                style={[
                  styles.radioBoxBase,
                  isSelected ? styles.checkBoxSelected : null,
                  hasError ? styles.radioBoxError : null,
                  isDisabled ? styles.radioBoxDisabled : null,
                ]}
              >
                <View style={[styles.radioBoxKcob, getKnobStyle(isSelected, isDisabled)]} />
              </View>
              <Text style={getOptionLabelStyle(isDisabled)}>{option.label}</Text>
            </Pressable>
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
