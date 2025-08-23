import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Button } from 'react-native';

import { LayoutForSecondary } from '../../../components/layout';

import type { ScreenNavigationProp } from '../../../lib/types';

const HomeChild02Screen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <LayoutForSecondary headerTitle='ホームチャイルド02画面'>
        <Text>HomeChild02 Screen</Text>
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
      </LayoutForSecondary>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeChild02Screen;
