import type { NavigatorScreenParams } from '@react-navigation/native';

/** Home 配下の Top Tab */
export type TypeHomeTabList = {
  child00: undefined;
  child01: undefined;
  child02: undefined;
};

export type TypeHomeStackList = {
  homeNest: NavigatorScreenParams<TypeHomeTabList> | undefined;
};

/** About 配下の Top Tab */
export type TypeAboutTabList = {
  child00: undefined;
  child01: undefined;
  child02: undefined;
};

export type TypeAboutStackList = {
  aboutNest: NavigatorScreenParams<TypeAboutTabList> | undefined;
};

/** メイン画面の Bottom Tab */
export type TypeMainTabList = {
  home: NavigatorScreenParams<TypeHomeStackList> | undefined;
  about: NavigatorScreenParams<TypeAboutStackList> | undefined;
  work: undefined;
};

/** その他画面の Stack */
export type TypeOthersStackList = {
  auth: undefined;
  information: undefined;
};

/** アプリ最上位の Stack */
export type TypeRootList = {
  main: NavigatorScreenParams<TypeMainTabList> | undefined;
  others: NavigatorScreenParams<TypeOthersStackList> | undefined;
};
