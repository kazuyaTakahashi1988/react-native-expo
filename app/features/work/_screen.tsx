import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Button } from 'react-native';

import { LayoutForPrimary } from '../../components/layout';

import type { ScreenNavigationProp } from '../../lib/types';

const WorkScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <LayoutForPrimary>
        <Text>Work Screen</Text>
        <Button
          title='Go to About'
          onPress={() => {
            navigation.navigate('about');
          }}
        />
      </LayoutForPrimary>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WorkScreen;
