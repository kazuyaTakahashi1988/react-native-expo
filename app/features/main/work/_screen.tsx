import { StyleSheet, Text, View } from 'react-native';

import { Layout } from '../../../components/layout';
import { AppButton } from '../../../components/form';

import type { TypeWorkScreen } from './_type';

const WorkScreen: React.FC<TypeWorkScreen> = (props) => {
  const { navigation } = props;

  const goToAbout = () => {
    navigation.navigate('about');
  };

  return (
    <View style={styles.container}>
      <Layout>
        <Text>Work Screen</Text>
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
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginTop: 16,
  },
});

export default WorkScreen;
