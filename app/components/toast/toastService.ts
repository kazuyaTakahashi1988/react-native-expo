import type { TypeToast } from '../../lib/types/typeComponents';

export type ToastOptions = Pick<TypeToast, 'message' | 'position' | 'variant' | 'duration'>;
export type ToastUpdate = Partial<ToastOptions> & { visible: boolean };

const subscribers = new Set<(options: ToastUpdate) => void>();

export const subscribeToast = (subscriber: (options: ToastUpdate) => void) => {
  subscribers.add(subscriber);
  return () => {
    subscribers.delete(subscriber);
  };
};

export const showToast = (options: ToastOptions) => {
  subscribers.forEach((subscriber) => subscriber({ ...options, visible: true }));
};

export const hideToast = () => {
  subscribers.forEach((subscriber) => subscriber({ visible: false }));
};
