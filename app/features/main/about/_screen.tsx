import { StyleSheet, Text, View } from 'react-native';

import { Layout } from '../../../components/layout';
import { AppButton } from '../../../components/form';

import type { TypeAboutScreen } from './_type';

const AboutScreen: React.FC<TypeAboutScreen> = (props) => {
  const { navigation } = props;

  const goToHome = () => {
    navigation.navigate('home');
  };

  const goToChild02 = () => {
    navigation.navigate('home', {
      screen: 'homeNest',
      params: {
        screen: 'child02',
      },
    });
  };

  return (
    <View style={styles.container}>
      <Layout>
        <Text>About Screen</Text>
        <AppButton
          label='Go to Home'
          onPress={() => {
            goToHome();
          }}
          style={styles.button}
        />
        <AppButton
          label='Go to Child02'
          onPress={() => {
            goToChild02();
          }}
          style={styles.button}
        />
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginTop: 16,
  },
});

export default AboutScreen;
