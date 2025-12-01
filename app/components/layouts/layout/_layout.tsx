import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { color } from '../../../lib/mixin';

import type { TypeLayout } from '../../../lib/types/typeComponents';
import type { FC } from 'react';

/* -----------------------------------------------
 * 共通レイアウト
 * ----------------------------------------------- */

export const Layout: FC<TypeLayout> = (props) => {
  const { children } = props;

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: 'height', default: undefined })}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 16, default: 0 })}
      style={styles.container}
    >
      <View style={styles.inner}>
        <ScrollView
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={styles.children}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='handled'
        >
          {children}
        </ScrollView>
      </View>
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
  inner: {
    flex: 1,
  },
  children: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 32,
  },
});

export default Layout;
