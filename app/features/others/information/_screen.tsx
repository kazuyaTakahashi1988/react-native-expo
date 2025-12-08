import { Linking, StyleSheet, Text } from 'react-native';

import { Button } from '../../../components/button';
import { Layout } from '../../../components/layouts/layout';

import type { TypeInformationScreen } from './_type';

/* -----------------------------------------------
 * Information 画面
 * ----------------------------------------------- */

const InformationScreen: React.FC<TypeInformationScreen> = (props) => {
  const { navigation } = props;

  return (
    <Layout>
      <Text style={styles.title}>Information Screen</Text>
      <Button
        containerStyle={styles.buttonSpacing}
        onPress={() => {
          void Linking.openURL('https://github.com/kazuyaTakahashi1988/react-native-expo');
        }}
        title='Go to GitHub Repository'
      />
      <Button
        containerStyle={styles.buttonSpacing}
        onPress={() => {
          void Linking.openURL(
            'https://storybook-for-expo.empty-service.com/?path=/docs/configure-your-project--docs',
          );
        }}
        title='Go to Storybook'
      />
      <Button
        onPress={() => {
          navigation.navigate('main', { screen: 'about' });
        }}
        title='Go to About'
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonSpacing: {
    marginBottom: 12,
  },
});

export default InformationScreen;
