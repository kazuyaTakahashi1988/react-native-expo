import { StyleSheet, View, ScrollView } from 'react-native';

import Header from './_header';

type TypePorps = {
  headerTitle?: string;
  children?: React.ReactNode;
};

export const LayoutForSecondary: React.FC<TypePorps> = (props) => {
  const { headerTitle, children } = props;
  return (
    <View style={styles.container}>
      <Header headerTitle={headerTitle} />
      <ScrollView contentContainerStyle={styles.children}>{children}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ccc',
  },
  children: {
    padding: 16,
    flexGrow: 1,
  },
});

export default LayoutForSecondary;
