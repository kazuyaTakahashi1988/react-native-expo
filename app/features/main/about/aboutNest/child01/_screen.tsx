import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../../../components/button';
import { Layout } from '../../../../../components/layouts/layout';
import { showToast } from '../../../../../components/toast';

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
            showToast({ message: 'Bottom Toast', position: 'bottom', variant: 'default' });
          }}
          title='Show Bottom Toast'
        />
        <Button
          onPress={() => {
            showToast({ message: 'Top Toast', position: 'top', variant: 'success' });
          }}
          pattern='secondary'
          title='Show Top Success Toast'
        />
        <Button
          onPress={() => {
            showToast({ message: 'Center Error Toast', position: 'center', variant: 'error' });
          }}
          title='Show Center Error Toast'
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
