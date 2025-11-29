export type TypeFormValues = {
  taxCategory01?: string[];
  taxCategory02?: string[];
  taxCategory03?: string[];
};

export type TypeArticle = {
  id: number;
  getTheTitle: string;
  getPermalink: string;
  getTaxCategory01: { name: string }[];
  getTaxCategory02: { name: string }[];
  getTaxCategory03: { name: string }[];
}[];
