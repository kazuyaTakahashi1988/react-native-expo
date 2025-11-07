import type { ComponentProps } from 'react';
import type RNPickerSelect from 'react-native-picker-select';

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

export type TypeResultArea = Partial<TypeFormValues>;
