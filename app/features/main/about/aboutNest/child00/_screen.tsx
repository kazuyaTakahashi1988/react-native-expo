import React from 'react';
import { Alert, StyleSheet, Text } from 'react-native';

import { Button } from '../../../../../components/button';
import { Dialog } from '../../../../../components/dialog';
import { Layout } from '../../../../../components/layouts/layout';

import type { TypeDialogPattern } from './_type';

/* -----------------------------------------------
 * About > Child00 画面
 * ----------------------------------------------- */

const Child00Screen: React.FC = () => {
  const [visibleDialog, setVisibleDialog] = React.useState<TypeDialogPattern>(null);

  const onClose = React.useCallback(() => {
    setVisibleDialog(null);
  }, []);

  const onEvent = React.useCallback(() => {
    Alert.alert('Thanks to Tap', 'EventButton Tapped!!');
    onClose();
  }, [onClose]);

  return (
    <Layout>
      <Text style={styles.title}>Dialog Example</Text>

      {/* ----------------------------------------
       * Dialog ボタン
       * ----------------------------------------- */}

      {/* Basic ボタン */}
      <Button
        containerStyle={styles.buttonSpacing}
        onPress={() => {
          setVisibleDialog('basic');
        }}
        title='Basic ダイアログを開く'
      />

      {/* Not BackGroundPress ボタン */}
      <Button
        containerStyle={styles.buttonSpacing}
        onPress={() => {
          setVisibleDialog('notBackGroundPress');
        }}
        title='Not BackGroundPress ダイアログを開く'
      />

      {/* Long Contents ボタン */}
      <Button
        containerStyle={styles.buttonSpacing}
        onPress={() => {
          setVisibleDialog('longContent');
        }}
        title='Long Contents ダイアログを開く'
      />

      {/* Long Contents Only ボタン */}
      <Button
        onPress={() => {
          setVisibleDialog('longContentsOnly');
        }}
        title='Long Contents Only ダイアログを開く'
      />

      {/* ----------------------------------------
       * Dialog
       * ----------------------------------------- */}

      {/* Basic ダイアログ */}
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

      {/* Not BackGroundPress ダイアログ */}
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

      {/* Long Contents ダイアログ */}
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

      {/* Long Contents Only ダイアログ */}
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
