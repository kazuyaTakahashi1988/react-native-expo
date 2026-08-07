import type {
  TypeOthersStackList,
  TypeRootList,
} from '../../../lib/types/typeNavigation';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/* -----------------------------------------------
 * 画面固有のタイプ
 * ----------------------------------------------- */

export type TypeInformationScreen = CompositeScreenProps<
  NativeStackScreenProps<TypeOthersStackList, 'information'>,
  NativeStackScreenProps<TypeRootList>
>;
