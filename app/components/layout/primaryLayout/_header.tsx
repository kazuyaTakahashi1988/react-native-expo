import { StyleSheet, View, Text } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Header</Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});