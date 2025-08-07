import { StyleSheet, View, ScrollView } from 'react-native';

import Header from './_header';

// Layout
export type TypeLayout = {
  title?: string;
  children?: React.ReactNode;
};

export const SecondaryLayout: React.FC<TypeLayout> = (props) => {
  const { title, children } = props;
  return (
    <View style={styles.container}>
      <Header title={title} />
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

export default SecondaryLayout;
