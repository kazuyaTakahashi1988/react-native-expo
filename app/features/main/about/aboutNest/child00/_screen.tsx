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

  const closeDialog = React.useCallback(() => {
    setVisibleDialog(null);
  }, []);

  const openDialog = React.useCallback((pattern: TypeDialogPattern) => {
    setVisibleDialog(pattern);
  }, []);

  const handleConfirm = React.useCallback(
    (message: string) => () => {
      Alert.alert('Thanks to Tap', message);
      closeDialog();
    },
    [closeDialog],
  );

  return (
    <Layout>
      <Text style={styles.title}>Dialog Example</Text>

      {/* ----------------------------------------
       * Dialog ボタン
       * ----------------------------------------- */}

      {/* Basic Dialog ボタン */}
      <Button
        containerStyle={styles.buttonSpacing}
        onPress={() => {
          openDialog('basic');
        }}
        title='Basic Dialog'
      />

      {/* WithOut Close Button ボタン */}
      <Button
        containerStyle={styles.buttonSpacing}
        onPress={() => {
          openDialog('withoutClose');
        }}
        title='WithOut Close Button'
      />

      {/* WithOut Event & Close（ScrollView）Button ボタン */}
      <Button
        containerStyle={styles.buttonSpacing}
        onPress={() => {
          openDialog('withoutEventAndClose');
        }}
        title='WithOut Event & Close（ScrollView） Button'
      />

      {/* Custom Contents（ScrollView）ボタン */}
      <Button
        onPress={() => {
          openDialog('customContent');
        }}
        title='Custom Contents（ScrollView）'
      />

      {/* ----------------------------------------
       * Dialog
       * ----------------------------------------- */}

      {/* Basic Dialog */}
      <Dialog
        closeText='Close Button'
        eventText='Event Button'
        onClose={closeDialog}
        onEvent={handleConfirm('EventButton Tapped!!')}
        title='Basic Dialog'
        visible={visibleDialog === 'basic'}
      >
        <Text>
          description：Dummy Text。----------------------------------------------------------------
        </Text>
      </Dialog>

      {/* WithOut Close */}
      <Dialog
        closeOnBackGround={false}
        eventText='OK'
        onClose={closeDialog}
        onEvent={handleConfirm('EventButton Tapped!!')}
        title='Close Buttonを表示しない例'
        visible={visibleDialog === 'withoutClose'}
      >
        <Text>OKボタンを押さないと閉じれません。</Text>
      </Dialog>

      {/* WithOut Event & Close（ScrollView） */}
      <Dialog
        onClose={closeDialog}
        onEvent={handleConfirm('EventButton Tapped!!')}
        visible={visibleDialog === 'withoutEventAndClose'}
      >
        <Text>
          ・Dummy Text１
          {[...Array(30).keys()].map((i) => (
            <Text key={i}>----- {'\n'}</Text>
          ))}
        </Text>
        <Text>
          ・Dummy Text２
          {[...Array(30).keys()].map((i) => (
            <Text key={i}>----- {'\n'}</Text>
          ))}
        </Text>
        <Text>
          ・Dummy Text３
          {[...Array(30).keys()].map((i) => (
            <Text key={i}>----- {'\n'}</Text>
          ))}
        </Text>
      </Dialog>

      {/* Custom Contents（ScrollView） */}
      <Dialog
        closeText='Close Button'
        eventText='Event Button'
        onClose={closeDialog}
        onEvent={handleConfirm('Dummy Textを確認しました')}
        title='Custom Contents（ScrollView）'
        visible={visibleDialog === 'customContent'}
      >
        <Text>
          ・Dummy Text１
          {[...Array(30).keys()].map((i) => (
            <Text key={i}>----- {'\n'}</Text>
          ))}
        </Text>
        <Text>
          ・Dummy Text２
          {[...Array(30).keys()].map((i) => (
            <Text key={i}>----- {'\n'}</Text>
          ))}
        </Text>
        <Text>
          ・Dummy Text３
          {[...Array(30).keys()].map((i) => (
            <Text key={i}>----- {'\n'}</Text>
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
