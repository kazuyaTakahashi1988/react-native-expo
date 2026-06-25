import React from 'react';

import Toast from './_toast';
import { subscribeToast } from './_useToast';

import type { TypeToastState, TypeToastSubscribe } from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * Toast用 プロバイダー
 * ----------------------------------------------- */

const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const hideAnimationDuration = 250;
  const [toastStates, setToastStates] = React.useState<Array<TypeToastState & { id: number }>>([]);
  const toastIdRef = React.useRef(0);

  /*
   * すべてのトーストを非表示にする関数。
   * - setToastStates を使用して、すべてのトーストの visible プロパティを false に更新する。
   */
  const hideAllToasts = React.useCallback(() => {
    setToastStates((prev) => prev.map((toast) => ({ ...toast, visible: false })));
  }, []);

  /*
   * 新しいトーストを状態に追加するための関数。
   * - options: トーストのメッセージ、位置、バリアント、表示時間などのプロパティを含むオプションオブジェクト。
   * - toastIdRef を使用して一意のトーストIDを生成し、次のトーストオブジェクトを作成する。
   * - setToastStates を使用して、次のトーストオブジェクトを既存のトースト状態に追加する。
   */
  const addToast = React.useCallback((options: TypeToastSubscribe) => {
    toastIdRef.current += 1;
    const nextToast: TypeToastState & { id: number } = {
      id: toastIdRef.current,
      visible: true,
      message: options.message ?? '',
      position: options.position ?? 'top',
      variant: options.variant ?? 'default',
      duration: options.duration ?? 2000,
    };

    setToastStates((prev) => [...prev, nextToast]);
  }, []);

  /*
   * 購読イベントのコールバック関数。トーストの表示状態に応じて、トーストを追加または非表示にする。
   * - options.visible が true の場合は、新しいトーストを追加するために addToast を呼び出す。
   * - options.visible が false の場合は、既存のトーストをすべて非表示にするために hideAllToasts を呼び出す。
   */
  const handleToastSubscription = React.useCallback(
    (options: TypeToastSubscribe) => {
      if (options.visible) {
        addToast(options);
        return;
      }

      hideAllToasts();
    },
    [addToast, hideAllToasts],
  );

  /*
   * 特定のトーストを状態から削除するための関数。
   * - toastId: 削除するトーストの一意の識別子。
   * - setToastStates を使用して、指定された toastId を持つトーストを状態からフィルタリングして削除する。
   */
  const removeToastById = React.useCallback((toastId: number) => {
    setToastStates((prev) => prev.filter((toast) => toast.id !== toastId));
  }, []);

  /*
   * 特定のトーストを非表示にするための関数。
   * - toastId: 非表示にするトーストの一意の識別子。
   * - setToastStates を使用して、指定された toastId を持つトーストの visible プロパティを false に更新する。
   * - setTimeout を使用して、hideAnimationDuration 後に removeToastById を呼び出し、非表示アニメーションが完了した後にトーストを状態から削除する。
   */
  const handleHideToast = React.useCallback(
    (toastId: number) => {
      setToastStates((prev) =>
        prev.map((toast) => (toast.id === toastId ? { ...toast, visible: false } : toast)),
      );

      setTimeout(() => {
        removeToastById(toastId);
      }, hideAnimationDuration);
    },
    [hideAnimationDuration, removeToastById],
  );

  /*
   * コンポーネントのマウント時に subscribeToast を使用してトーストの購読イベントを登録し、handleToastSubscription をコールバック関数として渡す。
   * コンポーネントのアンマウント時には、subscribeToast が返すクリーンアップ関数を呼び出して購読イベントを解除する。
   */
  React.useEffect(() => {
    const unsubscribe = subscribeToast(handleToastSubscription);

    return unsubscribe;
  }, [handleToastSubscription]);

  return (
    <>
      {children}
      {toastStates.map((toastState) => (
        <Toast
          key={toastState.id}
          {...toastState}
          onHide={() => {
            handleHideToast(toastState.id);
          }}
        />
      ))}
    </>
  );
};

export default ToastProvider;
