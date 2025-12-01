import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

import { color, useSafeAreaConst } from '../../../lib/mixin';

import type { TypeLayout } from '../../../lib/types/typeComponents';
import type React from 'react';

/* -----------------------------------------------
 * 共通レイアウト
 * ----------------------------------------------- */

export const Layout: React.FC<TypeLayout> = (props) => {
  const { children } = props;
  const { safeAreaTop } = useSafeAreaConst();
  const isIOS = Platform.OS === 'ios';

  return (
    <KeyboardAvoidingView
      behavior={isIOS ? 'padding' : 'height'}
      keyboardVerticalOffset={isIOS ? safeAreaTop : 0}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.children} keyboardShouldPersistTaps='handled'>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.gray200,
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
