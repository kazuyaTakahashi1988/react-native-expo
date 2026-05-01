import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { color } from '../../../lib/mixin';
import { selectIsApiLoading, useAppSelector } from '../../../services/storeService';

const GlobalLoading: React.FC = () => {
  const isLoading = useAppSelector(selectIsApiLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <View pointerEvents='none' style={styles.overlay}>
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
