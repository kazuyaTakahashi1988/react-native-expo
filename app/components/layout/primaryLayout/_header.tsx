import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Logo, IconInfo } from '../../../assets/svg/'

const Header: React.FC = () => {
const navigation = useNavigation<any>();
  return (
    <View style={styles.header}>
      <Text style={styles.headerItem}><Logo /></Text>
      <Text style={styles.headerItem} onPress={() => navigation.navigate('about')}><IconInfo /></Text>
    </View>
  );
}

export default Header;

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
    padding: 10
  }
});