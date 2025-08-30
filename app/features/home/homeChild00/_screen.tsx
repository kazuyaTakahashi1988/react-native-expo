import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

import { LayoutForSecondary } from '../../../components/layout';

import type { ScreenNavigationProp } from '../../../lib/types';

const HomeChild00Screen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <LayoutForSecondary headerTitle='ホームチャイルド00画面'>
        <Text>HomeChild00 Screen</Text>
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
    alignItems: 'center',
    backgroundColor: '#ccc',
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomeChild00Screen;
