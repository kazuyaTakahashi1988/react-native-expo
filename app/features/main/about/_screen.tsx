import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../components/button';
import { Dialog } from '../../../components/dialog';
import { Layout } from '../../../components/layouts/layout';
import { color } from '../../../lib/mixin';

import type { TypeAboutScreen, TypeDialogPattern } from './_type';

/* -----------------------------------------------
 * About 画面
 * ----------------------------------------------- */

const AboutScreen: React.FC<TypeAboutScreen> = (props) => {
  const { navigation } = props;
  const [visibleDialog, setVisibleDialog] = React.useState<TypeDialogPattern>(null);

  const goToHome = () => {
    navigation.navigate('home');
  };

  const goToChild02 = () => {
    navigation.navigate('home', {
      screen: 'homeNest',
      params: {
        screen: 'child02',
      },
    });
  };

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
      <Text style={styles.title}>About Screen</Text>
      <View style={styles.navigationActions}>
        <Button
          containerStyle={styles.buttonSpacing}
          onPress={() => {
            goToHome();
          }}
          title='Go to Home'
        />
        <Button
          onPress={() => {
            goToChild02();
          }}
          title='Go to Child02'
        />
      </View>

      {/*
       * Dialog パターン
       */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dialog パターン</Text>
        <Text style={styles.description}>Storybook で用意したパターンを画面上で確認できます。</Text>

        <View style={styles.dialogActions}>
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

          {/* WithOut Event & Close Button ボタン */}
          <Button
            containerStyle={styles.buttonSpacing}
            onPress={() => {
              openDialog('withoutEventAndClose');
            }}
            title='WithOut Event & Close Button'
          />

          {/* Custom Contents（ScrollView） ボタン */}
          <Button
            onPress={() => {
              openDialog('customContent');
            }}
            title='Custom Contents（ScrollView）'
          />
        </View>
      </View>

      {/* Basic Dialog ダイアログ */}
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

      {/* WithOut Close ダイアログ */}
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

      {/* WithOut Event & Close ダイアログ */}
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

      {/* Custom Contents（ScrollView）ダイアログ */}
      <Dialog
        closeText='Close Button'
        eventText='Event Button'
        onClose={closeDialog}
        onEvent={handleConfirm('Dummy Textを確認しました')}
        title='Custom Contents（ScrollView）'
        visible={visibleDialog === 'customContent'}
      >
        <View style={styles.customContent}>
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
        </View>
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
  description: {
    color: color.gray50,
    lineHeight: 20,
    marginBottom: 16,
  },
  section: {
    backgroundColor: color.white,
    borderRadius: 12,
    gap: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  dialogActions: {
    gap: 12,
  },
  buttonSpacing: {
    marginBottom: 12,
  },
  navigationActions: {
    marginBottom: 24,
  },
  customContent: {
    gap: 6,
  },
});

export default AboutScreen;
