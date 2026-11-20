import React from 'react';
import { Alert, Linking, StyleSheet, Text } from 'react-native';

import { sendAnnouncementToAll } from './_util';
import { Button } from '../../../components/button';
import { Layout } from '../../../components/layouts/layout';
import { getPushToken } from '../../../utils/notificationHelper';

import type { TypeInformationScreen } from './_type';

/* -----------------------------------------------
 * Information 画面
 * ----------------------------------------------- */

const InformationScreen: React.FC<TypeInformationScreen> = (props) => {
  const { navigation } = props;
  const [tokenText, setTokenText] = React.useState('取得中…');
  const [isSending, setIsSending] = React.useState(false);

  React.useEffect(() => {
    /*
     * 通知トークンの取得
     */
    let isActive = true;
    void getPushToken().then(
      (token) => {
        if (isActive) setTokenText(token);
      },
      (error: unknown) => {
        if (isActive)
          setTokenText(
            error instanceof Error
              ? error.message
              : 'トークンを取得できませんでした。',
          );
      },
    );
    return () => {
      isActive = false;
    };
  }, []);

  /*
   * プッシュ通知送信 処理
   */
  const sendAnnouncement = async () => {
    if (isSending) return;
    setIsSending(true); // 送信ボタンの状態を「送信中」にする

    try {
      // プッシュ通知送信
      const count = await sendAnnouncementToAll();
      Alert.alert(
        '送信受付',
        `${String(count)}台への通知をExpoが受け付けました。`,
      );
    } catch (error) {
      Alert.alert(
        '送信エラー',
        error instanceof Error ? error.message : '通知を送信できませんでした。',
      );
    } finally {
      setIsSending(false); // 送信ボタンの状態を元に戻す
    }
  };

  return (
    <Layout>
      <Text style={styles.title}>Information Screen</Text>

      {/*
       * プッシュ通知送信ボタン
       */}
      <Button
        containerStyle={styles.buttonSpacing}
        disabled={isSending}
        onPress={() => {
          void sendAnnouncement(); // プッシュ通知送信 処理
        }}
        title={isSending ? '送信中…' : '登録した全端末へプッシュ通知を送信'}
      />

      {/*
       * この端末のPush Token表示
       */}
      <Text>この端末のPush Token（送信先一覧に登録）</Text>
      <Text selectable style={styles.token}>
        {tokenText}
      </Text>

      {/*
       * 他、各遷移ボタン
       */}
      <Button
        containerStyle={styles.buttonSpacing}
        onPress={() => {
          void Linking.openURL(
            'https://github.com/kazuyaTakahashi1988/react-native-expo',
          );
        }}
        title='Go to GitHub Repository'
      />
      <Button
        containerStyle={styles.buttonSpacing}
        onPress={() => {
          void Linking.openURL(
            'https://storybook-for-expo.empty-service.com/?path=/docs/configure-your-project--docs',
          );
        }}
        title='Go to Storybook'
      />
      <Button
        onPress={() => {
          navigation.navigate('main', { screen: 'about' }, { pop: true });
        }}
        title='Go to About'
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonSpacing: {
    marginBottom: 12,
  },
  token: {
    marginBottom: 24,
  },
});

export default InformationScreen;
