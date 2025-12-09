import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import type { Item } from 'react-native-picker-select';

/*
 * type チェック・ラヂオ（カスタム含む）ボックス項目 共通
 */
export type TypeBoxOption = {
  disabled?: boolean;
  label?: string;
  value: string;
  key?: string | number;
};

export type TypeBoxCustomOption = {
  label?: string;
  value: string;
  isSelected: boolean;
  isDisabled: boolean;
  hasError: boolean;
  optionRowStyle?: StyleProp<ViewStyle>;
  onToggle: () => void;
};

/*
 * type チェックボックス項目
 */
export type TypeCheckBox<TFieldValues extends FieldValues> = {
  label?: string;
  control?: Control<TFieldValues>;
  disabled?: boolean;
  name?: Path<TFieldValues>;
  options: TypeBoxOption[];
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errorText?: TypeErrorText;
  containerStyle?: StyleProp<ViewStyle>;
  optionListStyle?: StyleProp<ViewStyle>;
  optionRowStyle?: StyleProp<ViewStyle>;
};

/*
 * type チェックボックスカスタム項目
 */
export type TypeCheckBoxCustom<TFieldValues extends FieldValues> = TypeCheckBox<TFieldValues>;

/*
 * type エラーテキスト
 */
export type TypeErrorText = string | undefined;

/*
 * type インプット項目
 */
export type TypeInput<TFieldValues extends FieldValues> = {
  label?: string;
  control?: Control<TFieldValues>;
  disabled?: boolean;
  name?: Path<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errorText?: TypeErrorText;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
} & Omit<TextInputProps, 'onBlur' | 'onChangeText' | 'value' | 'style'>;

/*
 * type ラベル
 */
export type TypeLabel<TFieldValues extends FieldValues> = {
  label?: string;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
};

/*
 * type ラヂオボックス項目
 */
export type TypeRadioBox<TFieldValues extends FieldValues> = {
  label?: string;
  control?: Control<TFieldValues>;
  disabled?: boolean;
  name?: Path<TFieldValues>;
  options: TypeBoxOption[];
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errorText?: TypeErrorText;
  containerStyle?: StyleProp<ViewStyle>;
  optionListStyle?: StyleProp<ViewStyle>;
  optionRowStyle?: StyleProp<ViewStyle>;
};

/*
 * type ラヂオボックスカスタム項目
 */
export type TypeRadioBoxCustom<TFieldValues extends FieldValues> = TypeRadioBox<TFieldValues>;

/*
 * type セレクトボックス項目
 */
export type TypeSelectBoxOption = Omit<Item, 'value'> & {
  value: string;
};

export type TypeSelectBox<TFieldValues extends FieldValues> = {
  label?: string;
  control?: Control<TFieldValues>;
  disabled?: boolean;
  name?: Path<TFieldValues>;
  options: TypeSelectBoxOption[];
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errorText?: TypeErrorText;
  placeholder?: string;
  doneText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  triggerStyle?: StyleProp<ViewStyle>;
  valueTextStyle?: StyleProp<TextStyle>;
  placeholderTextStyle?: StyleProp<TextStyle>;
};

/*
 * type テキストエリア項目
 */
export type TypeTextArea<TFieldValues extends FieldValues> = TypeInput<TFieldValues>;
