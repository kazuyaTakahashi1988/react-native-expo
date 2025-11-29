import { StyleSheet, Text } from 'react-native';

import { Button } from '../../../components/button';
import { Layout } from '../../../components/layouts/layout';

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
    <Layout>
      <Text style={styles.title}>About Screen</Text>
      <Button
        containerStyle={styles.containerStyle}
        onPress={() => {
          goToHome();
        }}
        title='Go to Home'
      />
      <Button
        onPress={() => {
          goToChild02();
        }}
        title='Go to Child02'
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  containerStyle: {
    marginBottom: 24,
  },
});

export default AboutScreen;
