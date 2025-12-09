import type { TypeToastOptions, TypeToastSubscribe } from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * Toastを使用する際の関数
 * ----------------------------------------------- */

const subscribers = new Set<(options: TypeToastSubscribe) => void>();

// Toastプロバイダー用
export const subscribeToast = (subscriber: (options: TypeToastSubscribe) => void) => {
  subscribers.add(subscriber);
  return () => {
    subscribers.delete(subscriber);
  };
};

// Toastを表示する関数
export const showToast = (options: TypeToastOptions) => {
  subscribers.forEach((subscriber) => {
    subscriber({ ...options, visible: true });
  });
};

// Toastを非表示にする関数
export const hideToast = () => {
  subscribers.forEach((subscriber) => {
    subscriber({ visible: false });
  });
};
