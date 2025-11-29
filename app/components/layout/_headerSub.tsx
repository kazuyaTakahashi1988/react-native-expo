import { Pressable, StyleSheet, Text, View } from 'react-native';

import { color } from '../../lib/mixin';
import { IconArrow } from '../svg/icon';

import type { TypeHeaderSub } from '../../lib/types/typeComponents';

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
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.headerLeft}
          >
            <IconArrow />
            {typeof goBack === 'string' && <Text style={styles.headerLeftLabel}>{goBack}</Text>}
          </Pressable>
        )}
        <Text style={styles.headerItem}>{headerTitle}</Text>
        <Text style={[styles.headerItem, styles.headerRight]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.red,
    paddingTop: 50,
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
    alignItems: 'center',
    flexDirection: 'row',
    left: 0,
    padding: 10,
    position: 'absolute',
  },
  headerLeftLabel: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 6,
  },
  headerRight: {
    position: 'absolute',
    right: 0,
  },
});

export default HeaderSub;
