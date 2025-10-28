import { StyleSheet, Text, View } from 'react-native';

import { IconInfo, Logo } from '../svg';

import type { TypeHeaderHome } from '../../lib/types';

const HeaderHome: React.FC<TypeHeaderHome> = (props) => {
  const { navigation } = props;

  const goToInfo = () => {
    navigation.navigate('others', {
      screen: 'information',
    });
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        <Text style={styles.headerItem}>
          <Logo />
        </Text>
        <Text
          style={styles.headerItem}
          onPress={() => {
            goToInfo();
          }}
        >
          <IconInfo />
        </Text>
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
    backgroundColor: 'red',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    width: '100%',
  },
  headerItem: {
    padding: 10,
  },
});

export default HeaderHome;
