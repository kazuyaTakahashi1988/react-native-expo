import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';

import { Logo, IconInfo } from '../../svg';

import type { ScreenNavigationProp } from '../../../lib/types';

const Header: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <View style={styles.header}>
      <Text style={styles.headerItem}>
        <Logo />
      </Text>
      <Text
        style={styles.headerItem}
        onPress={() => {
          navigation.navigate('about');
        }}
      >
        <IconInfo />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
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

export default Header;
