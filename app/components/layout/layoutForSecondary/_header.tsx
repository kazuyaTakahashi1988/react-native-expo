import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';

import { IconArrow } from '../../svg';

import type { TypelayoutPorps } from '../../../lib/types';

const Header: React.FC<TypelayoutPorps> = (props) => {
  const { headerTitle } = props;
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text
        style={styles.headerItem}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <IconArrow />
      </Text>
      <Text style={styles.headerItem}>{headerTitle}</Text>
      <Text style={styles.headerItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: 'red',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    width: '100%',
  },
  headerItem: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    padding: 10,
  },
});

export default Header;
