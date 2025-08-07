import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Button } from 'react-native';

import { LayoutForSecondary } from '../../components/layout/LayoutForSecondary';

import type { ScreenNavigationProp } from '../../navigation';

const AboutScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <LayoutForSecondary title='アバウト画面'>
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
      </LayoutForSecondary>
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
