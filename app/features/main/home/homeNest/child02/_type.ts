/* -----------------------------------------------
 * ./_screen.tsx
 * ----------------------------------------------- */
export type TypeFormValues = {
  taxCategory01: string[];
  taxCategory02: string[];
  taxCategory03: string[];
};

export type TypeArticle = {
  id: number;
  title: {
    rendered: string;
  };
  link: string;
};
