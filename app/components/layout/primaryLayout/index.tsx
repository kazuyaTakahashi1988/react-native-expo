import { StyleSheet, View, ScrollView } from 'react-native';
import Header from './_header';
import Footer from './_footer';

// Layout
export type TypeLayout = {
  children?: React.ReactNode;
};

export const PrimaryLayout: React.FC<TypeLayout> = (props) => {
  const { children } = props;
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.children}>{children}</ScrollView>
      <Footer />
    </View>
  );
}

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

export default PrimaryLayout;
