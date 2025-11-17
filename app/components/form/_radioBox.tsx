import { Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';
import Label from './_label';
import { useRHFController } from '../../services/reactHookFormHelper';

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
    borderColor: '#007aff',
    borderRadius: 999,
    borderWidth: 2,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  radioBoxTextDisabled: {
    color: '#9e9e9e',
  },
  radioOuterSelected: {
    borderColor: '#007aff',
  },
  radioInner: {
    backgroundColor: '#007aff',
    borderRadius: 999,
    height: 10,
    width: 10,
  },
  radioInnerDisabled: {
    backgroundColor: '#fff',
    borderRadius: 999,
    height: 10,
    width: 10,
  },
  radioOuterError: {
    borderColor: '#e53935',
  },
  radioBoxDisabled: {
    backgroundColor: '#9e9e9e',
    borderColor: '#9e9e9e',
  },
});

export default RadioBox;
