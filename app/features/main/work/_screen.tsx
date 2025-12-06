import { StyleSheet, Text } from 'react-native';

import { Button } from '../../../components/button';
import { Layout } from '../../../components/layouts/layout';

import type { TypeWorkScreen } from './_type';

/* -----------------------------------------------
 * Work 画面
 * ----------------------------------------------- */

const WorkScreen: React.FC<TypeWorkScreen> = (props) => {
  const { navigation } = props;

  const goToAbout = () => {
    navigation.navigate('about');
  };

  return (
    <Layout>
      <Text style={styles.title}>Work Screen</Text>
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

export default WorkScreen;
