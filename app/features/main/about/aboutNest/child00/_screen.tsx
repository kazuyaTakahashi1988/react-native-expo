import React from 'react';
import { Alert, StyleSheet, Text } from 'react-native';

import { Button } from '../../../../../components/button';
import { Dialog, hideDialog, showDialog } from '../../../../../components/dialog';
import { Layout } from '../../../../../components/layouts/layout';

import type { TypeDialogPattern } from './_type';

/* -----------------------------------------------
 * About > Child00 画面
 * ----------------------------------------------- */

const Child00Screen: React.FC = () => {
  const [visibleDialog, setVisibleDialog] = React.useState<TypeDialogPattern>(null);

  /*
   * 閉じるボタン 処理
   */
  const onClose = React.useCallback(() => {
    setVisibleDialog(null);
  }, []);

  /*
   * イベントボタン 処理
   */
  const onEvent = React.useCallback(() => {
    Alert.alert('Thanks to Tap', 'EventButton Tapped!!');
    onClose();
  }, [onClose]);

  /*
   * showDialog関数で ダイアログを開くボタン 処理
   */
  const onShowDialog = () => {
    // コンポーネントではなく、showDialog関数を用いてダイアログを表示する場合
    showDialog({
      dialogId: 'id-xxxx', // IDを指定することで、hideDialog関数で閉じることが可
      zIndex: 1000, // zIndex指定することで、重なり順を制御可
      title: 'showDialog関数で ダイアログを開く',
      eventText: 'イベントボタン',
      closeText: '閉じるボタン',
      onEvent: () => {
        Alert.alert('Thanks to Tap', 'EventButton Tapped!!');
        hideDialog('id-xxxx'); // IDを指定してダイアログを閉じる
      },
      children: <Text>showDialog関数を用いて開いたダイアログです。</Text>,
    });
  };

  return (
    <Layout>
      <Text style={styles.title}>Dialog Example</Text>

      {/* ----------------------------------------
       * Basic ダイアログ
       * ----------------------------------------- */}
      {/* ボタン */}
      <Button
        containerStyle={styles.buttonSpacing}
        onPress={() => {
          setVisibleDialog('basic');
        }}
        title='Basic ダイアログを開く'
      />

      {/* ダイアログ */}
      <Dialog
        closeText='閉じるボタン'
        eventText='イベントボタン'
        onClose={onClose}
        onEvent={onEvent}
        title='Basic ダイアログ'
        visible={visibleDialog === 'basic'}
      >
        <Text>
          ダミーテキスト{'\n'}
          ------------{'\n'}
          ------------{'\n'}
          ------------{'\n'}
        </Text>
      </Dialog>

      {/* ----------------------------------------
       * Not BackGroundPress ダイアログ
       * ----------------------------------------- */}
      {/* ボタン */}
      <Button
        containerStyle={styles.buttonSpacing}
        onPress={() => {
          setVisibleDialog('notBackGroundPress');
        }}
        title='Not BackGroundPress ダイアログを開く'
      />

      {/* ダイアログ */}
      <Dialog
        closeText='閉じるボタン'
        eventText='イベントボタン'
        notBackGroundPress={true}
        onClose={onClose}
        onEvent={onEvent}
        title='Not BackGroundPress ダイアログ'
        visible={visibleDialog === 'notBackGroundPress'}
      >
        <Text>
          背景タップで閉じれないダイアログです。{'\n'}
          {'\n'}
          ボタンを押して閉じてください。
        </Text>
      </Dialog>

      {/* ----------------------------------------
       * Long Contents ダイアログ
       * ----------------------------------------- */}
      {/* ボタン */}
      <Button
        containerStyle={styles.buttonSpacing}
        onPress={() => {
          setVisibleDialog('longContent');
        }}
        title='Long Contents ダイアログを開く'
      />

      {/* ダイアログ */}
      <Dialog
        closeText='閉じるボタン'
        eventText='イベントボタン'
        onClose={onClose}
        onEvent={onEvent}
        title={'Long Contents ダイアログ'}
        visible={visibleDialog === 'longContent'}
      >
        <Text>
          ・スクロールできます。
          {[...Array(30).keys()].map((i) => (
            <Text key={i}>{'\n'} -----</Text>
          ))}
        </Text>
        <Text>
          ・ダミーテキスト
          {[...Array(30).keys()].map((i) => (
            <Text key={i}>{'\n'} -----</Text>
          ))}
        </Text>
        <Text>
          ・ダミーテキスト
          {[...Array(30).keys()].map((i) => (
            <Text key={i}>{'\n'} -----</Text>
          ))}
        </Text>
      </Dialog>

      {/* ----------------------------------------
       * Long Contents Only ダイアログ
       * ----------------------------------------- */}
      {/* ボタン */}
      <Button
        containerStyle={styles.buttonSpacing}
        onPress={() => {
          setVisibleDialog('longContentsOnly');
        }}
        title='Long Contents Only ダイアログを開く'
      />

      {/* ダイアログ */}
      <Dialog onClose={onClose} visible={visibleDialog === 'longContentsOnly'}>
        <Text>
          ・Long Contents Only ダイアログ{'\n'}
          ・ロングコンテンツのみのダイアログです。{'\n'}
          ・スクロールできます。
          {[...Array(30).keys()].map((i) => (
            <Text key={i}>{'\n'} -----</Text>
          ))}
        </Text>
        <Text>
          ・ダミーテキスト２
          {[...Array(30).keys()].map((i) => (
            <Text key={i}>{'\n'} -----</Text>
          ))}
        </Text>
        <Text>
          ・ダミーテキスト３
          {[...Array(30).keys()].map((i) => (
            <Text key={i}>{'\n'} -----</Text>
          ))}
        </Text>
      </Dialog>

      {/* ----------------------------------------
       * showDialog関数 ダイアログ
       * ----------------------------------------- */}
      {/* ボタン */}
      <Button onPress={onShowDialog} title='showDialog関数で ダイアログを開く' />
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
});

export default Child00Screen;
