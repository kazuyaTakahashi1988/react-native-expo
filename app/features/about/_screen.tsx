import { Button, StyleSheet, Text, View } from 'react-native';

import { Layout } from '../../components/layout';

import type { TypeAboutScreen } from '../../lib/types';

const AboutScreen: React.FC<TypeAboutScreen> = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Layout>
        <Text>About Screen</Text>
        <Button
          title='Go to Home'
          onPress={() => {
            navigation.navigate('home');
          }}
        />
        <Button
          title='Go to HomeChild'
          onPress={() => {
            navigation.navigate('home', {
              screen: 'homeTab',
              params: {
                screen: 'homeChild02',
              },
            });
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

export default AboutScreen;
