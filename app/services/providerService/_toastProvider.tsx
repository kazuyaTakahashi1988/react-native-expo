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

  React.useEffect(() => {
    const unsubscribe = subscribeToast((options: TypeToastSubscribe) => {
      if (options.visible) {
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

        return;
      }

      setToastStates((prev) => prev.map((toast) => ({ ...toast, visible: false })));
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {children}
      {toastStates.map((toastState) => (
        <Toast
          key={toastState.id}
          {...toastState}
          onHide={() => {
            setToastStates((prev) =>
              prev.map((toast) =>
                toast.id === toastState.id ? { ...toast, visible: false } : toast,
              ),
            );

            setTimeout(() => {
              setToastStates((prev) => prev.filter((toast) => toast.id !== toastState.id));
            }, hideAnimationDuration);
          }}
        />
      ))}
    </>
  );
};

export default ToastProvider;
