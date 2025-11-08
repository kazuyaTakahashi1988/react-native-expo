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

export type TypeCheckBox<TFieldValues extends FieldValues> = {
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
export type TypeInput<TFieldValues extends FieldValues> = {
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
export type TypeRadioBox<TFieldValues extends FieldValues> = {
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
 * type カスタムチェック/ラヂオボックス共通
 * ----------------------------------------------- */
export type TypeCustomToggleOption = TypeCheckBoxOption & {
  disabled?: boolean;
};

/* -----------------------------------------------
 * type カスタムチェックボックス項目
 * ----------------------------------------------- */
export type TypeCustomCheckBox<TFieldValues extends FieldValues> = Omit<
  TypeCheckBox<TFieldValues>,
  'options'
> & {
  options: TypeCustomToggleOption[];
  required?: boolean;
};

/* -----------------------------------------------
 * type カスタムラヂオボックス項目
 * ----------------------------------------------- */
export type TypeCustomRadioBox<TFieldValues extends FieldValues> = Omit<
  TypeRadioBox<TFieldValues>,
  'options'
> & {
  options: TypeCustomToggleOption[];
  required?: boolean;
};

/* -----------------------------------------------
 * type セレクトボックス項目
 * ----------------------------------------------- */
export type TypeSelectBoxOption = Omit<Item, 'value'> & {
  value: string;
};

export type TypeSelectBox<TFieldValues extends FieldValues> = {
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
export type TypeTextArea<TFieldValues extends FieldValues> = TypeInput<TFieldValues>;
