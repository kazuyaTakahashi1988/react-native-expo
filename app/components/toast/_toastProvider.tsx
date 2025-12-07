import React from 'react';

import Toast from './_toast';
import { subscribeToast } from './_toastService';

import type { TypeToastState, TypeToastSubscribe } from '../../lib/types/typeComponents';

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
