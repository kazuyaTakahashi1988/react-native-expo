import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';

import { Logo, IconInfo } from '../../../assets/svg/';

import type { RootStackParamList } from '../../../navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


type AboutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'about'>;

const Header: React.FC = () => {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  return (
    <View style={styles.header}>
      <Text style={styles.headerItem}>
        <Logo />
      </Text>
      <Text style={styles.headerItem} onPress={() => navigation.navigate('about')}>
        <IconInfo />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
  },
  headerItem: {
    padding: 10,
  },
});

export default Header;
