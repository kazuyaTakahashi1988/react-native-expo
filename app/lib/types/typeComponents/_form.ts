import type {
  Control,
  FieldError,
  FieldValues,
  Merge,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import type { Item, PickerStyle } from 'react-native-picker-select';

/* -----------------------------------------------
 * type チェックボックス項目
 * ----------------------------------------------- */
export type TypeCheckBoxOption = {
  label: string;
  value: string;
  key?: string | number;
};

export type TypeCheckBoxProps<TFieldValues extends FieldValues> = {
  label: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  options: TypeCheckBoxOption[];
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errorText?: TypeErrorText | FieldError;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  optionListStyle?: StyleProp<ViewStyle>;
  optionRowStyle?: StyleProp<ViewStyle>;
};

/* -----------------------------------------------
 * type エラーテキスト
 * ----------------------------------------------- */
export type TypeErrorText = Merge<FieldError, (FieldError | undefined)[]>;

/* -----------------------------------------------
 * type インプット項目
 * ----------------------------------------------- */
export type TypeInputProps<TFieldValues extends FieldValues> = {
  label: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errorText?: TypeErrorText | FieldError;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
} & Omit<TextInputProps, 'onBlur' | 'onChangeText' | 'value' | 'style'>;

/* -----------------------------------------------
 * type ラヂオボックス項目
 * ----------------------------------------------- */
export type TypeRadioBoxProps<TFieldValues extends FieldValues> = {
  label: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  options: TypeCheckBoxOption[];
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errorText?: TypeErrorText | FieldError;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  optionListStyle?: StyleProp<ViewStyle>;
  optionRowStyle?: StyleProp<ViewStyle>;
};

/* -----------------------------------------------
 * type セレクトボックス項目
 * ----------------------------------------------- */
export type TypeSelectBoxOption = Omit<Item, 'value'> & {
  value: string;
};

export type TypeSelectBoxProps<TFieldValues extends FieldValues> = {
  label: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  options: TypeSelectBoxOption[];
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errorText?: TypeErrorText | FieldError;
  placeholder?: string;
  doneText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  triggerStyle?: StyleProp<ViewStyle>;
  valueTextStyle?: StyleProp<TextStyle>;
  placeholderTextStyle?: StyleProp<TextStyle>;
  pickerSelectStyles?: PickerStyle;
};

/* -----------------------------------------------
 * type テキストエリア項目
 * ----------------------------------------------- */
export type TypeTextAreaProps<TFieldValues extends FieldValues> = TypeInputProps<TFieldValues>;
