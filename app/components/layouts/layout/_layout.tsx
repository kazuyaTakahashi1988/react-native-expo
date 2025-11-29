import { ScrollView, StyleSheet, View } from 'react-native';

import { color } from '../../../lib/mixin';

import type { TypeLayout } from '../../../lib/types/typeComponents';
import type { FC } from 'react';

export const Layout: FC<TypeLayout> = (props) => {
  const { children } = props;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.children} keyboardShouldPersistTaps='handled'>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.gray,
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
