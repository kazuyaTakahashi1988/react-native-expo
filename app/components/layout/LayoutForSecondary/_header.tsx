import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';

import { IconArrow } from '../../../assets/svg';

type typePorps = {
  headerTitle?: string;
};

const Header: React.FC<typePorps> = (props) => {
  const { headerTitle } = props;
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={styles.headerItem} onPress={() => navigation.goBack()}>
        <IconArrow />
      </Text>
      <Text style={styles.headerItem}>{headerTitle}</Text>
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
