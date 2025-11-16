import { useEffect, useMemo, useReducer, useRef } from 'react';
import { Animated as RNAnimated } from 'react-native';

import type { DependencyList } from 'react';

type Listener = () => void;

type FrameHandle = number | ReturnType<typeof setTimeout>;

type TimingAnimation<T> = {
  __mockAnimationType: 'timing';
  toValue: T;
  duration: number;
  easing?: (value: number) => number;
  callback?: (finished: boolean) => void;
};

type WithTimingConfig = {
  duration?: number;
  easing?: (value: number) => number;
};

class SharedValueImpl<T> {
  private static counter = 0;

  public readonly id = SharedValueImpl.counter++;

  private internalValue: T;

  private listeners = new Set<Listener>();

  private animationHandle?: FrameHandle;

  constructor(initialValue: T) {
    this.internalValue = initialValue;
  }

  get value(): T {
    if (activeCollector) {
      activeCollector.add(this);
    }
    return this.internalValue;
  }

  set value(nextValue: T | TimingAnimation<T>) {
    if (isTimingAnimation(nextValue)) {
      this.startTiming(nextValue);
      return;
    }
    this.stopAnimation();
    if (Object.is(nextValue, this.internalValue)) {
      return;
    }
    this.internalValue = nextValue;
    this.emit();
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }

  private stopAnimation() {
    if (this.animationHandle == null) {
      return;
    }
    cancelFrame(Number(this.animationHandle));
    this.animationHandle = undefined;
  }

  private startTiming(animation: TimingAnimation<T>) {
    this.stopAnimation();
    const fromValue = this.internalValue;
    if (typeof animation.toValue !== 'number' || typeof fromValue !== 'number') {
      this.value = animation.toValue;
      animation.callback?.(true);
      return;
    }
    const duration = animation.duration;
    const easing = animation.easing ?? ((value: number) => value);
    const startTime = now();

    const tick: FrameRequestCallback = (time) => {
      const elapsed = time - startTime;
      const progress = duration === 0 ? 1 : clamp(elapsed / duration, 0, 1);
      const eased = clamp(easing(progress), 0, 1);
      const nextValue = lerp(eased, fromValue, Number(animation.toValue));
      this.internalValue = nextValue as unknown as T;
      this.emit();
      if (progress < 1) {
        this.animationHandle = requestFrame(tick);
        return;
      }
      this.animationHandle = undefined;
      animation.callback?.(true);
    };

    this.animationHandle = requestFrame(tick);
  }
}

type CollectableSharedValue = SharedValueImpl<unknown>;

type FrameRequestCallback = (time: number) => void;

const EMPTY_DEPS: DependencyList = [];

const requestFrame: (callback: FrameRequestCallback) => FrameHandle =
  typeof globalThis.requestAnimationFrame === 'function'
    ? globalThis.requestAnimationFrame.bind(globalThis)
    : (callback: FrameRequestCallback) => {
        return setTimeout(() => {
          callback(now());
        }, 16);
      };

const cancelFrame: (handle: number) => void =
  typeof globalThis.cancelAnimationFrame === 'function'
    ? globalThis.cancelAnimationFrame.bind(globalThis)
    : (handle: FrameHandle) => {
        clearTimeout(handle as ReturnType<typeof setTimeout>);
      };

const clamp = (value: number, min: number, max: number) => {
  if (min === max) {
    return max;
  }
  return Math.min(Math.max(value, min), max);
};

const lerp = (value: number, start: number, end: number) => start + value * (end - start);

const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

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
  `#${[r, g, b].map((component) => component.toString(16).padStart(2, '0')).join('')}`;

export type SharedValue<T> = { value: T };

const isTimingAnimation = <T>(value: unknown): value is TimingAnimation<T> => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  return (value as { __mockAnimationType?: unknown }).__mockAnimationType === 'timing';
};

export const useSharedValue = <T>(initialValue: T): SharedValue<T> => {
  const ref = useRef<SharedValueImpl<T> | null>(null);
  if (ref.current == null) {
    ref.current = new SharedValueImpl<T>(initialValue);
  }
  return ref.current as SharedValue<T>;
};

let activeCollector: Set<CollectableSharedValue> | null = null;

const collectSharedDependencies = <T>(factory: () => T) => {
  const previousCollector = activeCollector;
  const collector = new Set<CollectableSharedValue>();
  activeCollector = collector;
  const computed = factory();
  activeCollector = previousCollector;
  const deps = Array.from(collector);
  const key = deps.map((dep) => dep.id).join(',');
  return { computed, deps, key };
};

export const useAnimatedStyle = <T>(factory: () => T, deps?: DependencyList): T => {
  const [tick, forceTick] = useReducer((count) => count + 1, 0);
  const resolvedDeps = deps ?? EMPTY_DEPS;
  const collection = useMemo(() => {
    if (resolvedDeps.length > 0 && tick < 0) {
      return collectSharedDependencies(factory);
    }
    return collectSharedDependencies(factory);
  }, [factory, resolvedDeps, tick]);

  useEffect(() => {
    if (collection.deps.length === 0) {
      return undefined;
    }
    const unsubscribers = collection.deps.map((shared) => {
      return shared.subscribe(() => {
        forceTick();
      });
    });
    return () => {
      unsubscribers.forEach((unsubscribe) => {
        unsubscribe();
      });
    };
  }, [collection.deps, collection.key, factory]);

  return collection.computed;
};

export const withTiming = <T>(
  toValue: T,
  config: WithTimingConfig = {},
  callback?: (finished: boolean) => void,
): T =>
  ({
    __mockAnimationType: 'timing',
    toValue,
    duration: config.duration ?? 300,
    easing: config.easing,
    callback,
  }) as TimingAnimation<T> as unknown as T;

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
