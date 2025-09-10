import { Button, StyleSheet, Text, View } from 'react-native';

import { Layout } from '../../../components/layout';

import type { TypeHomeOthersScreen } from '../../../lib/types';

const HomeOthersScreen: React.FC<TypeHomeOthersScreen> = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Layout>
        <Text>HomeOthers Screen</Text>
        <Button
          title='Go to Home'
          onPress={() => {
            navigation.navigate('home');
          }}
        />
        <Button
          title='Go to About'
          onPress={() => {
            navigation.navigate('about');
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

export default HomeOthersScreen;
