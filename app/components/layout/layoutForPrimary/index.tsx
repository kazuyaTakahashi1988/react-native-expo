import { StyleSheet, View, ScrollView } from 'react-native';

import Footer from './_footer';
import Header from './_header';

// Layout
export type TypePorps = {
  children?: React.ReactNode;
};

export const LayoutForPrimary: React.FC<TypePorps> = (props) => {
  const { children } = props;
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.children}>{children}</ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  children: {
    padding: 16,
    flexGrow: 1,
  },
});

export default LayoutForPrimary;
