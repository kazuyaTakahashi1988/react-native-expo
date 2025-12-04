import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../components/button';
import { Dialog } from '../../../components/dialog';
import { Layout } from '../../../components/layouts/layout';
import { color } from '../../../lib/mixin';

import type { TypeAboutScreen } from './_type';

type DialogPattern = 'basic' | 'withoutCancel' | 'customContent';

const AboutScreen: React.FC<TypeAboutScreen> = (props) => {
  const { navigation } = props;
  const [visibleDialog, setVisibleDialog] = React.useState<DialogPattern | null>(null);

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

  const openDialog = React.useCallback((pattern: DialogPattern) => {
    setVisibleDialog(pattern);
  }, []);

  const handleConfirm = React.useCallback(
    (message: string) => () => {
      Alert.alert('Dialog', message);
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dialog パターン</Text>
        <Text style={styles.description}>Storybook で用意したパターンを画面上で確認できます。</Text>

        <View style={styles.dialogActions}>
          <Button
            containerStyle={styles.buttonSpacing}
            onPress={() => {
              openDialog('basic');
            }}
            title='基本ダイアログ'
          />
          <Button
            containerStyle={styles.buttonSpacing}
            onPress={() => {
              openDialog('withoutCancel');
            }}
            title='キャンセルなし'
          />
          <Button
            onPress={() => {
              openDialog('customContent');
            }}
            title='カスタムコンテンツ'
          />
        </View>
      </View>

      <Dialog
        description='この内容で実行しますか？この操作は元に戻すことができないため、十分にご注意ください。'
        onClose={closeDialog}
        onEvent={handleConfirm('基本ダイアログを確認しました')}
        title='Dialog タイトル'
        visible={visibleDialog === 'basic'}
      />

      <Dialog
        closeOnBackdropPress={false}
        closeText=''
        description='確認のみのケースに使用します。'
        onClose={closeDialog}
        onEvent={handleConfirm('確認のみのダイアログです')}
        title='キャンセルを表示しない例'
        visible={visibleDialog === 'withoutCancel'}
      />

      <Dialog
        onClose={closeDialog}
        onEvent={handleConfirm('チェック項目を確認しました')}
        title='カスタムコンテンツ'
        visible={visibleDialog === 'customContent'}
      >
        <View style={styles.customContent}>
          <Text>・チェック項目１</Text>
          <Text>・チェック項目２</Text>
          <Text>・チェック項目３</Text>
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
