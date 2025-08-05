import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Button } from 'react-native';

import { PrimaryLayout } from '../../components/layout/primaryLayout';

import type { RootStackParamList } from '../../navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AbouteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<AbouteScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <PrimaryLayout>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Button title='Go to About' onPress={() => navigation.navigate('about')} />
      </PrimaryLayout>
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

export default HomeScreen;
