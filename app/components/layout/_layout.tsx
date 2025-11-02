import { ScrollView, StyleSheet, View } from 'react-native';

import type { FC } from 'react';

import type { TypeLayout } from '../../lib/types/typeComponents';

export const Layout: FC<TypeLayout> = (props) => {
  const { children } = props;

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.children}>
        {children}
      </ScrollView>
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
