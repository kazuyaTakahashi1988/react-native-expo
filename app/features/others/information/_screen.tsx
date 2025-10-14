import { Button, StyleSheet, Text, View } from 'react-native';

import { Layout } from '../../../components/layout';

import type { TypeInformationScreen } from './_type';

const InformationScreen: React.FC<TypeInformationScreen> = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Layout>
        <Text>Information Screen</Text>
        <Button
          title='Go to Home'
          onPress={() => {
            navigation.navigate('main', { screen: 'home' });
          }}
        />
        <Button
          title='Go to About'
          onPress={() => {
            navigation.navigate('main', { screen: 'about' });
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

export default InformationScreen;
