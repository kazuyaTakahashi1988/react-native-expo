/* -----------------------------------------------
 * ./_screen.tsx
 * ----------------------------------------------- */
export type TypeFormValues = {
  email: string;
  name: string;
  subscribe: string[];
  subscribeCustom: string[];
  plan: string;
  planCustom: string;
  country: string;
  note: string;
};

/* -----------------------------------------------
 * ./_component.tsx
 * ----------------------------------------------- */
export type TypeResultArea = Partial<TypeFormValues>;
