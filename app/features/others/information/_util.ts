import { sendPushNotifications } from '../../../utils/notificationHelper';

/* -----------------------------------------------
 * 画面固有の処理
 * ----------------------------------------------- */

// 各端末のInformation画面で表示されるPush Tokenをここに登録する。
// 同じExpoプロジェクトの端末だけを指定する。
const pushTokens: string[] = [
  // 'ExponentPushToken[端末Aのトークン]',
  // 'ExponentPushToken[端末Bのトークン]',
];

export const sendAnnouncementToAll = () => {
  // 将来はここで条件・ユーザーに応じた送信先を取得する。
  return sendPushNotifications(pushTokens, {
    title: 'お知らせ',
    body: 'Information画面からのお知らせです。',
  });
};
