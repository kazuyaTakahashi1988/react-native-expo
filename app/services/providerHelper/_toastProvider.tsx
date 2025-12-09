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

  React.useEffect(() => {
    const unsubscribe = subscribeToast((options: TypeToastSubscribe) => {
      setToastState((prev) => ({
        ...prev,
        ...options,
      }));
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {children}
      <Toast
        {...toastState}
        onHide={() => {
          setToastState((prev) => ({ ...prev, visible: false }));
        }}
      />
    </>
  );
};

export default ToastProvider;
