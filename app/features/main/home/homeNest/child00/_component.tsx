import { Picker } from '@react-native-picker/picker';
import { type FC, useCallback } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import type { TypeCountryPickerField, TypeFormValues } from './_type';
import type { FieldError, Merge } from 'react-hook-form';

/* -----------------------------------------------
 * セレクトボックス
 * ----------------------------------------------- */
export const CountryPickerField: FC<TypeCountryPickerField> = ({
  hasError,
  onChange,
  value,
  options,
}) => {
  const handleValueChange = useCallback(
    (selectedValue: string | null) => {
      onChange(selectedValue ?? '');
    },
    [onChange],
  );

  return (
    <View style={[selectStyles.selectWrapper, hasError ? selectStyles.inputError : null]}>
      <Picker
        dropdownIconColor='#616161'
        mode={Platform.OS === 'android' ? 'dropdown' : undefined}
        onValueChange={handleValueChange}
        selectedValue={value}
        style={selectStyles.picker}
      >
        <Picker.Item label='選択してください' value='' color='#9e9e9e' />
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} color='#212121' />
        ))}
      </Picker>
    </View>
  );
};
const selectStyles = StyleSheet.create({
  inputError: {
    borderColor: '#e53935',
  },
  selectWrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#d6d6d6',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 44,
    overflow: 'hidden',
  },
  picker: {
    color: '#212121',
    flex: 1,
    fontSize: 14,
    height: Platform.OS === 'web' ? '100%' : 44,
  },
});

/* -----------------------------------------------
 * エラーテキスト
 * ----------------------------------------------- */
export const ErrorText: React.FC<Merge<FieldError, (FieldError | undefined)[]>> = (errorsType) => {
  if (errorsType.message == null) {
    return;
  }
  return <Text style={errorStyles.text}>{errorsType.message}</Text>;
};
const errorStyles = StyleSheet.create({
  text: {
    color: '#e53935',
    fontSize: 12,
    marginTop: 4,
  },
});

/* -----------------------------------------------
 * submit 出力結果表示エリア
 * ----------------------------------------------- */
export const ResultArea: React.FC<Partial<TypeFormValues>> = (submittedValues) => {
  const { name, email, subscribe, plan, country, note } = submittedValues;

  // 各値が空の場合、マウントせず離脱
  const isBlank = (v: unknown): boolean =>
    v == null || (typeof v === 'string' && v.trim() === '') || (Array.isArray(v) && v.length === 0);
  const hasNoValues = [name, email, subscribe, plan, country, note].some(isBlank);
  if (hasNoValues) {
    return null;
  }

  return (
    <View style={resultStyles.result}>
      <Text style={resultStyles.resultTitle}>Submitted values</Text>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
      {subscribe && subscribe.length > 0 && (
        <Text>
          Subscribe: {'\n'}
          {subscribe.map((item) => `${item}\n`)}
        </Text>
      )}
      <Text>Plan: {plan}</Text>
      <Text>Country: {country}</Text>
      <Text>note: {note}</Text>
    </View>
  );
};

const resultStyles = StyleSheet.create({
  result: {
    backgroundColor: '#fff',
    borderColor: '#d6d6d6',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 24,
    padding: 16,
    rowGap: 8,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});
