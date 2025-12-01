import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { color, useSafeAreaConst } from '../../../lib/mixin';
import { useAuthSession } from '../../../services/authHelper';
import { IconLogin } from '../../svg/icon';
import { Logo } from '../../svg/logo';

import type { TypeHeaderHome } from '../../../lib/types/typeComponents';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';

/* -----------------------------------------------
 * 共通ヘッダー（Home用）
 * ----------------------------------------------- */

const HeaderHome: React.FC<TypeHeaderHome> = (props) => {
  const { navigation } = props;
  const { safeAreaTop } = useSafeAreaConst(); // デバイス固有のセーフエリアTop値
  const { isAuth, fetchAuth } = useAuthSession(); // Auth情報 取得・更新処理

  /*
   * Auth情報 取得・更新処理
   */
  React.useEffect(() => {
    const unsubscribe = (navigation as NavigationProp<ParamListBase>).addListener('focus', () => {
      void fetchAuth();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation, fetchAuth]);

  /*
   * Auth画面遷移 処理
   */
  const goToAuth = () => {
    navigation.navigate('others', {
      screen: 'auth',
    });
  };

  return (
    <View style={[styles.header, { paddingTop: safeAreaTop }]}>
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
