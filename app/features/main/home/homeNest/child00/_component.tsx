import { type FC, useCallback, useMemo, useRef, useState } from 'react';
import { type FieldValues, useController } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import type {
  TypeErrorText,
  TypeInputProps,
  TypePickerField,
  TypePickerSelectStyles,
  TypeResultArea,
} from './_type';

/* -----------------------------------------------
 * テキストインプット
 * ----------------------------------------------- */
export const Input = <TFieldValues extends FieldValues>({
  containerStyle,
  control,
  errorText,
  label,
  name,
  rules,
  style,
  ...textInputProps
}: TypeInputProps<TFieldValues>) => {
  const {
    field: { onBlur, onChange, value },
  } = useController({ control, name, rules });

  const inputValue = typeof value === 'string' ? value : '';
  const hasError = errorText?.message != null;

  return (
    <View style={[inputStyles.container, containerStyle]}> 
      <Text style={inputStyles.label}>{label}</Text>
      <TextInput
        {...textInputProps}
        onBlur={onBlur}
        onChangeText={onChange}
        style={[inputStyles.input, hasError ? inputStyles.inputError : null, style]}
        value={inputValue}
      />
      <ErrorText {...errorText} />
    </View>
  );
};

const inputStyles = StyleSheet.create({
  container: {
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
});

/* -----------------------------------------------
 * セレクトボックス
 * ----------------------------------------------- */
export const PickerField: FC<TypePickerField> = ({ hasError, onChange, value, options }) => {
  const pickerRef = useRef<RNPickerSelect | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const selectedLabel = useMemo(
    () => options.find((option) => option.value === value)?.label,
    [options, value],
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
        style={[selectStyles.selectTrigger, hasError ? selectStyles.inputError : null]}
      >
        <Text
          style={
            selectedLabel == null
              ? selectStyles.selectPlaceholderText
              : selectStyles.selectValueText
          }
        >
          {selectedLabel ?? '選択してください'}
        </Text>
      </Pressable>

      <RNPickerSelect
        ref={(ref) => {
          pickerRef.current = ref;
        }}
        doneText='完了'
        items={options}
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
const selectStyles = StyleSheet.create({
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
});

const pickerSelectStyles: TypePickerSelectStyles = {
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
    height: '100%',
    width: '100%',
    borderRadius: 8,
    opacity: 0,
  },
  placeholder: {
    color: '#9e9e9e',
  },
  viewContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
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
};

/* -----------------------------------------------
 * エラーテキスト
 * ----------------------------------------------- */
export const ErrorText: React.FC<TypeErrorText> = (errorsType) => {
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
export const ResultArea: React.FC<TypeResultArea> = (submittedValues) => {
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
