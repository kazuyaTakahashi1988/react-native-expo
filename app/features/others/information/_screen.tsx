import { Button, StyleSheet, Text, View } from 'react-native';

import { Layout } from '../../../components/layout';

import type { TypeInformationScreen } from './_type';

const InformationScreen: React.FC<TypeInformationScreen> = (props) => {
  const { navigation } = props;

  const goToHome = () => {
    navigation.navigate('main', { screen: 'home' });
  };

  const goToAbout = () => {
    navigation.navigate('main', { screen: 'about' });
  };

  return (
    <View style={styles.container}>
      <Layout>
        <Text>Information Screen</Text>
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

export default InformationScreen;
