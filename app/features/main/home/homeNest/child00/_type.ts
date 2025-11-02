export type TypeFormValues = {
  email: string;
  name: string;
  subscribe: string[];
  plan: string;
  country: string;
  note: string;
};

export type TypeCountryPickerField = {
  options: {
    label: string;
    value: string;
  }[];
  hasError: boolean;
  onChange: (value: string) => void;
  value: string;
};
