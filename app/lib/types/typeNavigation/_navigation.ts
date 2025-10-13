import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type TypeRootList = Record<string, undefined | { [key: string]: string | object }>;

export type TypeNavigation = NativeStackNavigationProp<TypeRootList>;
