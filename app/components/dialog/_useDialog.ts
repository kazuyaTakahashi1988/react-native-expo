import type { TypeDialogOptions, TypeDialogSubscribe } from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * Dialogを使用する際の関数
 * ----------------------------------------------- */

const subscribers = new Set<(options: TypeDialogSubscribe) => void>();

// Dialogプロバイダー用
export const subscribeDialog = (subscriber: (options: TypeDialogSubscribe) => void) => {
  subscribers.add(subscriber);
  return () => {
    subscribers.delete(subscriber);
  };
};

// Dialogを表示する関数
export const showDialog = (options: TypeDialogOptions) => {
  subscribers.forEach((subscriber) => {
    subscriber({ ...options, visible: true });
  });
};

// Dialogを非表示にする関数
export const hideDialog = (dialogId?: string) => {
  subscribers.forEach((subscriber) => {
    subscriber({ dialogId, visible: false });
  });
};
