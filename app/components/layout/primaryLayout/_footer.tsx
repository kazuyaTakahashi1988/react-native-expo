import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer: React.FC = () => {
const navigation = useNavigation<any>();
  return (
    <View style={styles.footer}>
      <Text style={styles.footerItem} onPress={() => navigation.navigate('home')}>Home</Text>
      <Text style={styles.footerItem} onPress={() => navigation.navigate('about')}>about</Text>
      <Text style={styles.footerItem}>XXXX</Text>
      <Text style={styles.footerItem}>XXXX</Text>
    </View>
  );
}

export default Footer;

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
    padding: 10
  }
});