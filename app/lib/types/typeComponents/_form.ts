import type {
  Control,
  FieldError,
  FieldValues,
  Merge,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import type { PressableProps, StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import type { Item, PickerStyle } from 'react-native-picker-select';

/* -----------------------------------------------
 * type チェック・ラヂオボックス項目 共通
 * ----------------------------------------------- */
export type TypeBoxOption = {
  disabled?: boolean;
  label?: string;
  value: string;
  key?: string | number;
};

type TypeToggleCustomBase<TFieldValues extends FieldValues> = {
  label?: string;
  control: Control<TFieldValues>;
  disabled?: boolean;
  name: Path<TFieldValues>;
  options: TypeBoxOption[];
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errorText?: TypeErrorText | FieldError;
  containerStyle?: StyleProp<ViewStyle>;
  optionListStyle?: StyleProp<ViewStyle>;
  optionRowStyle?: StyleProp<ViewStyle>;
  optionLabelStyle?: StyleProp<TextStyle>;
  trackStyle?: StyleProp<ViewStyle>;
  knobStyle?: StyleProp<ViewStyle>;
  activeColor?: string;
  inactiveColor?: string;
  knobColor?: string;
};

/* -----------------------------------------------
 * type チェックボックス項目
 * ----------------------------------------------- */
export type TypeCheckBox<TFieldValues extends FieldValues> = {
  label?: string;
  control: Control<TFieldValues>;
  disabled?: boolean;
  name: Path<TFieldValues>;
  options: TypeBoxOption[];
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errorText?: TypeErrorText | FieldError;
  containerStyle?: StyleProp<ViewStyle>;
  optionListStyle?: StyleProp<ViewStyle>;
  optionRowStyle?: StyleProp<ViewStyle>;
};

/* -----------------------------------------------
 * type チェックボックスカスタム項目
 * ----------------------------------------------- */
export type TypeCheckBoxCustom<TFieldValues extends FieldValues> =
  TypeToggleCustomBase<TFieldValues>;

export type TypeToggleCheckOption = {
  label?: string;
  disabled?: boolean;
  isSelected: boolean;
  onPress: () => void;
  accessibilityState: PressableProps['accessibilityState'];
  hasError: boolean;
  activeColor: string;
  inactiveColor: string;
  knobColor: string;
  optionRowStyle: TypeCheckBoxCustom<FieldValues>['optionRowStyle'];
  optionLabelStyle: TypeCheckBoxCustom<FieldValues>['optionLabelStyle'];
  trackStyle: TypeCheckBoxCustom<FieldValues>['trackStyle'];
  knobStyle: TypeCheckBoxCustom<FieldValues>['knobStyle'];
};

/* -----------------------------------------------
 * type エラーテキスト
 * ----------------------------------------------- */
export type TypeErrorText = Merge<FieldError, (FieldError | undefined)[]>;

/* -----------------------------------------------
 * type インプット項目
 * ----------------------------------------------- */
export type TypeInput<TFieldValues extends FieldValues> = {
  label?: string;
  control: Control<TFieldValues>;
  disabled?: boolean;
  name: Path<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errorText?: TypeErrorText | FieldError;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
} & Omit<TextInputProps, 'onBlur' | 'onChangeText' | 'value' | 'style'>;

/* -----------------------------------------------
 * type ラベル
 * ----------------------------------------------- */
export type TypeLabel<TFieldValues extends FieldValues> = {
  label?: string;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
};

/* -----------------------------------------------
 * type ラヂオボックス項目
 * ----------------------------------------------- */
export type TypeRadioBox<TFieldValues extends FieldValues> = {
  label?: string;
  control: Control<TFieldValues>;
  disabled?: boolean;
  name: Path<TFieldValues>;
  options: TypeBoxOption[];
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errorText?: TypeErrorText | FieldError;
  containerStyle?: StyleProp<ViewStyle>;
  optionListStyle?: StyleProp<ViewStyle>;
  optionRowStyle?: StyleProp<ViewStyle>;
};

/* -----------------------------------------------
 * type ラヂオボックスカスタム項目
 * ----------------------------------------------- */
export type TypeRadioBoxCustom<TFieldValues extends FieldValues> =
  TypeToggleCustomBase<TFieldValues>;

export type TypeToggleRadioOption = {
  label?: string;
  disabled?: boolean;
  isSelected: boolean;
  onPress: () => void;
  accessibilityState: PressableProps['accessibilityState'];
  hasError: boolean;
  activeColor: string;
  inactiveColor: string;
  knobColor: string;
  optionRowStyle: TypeRadioBoxCustom<FieldValues>['optionRowStyle'];
  optionLabelStyle: TypeRadioBoxCustom<FieldValues>['optionLabelStyle'];
  trackStyle: TypeRadioBoxCustom<FieldValues>['trackStyle'];
  knobStyle: TypeRadioBoxCustom<FieldValues>['knobStyle'];
};

/* -----------------------------------------------
 * type セレクトボックス項目
 * ----------------------------------------------- */
export type TypeSelectBoxOption = Omit<Item, 'value'> & {
  value: string;
};

export type TypeSelectBox<TFieldValues extends FieldValues> = {
  label?: string;
  control: Control<TFieldValues>;
  disabled?: boolean;
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
