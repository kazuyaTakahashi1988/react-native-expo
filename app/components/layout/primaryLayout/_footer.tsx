import { StyleSheet, View, Text } from 'react-native';

const Footer: React.FC = ({ navigation }: any) => {
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  footerItem: {
    padding: 10
  }
});