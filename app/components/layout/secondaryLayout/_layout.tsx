import { StyleSheet, View, Text, Button } from 'react-native';

const SecondaryLayout = () => {
  return (
    <View style={styles.container}>
      <Text>SecondaryLayout</Text>
    </View>
  );
}

export default SecondaryLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});