import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { color } from '../../../lib/mixin';
import { IconArrow } from '../../svg/icon';

import type { TypeHeaderSub } from '../../../lib/types/typeComponents';

/* -----------------------------------------------
 * 共通ヘッダー（サブ用）
 * ----------------------------------------------- */

const HeaderSub: React.FC<TypeHeaderSub> = (props) => {
  const { navigation, route, options, goBack = false, rightItem } = props;
  const headerTitle = options.title ?? route.name;
  const isGoBack = Boolean(goBack);
  const { top } = useSafeAreaInsets(); // デバイス固有のセーフエリアTop値

  return (
    <View style={[styles.header, { paddingTop: top }]}>
      <View style={styles.headerInner}>
        {isGoBack ? (
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.headerLeft}
          >
            <IconArrow />
            {typeof goBack === 'string' ? (
              <Text style={styles.headerLeftLabel}>{goBack}</Text>
            ) : null}
          </Pressable>
        ) : null}
        <Text style={styles.headerItem}>{headerTitle}</Text>
        <Text style={[styles.headerItem, styles.headerRight]}>{rightItem}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.primary,
    paddingTop: 0,
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
