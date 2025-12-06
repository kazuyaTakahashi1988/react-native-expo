import React from 'react';

import Toast from './_toast';
import { subscribeToast } from './_toastService';

import type { TypeToast, TypeToastUpdate } from '../../lib/types/typeComponents';

type ToastState = Pick<TypeToast, 'message' | 'position' | 'variant' | 'duration'> & {
  visible: boolean;
};

const defaultToastState: ToastState = {
  visible: false,
  message: '',
  position: 'top',
  variant: 'default',
  duration: 2000,
};

const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [toastState, setToastState] = React.useState<ToastState>(defaultToastState);

  React.useEffect(() => {
    const unsubscribe = subscribeToast((options: TypeToastUpdate) => {
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
