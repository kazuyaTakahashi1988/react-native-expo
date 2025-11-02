import { type FC, useCallback, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { ErrorText, ResultArea } from './_component';
import { Layout } from '../../../../../components/layout';

import type { TypeFormValues } from './_type';

type SelectOption = {
  label: string;
  value: string;
};

const COUNTRY_OPTIONS: SelectOption[] = [
  { label: 'セレクトラベル-A', value: 'SelectValue-A' },
  { label: 'セレクトラベル-B', value: 'SelectValue-B' },
  { label: 'セレクトラベル-C', value: 'SelectValue-C' },
];

const CountryPickerField: FC<{
  hasError: boolean;
  onChange: (value: string) => void;
  value: string;
}> = ({ hasError, onChange, value }) => {
  const pickerRef = useRef<RNPickerSelect | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const selectedLabel = useMemo(
    () => COUNTRY_OPTIONS.find((option) => option.value === value)?.label,
    [value],
  );

  const handleOpenPicker = useCallback(() => {
    Keyboard.dismiss();
    setIsPickerOpen(true);
    pickerRef.current?.togglePicker(true);
  }, []);

  const handleValueChange = useCallback(
    (selectedValue: string | null) => {
      onChange(selectedValue ?? '');
    },
    [onChange],
  );

  return (
    <View>
      <Pressable
        accessibilityRole='button'
        accessibilityState={{ expanded: isPickerOpen }}
        onPress={handleOpenPicker}
        style={[styles.selectTrigger, hasError ? styles.inputError : null]}
      >
        <Text style={selectedLabel == null ? styles.selectPlaceholderText : styles.selectValueText}>
          {selectedLabel ?? '選択してください'}
        </Text>
      </Pressable>

      <RNPickerSelect
        ref={(ref) => {
          pickerRef.current = ref;
        }}
        doneText='完了'
        items={COUNTRY_OPTIONS}
        onClose={() => {
          setIsPickerOpen(false);
        }}
        onOpen={() => {
          setIsPickerOpen(true);
        }}
        onValueChange={handleValueChange}
        placeholder={{ label: '選択してください', value: '' }}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        value={value === '' ? null : value}
      />
    </View>
  );
};

const Child00Screen: FC = () => {
  const [submittedValues, setSubmittedValues] = useState<TypeFormValues | null>(null);

  // form設定
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<TypeFormValues>({
    defaultValues: {
      email: '',
      name: '',
      subscribe: [],
      plan: '',
      country: '',
      note: '',
    },
  });

  // チェックボックスフィルター処理
  const checkBoxFilter = <T,>(list: T[], target: T): T[] => list.filter((x) => x !== target);

  // submitボタン処理
  const onSubmit = useCallback(() => {
    void handleSubmit((values: TypeFormValues) => {
      setSubmittedValues(values);
    })();
  }, [handleSubmit]);

  // resetボタン処理
  const onReset = () => {
    reset();
    setSubmittedValues(null);
  };

  return (
    <Layout>
      <Text style={styles.title}>react-hook-form example</Text>

      {/* Name インプット項目 */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Name</Text>
        <Controller
          control={control}
          name='name'
          rules={{ required: 'Name は必須です。' }}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              autoCapitalize='words'
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder='Jane Doe'
              style={[styles.input, errors.name ? styles.inputError : null]}
              value={value}
            />
          )}
        />
        <ErrorText {...errors.name} />
      </View>

      {/* Email インプット項目 */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name='email'
          rules={{
            pattern: {
              message: 'Emailアドレスを入力してください.',
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            },
            required: 'Email は必須です。',
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              autoCapitalize='none'
              keyboardType='email-address'
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder='jane@example.com'
              style={[styles.input, errors.email ? styles.inputError : null]}
              value={value}
            />
          )}
        />
        <ErrorText {...errors.email} />
      </View>

      {/* Subscribe チェックボックス */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>・チェックボックス</Text>
        <Controller
          control={control}
          name='subscribe'
          rules={{
            validate: (value) => value.length === 2 || '2つ以上選択してください。',
            required: 'チェックボックス は必須です。',
          }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.checkboxGroup}>
              {[
                { label: 'チェックラベル-A', value: 'CheckValue-A' },
                { label: 'チェックラベル-B', value: 'CheckValue-B' },
                { label: 'チェックラベル-C', value: 'CheckValue-C' },
              ].map((option) => {
                const selected = value.includes(option.value);
                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole='checkbox'
                    accessibilityState={{ checked: selected }}
                    onPress={() => {
                      if (selected) {
                        onChange(checkBoxFilter(value, option.value));
                        return;
                      }

                      if (value.length >= 2) {
                        return;
                      }

                      onChange([...value, option.value]);
                    }}
                    style={styles.checkboxRow}
                  >
                    <View style={[styles.checkboxBase, selected ? styles.checkboxChecked : null]} />
                    <Text>{option.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        />
        <ErrorText {...errors.subscribe} />
      </View>

      {/* Plan ラジオボタン */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>・ラジオボタン</Text>
        <Controller
          control={control}
          name='plan'
          rules={{
            required: 'ラジオボタン は必須です。',
          }}
          render={({ field: { value, onChange } }) => (
            <View style={styles.radioGroup}>
              {[
                { label: 'ラジオラベル-A', value: 'RadioValue-A' },
                { label: 'ラジオラベル-B', value: 'RadioValue-B' },
                { label: 'ラジオラベル-C', value: 'RadioValue-C' },
              ].map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    onChange(option.value);
                  }}
                  style={styles.radioRow}
                >
                  <View style={styles.radioOuter}>
                    {value === option.value ? <View style={styles.radioInner} /> : null}
                  </View>
                  <Text>{option.label}</Text>
                </Pressable>
              ))}
            </View>
          )}
        />
        <ErrorText {...errors.plan} />
      </View>

      {/* Country セレクトボックス */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Country</Text>
        <Controller
          control={control}
          name='country'
          rules={{ required: 'セレクトボックス は必須です。' }}
          render={({ field: { onChange, value } }) => (
            <CountryPickerField hasError={errors.country != null} onChange={onChange} value={value} />
          )}
        />
        <ErrorText {...errors.country} />
      </View>

      {/* Note テキストエリア */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Note</Text>
        <Controller
          control={control}
          name='note'
          rules={{
            maxLength: {
              value: 200,
              message: '200文字以内で入力してください。',
            },
            required: 'テキストエリア は必須です。',
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              multiline
              numberOfLines={4}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder='メモや補足を入力してください'
              style={[styles.input, styles.textArea, errors.note ? styles.inputError : null]}
              textAlignVertical='top'
              value={value}
            />
          )}
        />
        <ErrorText {...errors.note} />
      </View>

      {/* submit ボタン */}
      <View style={styles.actions}>
        <Button onPress={onSubmit} title={isSubmitting ? 'Submitting…' : 'Submit'} />
        <Button color='#444' onPress={onReset} title='Reset' />
      </View>

      {/* submit 出力結果表示エリア */}
      <ResultArea {...submittedValues} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#d6d6d6',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputError: {
    borderColor: '#e53935',
  },
  selectTrigger: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#d6d6d6',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selectValueText: {
    color: '#212121',
    fontSize: 14,
  },
  selectPlaceholderText: {
    color: '#9e9e9e',
    fontSize: 14,
  },
  checkboxGroup: {
    rowGap: 12,
  },
  checkboxRow: {
    alignItems: 'center',
    columnGap: 12,
    flexDirection: 'row',
  },
  checkboxBase: {
    borderColor: '#007aff',
    borderRadius: 4,
    borderWidth: 2,
    height: 20,
    width: 20,
  },
  checkboxChecked: {
    backgroundColor: '#007aff',
    borderColor: '#007aff',
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
  radioInner: {
    backgroundColor: '#007aff',
    borderRadius: 999,
    height: 10,
    width: 10,
  },
  textArea: {
    height: 120,
  },
  actions: {
    columnGap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 0,
    opacity: 0,
    padding: 0,
  },
  inputAndroid: {
    height: 0,
    opacity: 0,
    padding: 0,
  },
  inputWeb: {
    display: 'none',
  },
  placeholder: {
    color: '#9e9e9e',
  },
  viewContainer: {
    height: 0,
    overflow: 'hidden',
  },
  modalViewMiddle: {
    backgroundColor: '#fff',
  },
  modalViewBottom: {
    backgroundColor: '#fff',
  },
  done: {
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Child00Screen;
