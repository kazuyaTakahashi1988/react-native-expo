/* -----------------------------------------------
 * ./_screen.tsx
 * ----------------------------------------------- */
export type TypeFormValues = {
  dummyName: string;
  genres: string[];
  inquiry: string[];
  payment: string;
  theme: string;
  address: string;
  description: string;
};

/* -----------------------------------------------
 * ./_component.tsx
 * ----------------------------------------------- */
export type TypeResultArea = Partial<TypeFormValues>;
