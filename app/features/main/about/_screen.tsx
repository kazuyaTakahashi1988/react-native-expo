import { Button, StyleSheet, Text, View } from 'react-native';

import { Layout } from '../../../components/layouts/layout';
import { color } from '../../../lib/mixin';

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.gray,
    flex: 1,
    justifyContent: 'center',
  },
});

export default AboutScreen;
