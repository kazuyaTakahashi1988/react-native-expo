import { request } from '../client';

import type { TypeParams } from '../../../lib/types/typeUtils';

/* -----------------------------------------------
 * 各 APIリクエスト
 * （並べくswaggerの順序と揃える）
 * ----------------------------------------------- */

// 記事取得API
export const getArticleApi = () => {
  return request('GET', '/wp-json/wp/v2/posts');
};

// クエリパラム使用の記事取得API
export const getCategorizedArticleApi = (params: TypeParams) => {
  const options = {
    params,
    baseURL: 'https://search-wp.empty-service.com',
  };
  return request('GET', '/wp-json/wp/v2/org_api', options);
};

/*
 * export const postXXXXApi = (params, baseURL, headers, requestData, accessToken) => {
 *  const options = {
 *    params, // クエリパラム
 *    baseURL, // DEFAULT_BASE_URL を使わない際のベースURLの指定
 *    headers, // 追加ヘッダー情報を付与
 *    requestData, // リクエストデータ（リクエストボディ）
 *    accessToken, // アクセストークン
 *    isLoading, // ローディングフラグの有無
 *  };
 *  return request('POST', '/xxxx/xxxx', options);
 * };
 */
