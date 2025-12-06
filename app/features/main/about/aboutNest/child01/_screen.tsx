import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../../../components/button';
import { Layout } from '../../../../../components/layouts/layout';
import { Toast } from '../../../../../components/toast';

import type { TypeToast } from '../../../../../lib/types/typeComponents';

/* -----------------------------------------------
 * About > Child01 画面
 * ----------------------------------------------- */

const Child01Screen: React.FC = () => {
  const [toastState, setToastState] = React.useState<
    Pick<TypeToast, 'visible' | 'message' | 'position' | 'variant'>
  >({
    visible: false,
    message: '',
    position: 'bottom',
    variant: 'default',
  });

  const showToast = (options: Pick<TypeToast, 'message' | 'position' | 'variant'>) => {
    setToastState((prev) => ({
      ...prev,
      ...options,
      visible: true,
    }));
  };

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

      <Toast
        {...toastState}
        onHide={() => {
          setToastState((prev) => ({ ...prev, visible: false }));
        }}
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
  buttons: {
    gap: 12,
  },
});

export default Child01Screen;
