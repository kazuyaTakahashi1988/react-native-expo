/* -----------------------------------------------
 * 画面固有のタイプ
 * ----------------------------------------------- */

export type TypeArticle = {
  id: number;
  title: {
    rendered: string;
  };
  link: string;
}[];
