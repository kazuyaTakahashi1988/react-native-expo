import React from 'react';

import { subscribeToast, Toast } from '../../components/toast';

import type { TypeToastState, TypeToastSubscribe } from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * Toast用 プロバイダー
 * ----------------------------------------------- */

const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [toastState, setToastState] = React.useState<TypeToastState>({
    visible: false,
    message: '',
    position: 'top',
    variant: 'default',
    duration: 2000,
  });
  const toastQueueRef = React.useRef<TypeToastSubscribe[]>([]);
  const isVisibleRef = React.useRef(false);

  React.useEffect(() => {
    isVisibleRef.current = toastState.visible;
  }, [toastState.visible]);

  const showNextToast = React.useCallback(() => {
    const next = toastQueueRef.current.shift();
    if (!next) {
      return;
    }

    setToastState((prev) => ({
      ...prev,
      ...next,
      visible: true,
    }));
  }, []);

  React.useEffect(() => {
    const unsubscribe = subscribeToast((options: TypeToastSubscribe) => {
      if (options.visible) {
        toastQueueRef.current.push(options);

        if (!isVisibleRef.current) {
          showNextToast();
        }

        return;
      }

      setToastState((prev) => ({ ...prev, ...options }));
    });

    return unsubscribe;
  }, [showNextToast]);

  return (
    <>
      {children}
      <Toast
        {...toastState}
        onHide={() => {
          setToastState((prev) => ({ ...prev, visible: false }));
          isVisibleRef.current = false;
          showNextToast();
        }}
      />
    </>
  );
};

export default ToastProvider;
