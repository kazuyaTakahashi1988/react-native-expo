import { StyleSheet, View, ScrollView } from 'react-native';

import Header from './_header';

import type { TypelayoutPorps } from '../../../lib/types';

export const LayoutForPrimary: React.FC<TypelayoutPorps> = (props) => {
  const { children } = props;
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.children}>{children}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  children: {
    padding: 16,
    flexGrow: 1,
  },
});

export default LayoutForPrimary;
