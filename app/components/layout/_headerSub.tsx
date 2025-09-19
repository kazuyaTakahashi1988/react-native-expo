import { StyleSheet, Text, View } from 'react-native';

import { IconArrow } from '../svg';

import type { TypeHeaderSub } from '../../lib/types';

const HeaderSub: React.FC<TypeHeaderSub> = (props) => {
  const { navigation, route, options, goBack = false } = props;
  const headerTitle = options.title ?? route.name;

  const isGoBack = () => {
    return goBack === true || (typeof goBack === 'string' && goBack.trim() !== '');
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        {isGoBack() && (
          <Text
            style={[styles.headerItem, styles.headerLeft]}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <IconArrow />
            {typeof goBack === 'string' && goBack}
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
    fontSize: 16,
    fontWeight: '400',
    left: 0,
    position: 'absolute',
  },
  headerRight: {
    position: 'absolute',
    right: 0,
  },
});

export default HeaderSub;
