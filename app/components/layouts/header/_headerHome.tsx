import { Pressable, StyleSheet, Text, View } from 'react-native';

import { color } from '../../../lib/mixin';
import { IconLogin } from '../../svg/icon';
import { Logo } from '../../svg/logo';

import type { TypeHeaderHome } from '../../../lib/types/typeComponents';

const HeaderHome: React.FC<TypeHeaderHome> = (props) => {
  const { navigation } = props;

  const goToInfo = () => {
    navigation.navigate('others', {
      screen: 'auth',
    });
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        <Text>
          <Logo />
        </Text>
        <Pressable
          onPress={() => {
            goToInfo();
          }}
        >
          <IconLogin />
        </Pressable>
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
    backgroundColor: color.red,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
  },
});

export default HeaderHome;
