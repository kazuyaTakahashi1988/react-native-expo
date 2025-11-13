declare module 'react-native-reanimated' {
  import type { ComponentType } from 'react';
  import type { ViewProps } from 'react-native';

  export type SharedValue<T> = { value: T };

  export function useSharedValue<T>(initialValue: T): SharedValue<T>;

  export function withTiming<T>(
    toValue: T,
    config?: { duration?: number; easing?: (value: number) => number },
  ): T;

  export function useAnimatedStyle<T extends Record<string, unknown>>(
    updater: () => T,
    dependencies?: ReadonlyArray<unknown>,
  ): T;

  export function interpolate(
    value: number,
    inputRange: readonly number[],
    outputRange: readonly number[],
    extrapolate?: 'extend' | 'clamp' | 'identity',
  ): number;

  export function interpolateColor(
    value: number,
    inputRange: readonly number[],
    outputRange: readonly (string | number)[],
  ): string;

  type AnimatedComponent<P> = ComponentType<P>;

  interface AnimatedNamespace {
    View: AnimatedComponent<ViewProps>;
  }

  const Animated: AnimatedNamespace;

  export default Animated;
}
