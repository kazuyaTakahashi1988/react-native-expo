import { ScrollView, StyleSheet, View } from 'react-native';

import type { TypelayoutPorps } from '../../../lib/types';

export const LayoutForSecondary: React.FC<TypelayoutPorps> = (props) => {
  const { children } = props;
  return (
    <View style={styles.container}>
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
