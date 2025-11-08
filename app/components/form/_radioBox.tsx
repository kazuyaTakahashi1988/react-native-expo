import { useController } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';

import type { TypeRadioBox } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';

/* -----------------------------------------------
 * ラヂオボックス項目
 * ----------------------------------------------- */

const RadioBox = <TFieldValues extends FieldValues>({
  containerStyle,
  control,
  errorText,
  label,
  labelStyle,
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
  const hasError = errorText?.message != null;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={[styles.radioGroup, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <Pressable
              key={option.key ?? option.value}
              accessibilityRole='radio'
              accessibilityState={{ selected: isSelected }}
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
                ]}
              >
                {isSelected ? <View style={styles.radioInner} /> : null}
              </View>
              <Text>{option.label}</Text>
            </Pressable>
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
  radioOuterSelected: {
    borderColor: '#007aff',
  },
  radioInner: {
    backgroundColor: '#007aff',
    borderRadius: 999,
    height: 10,
    width: 10,
  },
  radioOuterError: {
    borderColor: '#e53935',
  },
});

export default RadioBox;
