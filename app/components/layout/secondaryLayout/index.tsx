import { StyleSheet, View, Text } from 'react-native';

const SecondaryLayout = () => {
  return (
    <View style={styles.container}>
      <Text>SecondaryLayout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SecondaryLayout;
