import { Button, StyleSheet, Text, View } from 'react-native';

import { Layout } from '../../../../../components/layout';

import type { TypeChild02Screen } from './_type';

const Child02Screen: React.FC<TypeChild02Screen> = (props) => {
  const { navigation } = props;

  const goToHome = () => {
    navigation.navigate('home');
  };

  const goToAbout = () => {
    navigation.navigate('about');
  };

  return (
    <View style={styles.container}>
      <Layout>
        <Text>Child02 Screen</Text>
        <Button
          title='Go to Home'
          onPress={() => {
            goToHome();
          }}
        />
        <Button
          title='Go to About'
          onPress={() => {
            goToAbout();
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

export default Child02Screen;
