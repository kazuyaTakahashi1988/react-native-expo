import { Button, StyleSheet, Text, View } from 'react-native';

import { Layout } from '../../../../../components/layout';

import type { TypeChild00Screen } from './_type';

const Child00Screen: React.FC<TypeChild00Screen> = (props) => {
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
        <Text>Child00 Screen</Text>
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

export default Child00Screen;
