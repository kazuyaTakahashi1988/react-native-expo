import { ScrollView, StyleSheet, View } from 'react-native';

import type { TypeLayout } from '../../lib/types';

export const Layout: React.FC<TypeLayout> = (props) => {
  const { children } = props;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.children}>{children}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  children: {
    flexGrow: 1,
    padding: 16,
  },
});

export default Layout;
