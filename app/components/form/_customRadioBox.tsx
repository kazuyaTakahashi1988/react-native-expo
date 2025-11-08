import { type FieldValues, useController } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ErrorText from './_errorText';

import type { TypeCustomRadioBox } from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * カスタムデザイン ラヂオボックス
 * ----------------------------------------------- */

const CustomRadioBox = <TFieldValues extends FieldValues>({
  containerStyle,
  control,
  errorText,
  label,
  labelStyle,
  name,
  optionListStyle,
  optionRowStyle,
  options,
  required,
  rules,
}: TypeCustomRadioBox<TFieldValues>) => {
  const {
    field: { value, onChange },
  } = useController({ control, name, rules });

  const selectedValue = typeof value === 'string' ? value : '';
  const hasError = errorText?.message != null;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        {required ? <Text style={styles.required}>*</Text> : null}
      </View>
      <View style={[styles.optionList, optionListStyle]}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          const isDisabled = option.disabled ?? false;
          return (
            <Pressable
              key={option.key ?? option.value}
              accessibilityRole='radio'
              accessibilityState={{ selected: isSelected, disabled: isDisabled }}
              disabled={isDisabled}
              onPress={() => {
                onChange(option.value);
              }}
              style={[
                styles.optionRow,
                isSelected ? styles.optionRowSelected : null,
                hasError ? styles.optionRowError : null,
                isDisabled ? styles.optionRowDisabled : null,
                optionRowStyle,
              ]}
            >
              <View style={[styles.indicator, isSelected ? styles.indicatorSelected : null]}>
                {isSelected ? <View style={styles.indicatorInner} /> : null}
              </View>
              <Text
                style={[
                  styles.optionLabel,
                  isSelected ? styles.optionLabelSelected : null,
                  isDisabled ? styles.optionLabelDisabled : null,
                ]}
              >
                {option.label}
              </Text>
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
  labelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 4,
    marginBottom: 8,
  },
  label: {
    color: '#1c1c1e',
    fontSize: 14,
    fontWeight: '600',
  },
  required: {
    color: '#ff3b30',
    fontSize: 14,
    fontWeight: '600',
  },
  optionList: {
    rowGap: 8,
  },
  optionRow: {
    alignItems: 'center',
    backgroundColor: '#f2f2f7',
    borderColor: '#d1d1d6',
    borderRadius: 20,
    borderWidth: 1,
    columnGap: 12,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  optionRowSelected: {
    backgroundColor: '#ffffff',
    borderColor: '#3182f6',
    shadowColor: '#00000020',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  optionRowError: {
    borderColor: '#e53935',
  },
  optionRowDisabled: {
    opacity: 0.6,
  },
  indicator: {
    alignItems: 'center',
    backgroundColor: '#d1d1d6',
    borderRadius: 999,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
  indicatorSelected: {
    backgroundColor: '#3182f6',
  },
  indicatorInner: {
    backgroundColor: '#ffffff',
    borderRadius: 999,
    height: 8,
    width: 8,
  },
  optionLabel: {
    color: '#636366',
    fontSize: 14,
    fontWeight: '500',
  },
  optionLabelSelected: {
    color: '#3182f6',
    fontWeight: '600',
  },
  optionLabelDisabled: {
    color: '#aeaeb2',
  },
});

export default CustomRadioBox;
