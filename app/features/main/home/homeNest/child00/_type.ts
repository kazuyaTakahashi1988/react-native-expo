import type { ComponentProps } from 'react';
import type {
  Control,
  FieldError,
  FieldValues,
  Merge,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import type RNPickerSelect from 'react-native-picker-select';
import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

/* -----------------------------------------------
 * ./_screen.tsx
 * ----------------------------------------------- */
export type TypeFormValues = {
  email: string;
  name: string;
  subscribe: string[];
  plan: string;
  country: string;
  note: string;
};

/* -----------------------------------------------
 * ./_component.tsx
 * ----------------------------------------------- */
export type TypePickerField = {
  options: {
    label: string;
    value: string;
  }[];
  hasError: boolean;
  onChange: (value: string) => void;
  value: string;
};

export type TypePickerSelectStyles = NonNullable<ComponentProps<typeof RNPickerSelect>['style']>;

export type TypeErrorText = Merge<FieldError, (FieldError | undefined)[]>;

export type TypeResultArea = Partial<TypeFormValues>;

export type TypeInputProps<TFieldValues extends FieldValues> = {
  label: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errorText?: TypeErrorText | FieldError;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
} & Omit<TextInputProps, 'onBlur' | 'onChangeText' | 'value' | 'style'>;
