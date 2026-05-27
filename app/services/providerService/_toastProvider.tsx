import React from 'react';

import { subscribeToast, Toast } from '../../components/toast';

import type { TypeToastState, TypeToastSubscribe } from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * Toast用 プロバイダー
 * ----------------------------------------------- */

const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const hideAnimationDuration = 250;
  const [toastStates, setToastStates] = React.useState<Array<TypeToastState & { id: number }>>([]);
  const toastIdRef = React.useRef(0);

  const hideAllToasts = React.useCallback(() => {
    setToastStates((prev) => prev.map((toast) => ({ ...toast, visible: false })));
  }, []);

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

  const removeToastById = React.useCallback((toastId: number) => {
    setToastStates((prev) => prev.filter((toast) => toast.id !== toastId));
  }, []);

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
