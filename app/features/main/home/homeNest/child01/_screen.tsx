import { Button, StyleSheet, Text, View } from 'react-native';

import { Layout } from '../../../../../components/layout';

import type { TypeChild01Screen } from './_type';

const Child01Screen: React.FC<TypeChild01Screen> = (props) => {
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
        <Text>Child01 Screen</Text>
        <Button
          onPress={() => {
            goToHome();
          }}
          title='Go to Home'
        />
        <Button
          onPress={() => {
            goToAbout();
          }}
          title='Go to About'
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

export default Child01Screen;
