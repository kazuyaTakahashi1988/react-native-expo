import { StyleSheet, View, Text, Button } from 'react-native';

const AboutScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>About Screen</Text>
      <Button title="Go to About" onPress={() => navigation.navigate('home')} />
    </View>
  );
}

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});