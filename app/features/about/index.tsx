import { StyleSheet, View, Text, Button } from 'react-native';

const AboutScreen: React.FC = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>About Screen</Text>
      <Button title="Go to About" onPress={() => navigation.navigate('home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AboutScreen;
