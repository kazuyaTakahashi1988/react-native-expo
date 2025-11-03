import type { ComponentProps } from 'react';
import type { FieldError, Merge } from 'react-hook-form';
import type RNPickerSelect from 'react-native-picker-select';

export type TypeFormValues = {
  email: string;
  name: string;
  subscribe: string[];
  plan: string;
  country: string;
  note: string;
};

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
