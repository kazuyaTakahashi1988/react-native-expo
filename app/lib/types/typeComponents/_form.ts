import type {
  Control,
  FieldError,
  FieldValues,
  Merge,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

/* -----------------------------------------------
 * type チェックボックス項目
 * ----------------------------------------------- */

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

/* -----------------------------------------------
 * type セレクトボックス項目
 * ----------------------------------------------- */

/* -----------------------------------------------
 * type テキストエリア項目
 * ----------------------------------------------- */
