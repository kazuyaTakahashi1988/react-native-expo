import { StyleSheet, Text } from 'react-native';

import { Button } from '../../../components/button';
import { Layout } from '../../../components/layouts/layout';

import type { TypeInformationScreen } from './_type';

/* -----------------------------------------------
 * Information 画面
 * ----------------------------------------------- */

const InformationScreen: React.FC<TypeInformationScreen> = (props) => {
  const { navigation } = props;

  const goToAbout = () => {
    navigation.navigate('main', { screen: 'about' });
  };

  return (
    <Layout>
      <Text style={styles.title}>Information Screen</Text>
      <Button
        onPress={() => {
          goToAbout();
        }}
        title='Go to About'
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
});

export default InformationScreen;
