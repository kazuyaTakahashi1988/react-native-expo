import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../../../components/button';
import { Layout } from '../../../../../components/layouts/layout';
import { showToast } from '../../../../../components/toast';

import type React from 'react';

/* -----------------------------------------------
 * About > Child01 画面
 * ----------------------------------------------- */

const Child01Screen: React.FC = () => {
  return (
    <Layout>
      <Text style={styles.title}>Toast Example</Text>
      <View style={styles.buttons}>
        <Button
          onPress={() => {
            showToast({ message: 'Default Top トースト', position: 'top', variant: 'default' });
          }}
          title='Default Top トーストを表示'
        />
        <Button
          onPress={() => {
            showToast({
              message: 'Success Center トースト',
              position: 'center',
              variant: 'success',
            });
          }}
          title='Success Center トーストを表示'
        />
        <Button
          onPress={() => {
            showToast({ message: 'Error Bottom トースト', position: 'bottom', variant: 'error' });
          }}
          title='Error Bottom トーストを表示'
        />
      </View>
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
  buttons: {
    gap: 12,
  },
});

export default Child01Screen;
