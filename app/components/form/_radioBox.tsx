import { Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';
import Label from './_label';
import { color } from '../../lib/mixin';
import { useRHFController } from '../../services/formHelper';

import type { TypeRadioBox } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';

/* -----------------------------------------------
 * ラヂオボックス項目
 * ----------------------------------------------- */

const RadioBox = <TFieldValues extends FieldValues>({
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
}: TypeRadioBox<TFieldValues>) => {
  const { controller } = useRHFController({ control, name, rules });

  const selectedValue = getSelectedValue(controller.field.value);
  const hasError = Boolean(errorText);

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
                  styles.radioOuter,
                  isSelected ? styles.radioOuterSelected : null,
                  hasError ? styles.radioOuterError : null,
                  getOptionOuterStyle(isDisabled),
                ]}
              >
                {isSelected ? <View style={getOptionInnerStyle(isDisabled)} /> : null}
              </View>
              <Text style={getOptionLabelStyle(isDisabled)}>{option.label}</Text>
            </Pressable>
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

const getIsOptionDisabled = (optionDisabled: boolean | undefined, disabled: boolean): boolean => {
  return optionDisabled === true || disabled;
};

const handleSelectOption = (optionValue: string, onChange: (value: string) => void) => {
  onChange(optionValue);
};

const getOptionLabelStyle = (disabled: boolean) => {
  if (!disabled) {
    return null;
  }
  return styles.radioBoxTextDisabled;
};

const getOptionOuterStyle = (disabled: boolean) => {
  if (!disabled) {
    return null;
  }
  return styles.radioBoxDisabled;
};

const getOptionInnerStyle = (disabled: boolean) => {
  if (disabled) {
    return styles.radioInnerDisabled;
  }
  return styles.radioInner;
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
  radioOuter: {
    alignItems: 'center',
    borderColor: color.primary,
    borderRadius: 999,
    borderWidth: 2,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  radioBoxTextDisabled: {
    color: color.gray100,
  },
  radioOuterSelected: {
    borderColor: color.primary,
  },
  radioInner: {
    backgroundColor: color.primary,
    borderRadius: 999,
    height: 10,
    width: 10,
  },
  radioInnerDisabled: {
    backgroundColor: color.white,
    borderRadius: 999,
    height: 10,
    width: 10,
  },
  radioOuterError: {
    borderColor: color.red,
  },
  radioBoxDisabled: {
    backgroundColor: color.gray100,
    borderColor: color.gray100,
  },
});

export default RadioBox;
