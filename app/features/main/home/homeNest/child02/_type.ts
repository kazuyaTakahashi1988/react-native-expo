/* -----------------------------------------------
 * 画面固有のタイプ
 * ----------------------------------------------- */

export type TypeFormValues = {
  category: string;
  category02: string;
  category03: string;
};

export type TypeArticle = {
  contents: {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    category: {
      id: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      revisedAt: string;
      name: string;
    };
    category02: {
      id: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      revisedAt: string;
      name: string;
    };
    category03: {
      id: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      revisedAt: string;
      name: string;
    };
    content: string;
    eyecatch: {
      url: string;
      height: number;
      width: number;
    };
  }[];
};
