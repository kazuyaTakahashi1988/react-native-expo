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
  customSubscribe: string[];
  customPlan: string;
};

/* -----------------------------------------------
 * ./_component.tsx
 * ----------------------------------------------- */
export type TypeResultArea = Partial<TypeFormValues>;
