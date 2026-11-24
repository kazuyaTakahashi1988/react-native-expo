import axios from 'axios';
import { Platform } from 'react-native';

/* -----------------------------------------------
 * 通知の受信準備・この端末のトークン取得
 * ----------------------------------------------- */

const canUseNotifications = async (): Promise<boolean> => {
  if (Platform.OS !== 'ios' && Platform.OS !== 'android') return false;
  const { default: constants, ExecutionEnvironment } =
    await import('expo-constants');
  return constants.executionEnvironment !== ExecutionEnvironment.StoreClient;
};

const getProjectId = async (): Promise<string> => {
  const { default: constants } = await import('expo-constants');
  const extra = constants.expoConfig?.extra as
    | { eas?: { projectId?: string } }
    | undefined;
  const projectId = constants.easConfig?.projectId ?? extra?.eas?.projectId;
  if (projectId === undefined || projectId === '') {
    throw new Error('app.jsonにExpoのprojectIdを設定してください。');
  }
  return projectId;
};

export const initializeNotifications = async (): Promise<void> => {
  if (!(await canUseNotifications())) return;

  const notifications = await import('expo-notifications');
  notifications.setNotificationHandler({
    handleNotification: () =>
      Promise.resolve({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
  });
  if (Platform.OS === 'android') {
    await notifications.setNotificationChannelAsync('announcements', {
      name: 'お知らせ',
      importance: notifications.AndroidImportance.DEFAULT,
    });
  }
};

export const getPushToken = async (): Promise<string> => {
  if (!(await canUseNotifications())) {
    throw new Error('通知の受信にはiOS・Androidの開発用ビルドが必要です。');
  }
  await initializeNotifications();
  const notifications = await import('expo-notifications');

  let permission = await notifications.getPermissionsAsync();
  if (!permission.granted && permission.canAskAgain) {
    permission = await notifications.requestPermissionsAsync();
  }
  const isAllowed =
    permission.granted ||
    permission.ios?.status === notifications.IosAuthorizationStatus.PROVISIONAL;
  if (!isAllowed) throw new Error('端末の設定で通知を許可してください。');

  const projectId = await getProjectId();
  const token = await notifications.getExpoPushTokenAsync({ projectId });
  return token.data;
};

/* -----------------------------------------------
 * 指定した通知先へ送信する（送信先の選定は呼び出し元で行う）
 * ----------------------------------------------- */

type PushResponse = {
  data?: { status: 'ok' | 'error'; message?: string }[];
  errors?: { message: string }[];
};

export const sendPushNotifications = async (
  tokens: readonly string[],
  message: { title: string; body: string },
): Promise<number> => {
  const targets = [...new Set(tokens)];
  if (targets.length === 0) {
    throw new Error(
      'Information画面の_util.tsに送信先のPush Tokenを登録してください。',
    );
  }

  // ExpoのAPIに合わせて、1回100件までに分けて送信する。
  for (let index = 0; index < targets.length; index += 100) {
    const batch = targets.slice(index, index + 100);
    const messages = batch.map((to) => ({
      to,
      ...message,
      sound: 'default',
      channelId: 'announcements',
    }));
    const response = await axios.post<PushResponse>(
      'https://exp.host/--/api/v2/push/send',
      messages,
      { timeout: 10000 },
    );
    const tickets = response.data.data;
    if (tickets === undefined || tickets.length !== batch.length) {
      throw new Error(
        response.data.errors?.[0]?.message ??
          '通知の受付結果を取得できませんでした。',
      );
    }
    const failedTicket = tickets.find((ticket) => ticket.status === 'error');
    if (failedTicket !== undefined) {
      throw new Error(
        `一部の通知が受け付けられませんでした：${failedTicket.message ?? '不明なエラー'}`,
      );
    }
  }

  // この件数はExpoの受付件数。端末への到着を保証するものではない。
  return targets.length;
};
