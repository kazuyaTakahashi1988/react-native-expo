import type { TypeToastOptions, TypeToastSubscribe } from '../../lib/types/typeComponents';

const subscribers = new Set<(options: TypeToastSubscribe) => void>();

export const subscribeToast = (subscriber: (options: TypeToastSubscribe) => void) => {
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
