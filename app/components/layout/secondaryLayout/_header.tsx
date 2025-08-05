import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';

import { IconArrow } from '../../../assets/svg';

import type { RootStackParamList } from '../../../navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ReturnScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Header: React.FC = () => {
  const navigation = useNavigation<ReturnScreenNavigationProp>();
  const state = navigation.getState();
  return (
    <View style={styles.header}>
      <Text style={styles.headerItem} onPress={() => navigation.goBack()}>
        <IconArrow />
      </Text>
      <Text style={styles.headerItem}>{state.routes[state.index].name}</Text>
      <Text style={styles.headerItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
  },
  headerItem: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
