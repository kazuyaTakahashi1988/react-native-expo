import type { TypeToastOptions, TypeToastUpdate } from '../../lib/types/typeComponents';

const subscribers = new Set<(options: TypeToastUpdate) => void>();

export const subscribeToast = (subscriber: (options: TypeToastUpdate) => void) => {
  subscribers.add(subscriber);
  return () => {
    subscribers.delete(subscriber);
  };
};

export const showToast = (options: TypeToastOptions) => {
  subscribers.forEach((subscriber) => {
    subscriber({ ...options, visible: true });
  });
};

export const hideToast = () => {
  subscribers.forEach((subscriber) => {
    subscriber({ visible: false });
  });
};
