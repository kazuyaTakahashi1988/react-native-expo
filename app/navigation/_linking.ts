import * as Linking from 'expo-linking';

import type {
  LinkingOptions,
  NavigatorScreenParams,
  ParamListBase,
  PathConfig,
} from '@react-navigation/native';

/* -----------------------------------------------
 * ディープリンク設定
 * ----------------------------------------------- */

const linking: LinkingOptions<{
  main: NavigatorScreenParams<ParamListBase>;
  others: NavigatorScreenParams<ParamListBase>;
}> = {
  prefixes: [Linking.createURL('/')],
  config: {
    initialRouteName: 'main',
    screens: {
      main: {
        screens: {
          home: {
            path: 'home',
            screens: {
              homeNest: {
                screens: {
                  child00: '',
                  child01: 'child01',
                  child02: 'child02',
                },
              },
            },
          },
          about: 'about',
          work: 'work',
        },
      } as PathConfig<ParamListBase>,
      others: {
        screens: {
          auth: 'auth',
          information: 'information',
        },
      } as PathConfig<ParamListBase>,
    },
  },
};

export default linking;
