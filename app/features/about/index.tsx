import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Button } from 'react-native';

import { SecondaryLayout } from '../../components/layout/secondaryLayout';

import type { RootStackParamList } from '../../navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AboutScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <SecondaryLayout>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Text>About Screen</Text>
        <Button title='Go to Home' onPress={() => navigation.navigate('home')} />
      </SecondaryLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AboutScreen;
