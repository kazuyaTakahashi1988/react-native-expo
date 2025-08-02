import { StyleSheet, View, Text } from 'react-native';
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
      <View>{children}</View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PrimaryLayout;