import type { TypeRootList } from '../../../lib/types/typeNavigation';
import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

export type TypeAboutScreen = MaterialTopTabScreenProps<TypeRootList>;
export type TypeDialogPattern =
  | 'basic'
  | 'withoutClose'
  | 'withoutEventAndClose'
  | 'customContent'
  | null;
