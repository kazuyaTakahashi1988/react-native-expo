import * as ExpoLinking from 'expo-linking';

import type { TypeRootList } from '../lib/types/typeNavigation';
import type { LinkingOptions } from '@react-navigation/native';

/* -----------------------------------------------
 * ディープリンク設定
 * ----------------------------------------------- */

const Linking: LinkingOptions<TypeRootList> = {
  prefixes: [ExpoLinking.createURL('/')],
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
          about: {
            path: 'about',
            screens: {
              aboutNest: {
                screens: {
                  child00: '',
                  child01: 'child01',
                  child02: 'child02',
                },
              },
            },
          },
          work: 'work',
        },
      },
      others: {
        screens: {
          auth: 'auth',
          information: 'information',
        },
      },
    },
  },
};

export default Linking;
