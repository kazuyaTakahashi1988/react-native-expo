import { StyleSheet, Text, View } from 'react-native';

import { Layout } from '../../../components/layout';
import { AppButton } from '../../../components/form';

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
        <AppButton
          label='Go to Home'
          onPress={() => {
            goToHome();
          }}
          style={styles.button}
        />
        <AppButton
          label='Go to About'
          onPress={() => {
            goToAbout();
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

export default InformationScreen;
