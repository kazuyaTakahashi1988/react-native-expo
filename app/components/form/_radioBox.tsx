import { useController } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';
import Label from './_label';

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
  const {
    field: { value, onChange },
  } = useController({ control, name, rules });

  const selectedValue = typeof value === 'string' ? value : '';
  const hasError = Boolean(errorText);

  const optionLabelStyle = (disabled?: boolean) => {
    return disabled === true ? styles.radioBoxTextDisabled : null;
  };

  const optionRadioOuterStyle = (disabled?: boolean) => {
    return disabled === true ? styles.radioBoxDisabled : null;
  };

  const optionRadioInnerStyle = (disabled?: boolean) => {
    return disabled === true ? styles.radioInnerDisabled : styles.radioInner;
  };

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />
      <View style={[styles.radioGroup, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          const isDisabled = () => option.disabled === true || disabled;
          return (
            <Pressable
              accessibilityRole='radio'
              accessibilityState={{ selected: isSelected }}
              disabled={isDisabled()}
              key={option.key ?? option.value}
              onPress={() => {
                onChange(option.value);
              }}
              style={[styles.radioRow, optionRowStyle]}
            >
              <View
                style={[
                  styles.radioOuter,
                  isSelected ? styles.radioOuterSelected : null,
                  hasError ? styles.radioOuterError : null,
                  optionRadioOuterStyle(isDisabled()),
                ]}
              >
                {isSelected ? <View style={optionRadioInnerStyle(isDisabled())} /> : null}
              </View>
              <Text style={optionLabelStyle(isDisabled())}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <ErrorText errorText={errorText} />
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
