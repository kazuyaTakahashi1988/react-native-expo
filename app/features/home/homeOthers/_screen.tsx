import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

import { Layout } from '../../../components/layout';

import type { TypeNavigation } from '../../../lib/types';

const HomeOthersScreen: React.FC = () => {
  const navigation = useNavigation<TypeNavigation>();
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
