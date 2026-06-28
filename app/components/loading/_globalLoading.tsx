import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { color } from '../../lib/mixin';

import type { TypeSelectorState } from '../../lib/types/typeService';
import type React from 'react';

/* -----------------------------------------------
 * グローバルローディング
 * ----------------------------------------------- */

const GlobalLoading: React.FC = () => {
  /*
   * ローディングフラグ
   */
  const loadingFlagCount = useSelector((state: TypeSelectorState) => state.loadingFlagCount);
  const visible = loadingFlagCount > 0;

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.loadingBody}>
        <ActivityIndicator color={color.white} size='small' />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: color.backdrop,
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
  },
  loadingBody: {
    alignItems: 'center',
    backgroundColor: color.gray50,
    borderRadius: 8,
    minWidth: 120,
    paddingHorizontal: 16,
    paddingVertical: 12,
    rowGap: 8,
  },
  text: {
    color: color.white,
    fontSize: 12,
  },
});

export default GlobalLoading;
