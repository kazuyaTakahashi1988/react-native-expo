import { StyleSheet, Text, View } from 'react-native';

import { IconArrow } from '../svg';

import type { TypeHeaderSub } from '../../lib/types';

const HeaderSub = ({ navigation, isBack = true, route, options }: TypeHeaderSub) => {
  const headerTitle = options.title ?? route.name;

  return (
    <View style={styles.header}>
      {isBack && (
        <Text
          style={[styles.headerItem, styles.headerLeft]}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <IconArrow />
        </Text>
      )}
      <Text style={styles.headerItem}>{headerTitle}</Text>
      <Text style={[styles.headerItem, styles.headerRight]} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: 'red',
    height: 50,
    justifyContent: 'center',
    width: '100%',
  },
  headerItem: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  headerLeft: {
    left: 10,
    position: 'absolute',
  },
  headerRight: {
    position: 'absolute',
    right: 10,
  },
});

export default HeaderSub;
