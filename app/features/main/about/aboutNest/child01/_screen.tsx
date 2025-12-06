import { StyleSheet, Text } from 'react-native';

import { Layout } from '../../../../../components/layouts/layout';

import type React from 'react';

/* -----------------------------------------------
 * About > Child01 画面
 * ----------------------------------------------- */

const Child01Screen: React.FC = () => {
  return (
    <Layout>
      <Text style={styles.title}>Toast Example</Text>
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
});

export default Child01Screen;
