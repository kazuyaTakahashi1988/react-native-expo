import { useRef } from 'react';
import { Animated as RNAnimated } from 'react-native';

type SharedValueImpl<T> = {
  value: T;
};

const clamp = (value: number, min: number, max: number) => {
  if (min === max) {
    return max;
  }
  return Math.min(Math.max(value, min), max);
};

const lerp = (value: number, start: number, end: number) => start + value * (end - start);

const hexToRgb = (hex: string) => {
  let normalized = hex.replace('#', '');
  if (normalized.length === 3) {
    normalized = normalized
      .split('')
      .map((char) => char.repeat(2))
      .join('');
  }
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return { r, g, b };
};

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map((component) => component.toString(16).padStart(2, '0'))
    .join('')}`;

export type SharedValue<T> = SharedValueImpl<T>;

export const useSharedValue = <T>(initialValue: T): SharedValue<T> => {
  const ref = useRef<SharedValue<T>>({ value: initialValue });
  return ref.current;
};

export const useAnimatedStyle = <T>(factory: () => T): T => factory();

export const withTiming = <T>(value: T): T => value;

export const interpolate = (
  value: number,
  inputRange: readonly [number, number],
  outputRange: readonly [number, number],
) => {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  if (inputMin === inputMax) {
    return outputMax;
  }
  const progress = (clamp(value, inputMin, inputMax) - inputMin) / (inputMax - inputMin);
  return lerp(progress, outputMin, outputMax);
};

export const interpolateColor = (
  value: number,
  inputRange: readonly [number, number],
  outputRange: readonly [string, string],
) => {
  const [inputMin, inputMax] = inputRange;
  const clampedValue = clamp(value, inputMin, inputMax);
  const progress = inputMin === inputMax ? 1 : (clampedValue - inputMin) / (inputMax - inputMin);
  const start = hexToRgb(outputRange[0]);
  const end = hexToRgb(outputRange[1]);
  const r = Math.round(lerp(progress, start.r, end.r));
  const g = Math.round(lerp(progress, start.g, end.g));
  const b = Math.round(lerp(progress, start.b, end.b));
  return rgbToHex(r, g, b);
};

const Animated = RNAnimated;

export { Animated };

export default Animated;
