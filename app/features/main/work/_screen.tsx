import { Button, StyleSheet, Text, View } from 'react-native';

import { Layout } from '../../../components/layout';

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
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});

export default WorkScreen;
