import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { color } from '../../../lib/mixin';
import { useAuth } from '../../../services/authService';
import { IconLogin } from '../../svg/icon';
import { Logo } from '../../svg/logo';

import type { TypeHeaderHome } from '../../../lib/types/typeComponents';
import type React from 'react';

/* -----------------------------------------------
 * 共通ヘッダー（Home用）
 * ----------------------------------------------- */

const HeaderHome: React.FC<TypeHeaderHome> = (props) => {
  const { navigation } = props;
  const { top } = useSafeAreaInsets(); // デバイス固有のセーフエリアTop値
  const { isAuth } = useAuth(); // Auth状態

  /*
   * Auth画面遷移 処理
   */
  const goToAuth = () => {
    navigation.navigate('others', {
      screen: 'auth',
    });
  };

  return (
    <View style={[styles.header, { paddingTop: top }]}>
      <View style={styles.headerInner}>
        <Text>
          <Logo />
        </Text>
        <Pressable
          onPress={() => {
            goToAuth();
          }}
        >
          <IconLogin {...(isAuth && { color: color.secondary })} size={34} />
        </Pressable>
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
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
  },
});

export default HeaderHome;
