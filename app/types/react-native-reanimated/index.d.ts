import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

declare module 'react-native-reanimated' {
  export type SharedValue<T> = { value: T };

  export const interpolate: (
    value: number,
    inputRange: ReadonlyArray<number>,
    outputRange: ReadonlyArray<number>,
    extrapolate?: string,
  ) => number;

  export const interpolateColor: (
    value: number,
    inputRange: ReadonlyArray<number>,
    outputRange: ReadonlyArray<string | number>,
  ) => string | number;

  export function useSharedValue<T>(initialValue: T): SharedValue<T>;

  export function withTiming<T>(
    toValue: T,
    config?: Record<string, unknown>,
  ): T;

  export function useAnimatedStyle<T extends object>(
    updater: () => T,
    deps?: ReadonlyArray<unknown>,
  ): T;

  const Animated: {
    View: ComponentType<ViewProps>;
  };

  export default Animated;
}
