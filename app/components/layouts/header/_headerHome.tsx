import { Pressable, StyleSheet, Text, View } from 'react-native';

import { color, useSafeAreaConst } from '../../../lib/mixin';
import { IconLogin } from '../../svg/icon';
import { Logo } from '../../svg/logo';

import type { TypeHeaderHome } from '../../../lib/types/typeComponents';

const HeaderHome: React.FC<TypeHeaderHome> = (props) => {
  const { navigation } = props;
  const { safeAreaTop } = useSafeAreaConst(); // デバイス固有のセーフエリアTop値

  const goToInfo = () => {
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
            goToInfo();
          }}
        >
          <IconLogin size={34} />
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
