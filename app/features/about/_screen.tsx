import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

import { LayoutForPrimary } from '../../components/layout';

import type { ScreenNavigationProp } from '../../lib/types';

const AboutScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <LayoutForPrimary>
        <Text>About Screen</Text>
        <Button
          title='Go to Home'
          onPress={() => {
            navigation.navigate('home');
          }}
        />
        <Button
          title='Go to AboutChild'
          onPress={() => {
            navigation.navigate('aboutChild');
          }}
        />
      </LayoutForPrimary>
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
