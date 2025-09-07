import { StyleSheet, Text, View } from 'react-native';

import { IconArrow } from '../svg';

import type { TypeHeaderSubProps } from '../../lib/types';

const HeaderSub: React.FC<TypeHeaderSubProps> = (props) => {
  const { navigation, isBack = true, route, options } = props;
  const headerTitle = options.title ?? route.name;

  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'red',
    paddingTop: 20,
  },
  headerInner: {
    alignItems: 'center',
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
    left: 0,
    position: 'absolute',
  },
  headerRight: {
    position: 'absolute',
    right: 0,
  },
});

export default HeaderSub;
