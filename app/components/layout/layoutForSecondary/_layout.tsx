import { StyleSheet, View, ScrollView } from 'react-native';

import Header from './_header';

import type { TypelayoutPorps } from '../../../lib/types';

export const LayoutForSecondary: React.FC<TypelayoutPorps> = (props) => {
  const { headerTitle, children } = props;
  return (
    <View style={styles.container}>
      <Header headerTitle={headerTitle} />
      <ScrollView contentContainerStyle={styles.children}>{children}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  children: {
    flexGrow: 1,
    padding: 16,
  },
  container: {
    backgroundColor: '#ccc',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
});

export default LayoutForSecondary;
