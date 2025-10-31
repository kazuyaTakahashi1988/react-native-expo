import { Button, StyleSheet, Text, View } from 'react-native';

import { Layout } from '../../../components/layout';

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
        <Button
          title='Go to Home'
          onPress={() => {
            goToHome();
          }}
        />
        <Button
          title='Go to Child02'
          onPress={() => {
            goToChild02();
          }}
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
});

export default AboutScreen;
