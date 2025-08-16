import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';

import { IconBtNav01, IconBtNav02, IconBtNav03, IconBtNav04 } from '../../svg';

import type { ScreenNavigationProp } from '../../../lib/types';

const Footer: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <View style={styles.footer}>
      <Text style={styles.footerItem} onPress={() => { navigation.navigate('home'); }}>
        <IconBtNav01 />
      </Text>
      <Text style={styles.footerItem}>
        <IconBtNav02 />
      </Text>
      <Text style={styles.footerItem}>
        <IconBtNav03 />
      </Text>
      <Text style={styles.footerItem}>
        <IconBtNav04 />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
  },
  footerItem: {
    padding: 10,
  },
});

export default Footer;
