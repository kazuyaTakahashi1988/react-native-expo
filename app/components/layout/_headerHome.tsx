import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import { IconInfo, Logo } from '../svg';

import type { TypeNavigation } from '../../lib/types';

const HeaderHome: React.FC = () => {
  const navigation = useNavigation<TypeNavigation>();

  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        <Text style={styles.headerItem}>
          <Logo />
        </Text>
        <Text
          style={styles.headerItem}
          onPress={() => {
            navigation.navigate('homeOthers');
          }}
        >
          <IconInfo />
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'red',
    paddingTop: 20,
  },
  headerInner: {
    alignItems: 'center',
    backgroundColor: 'red',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    width: '100%',
  },
  headerItem: {
    padding: 10,
  },
});

export default HeaderHome;
