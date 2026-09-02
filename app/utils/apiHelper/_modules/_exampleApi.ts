import { request } from '../client';

import type { TypeParams } from '../../../lib/types/typeUtils';

// microCMSとの通信に必要なヘッダー情報（APIキー）
const headers = {
  'X-MICROCMS-API-KEY': (process.env.EXPO_PUBLIC_MICROCMS_API_KEY ??
    '') as string,
};

/* -----------------------------------------------
 * 各 APIリクエスト
 * （並べくswaggerの順序と揃える）
 * ----------------------------------------------- */

// 記事取得API
export const getArticleApi = () => {
  const options = { headers };
  return request('GET', '/api/v1/blogs', options);
};

// クエリパラム使用の記事取得API
export const getCategorizedArticleApi = (params: TypeParams) => {
  const options = {
    params,
    headers,
  };
  return request('GET', '/api/v1/customblogs', options);
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
