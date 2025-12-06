import React from 'react';

import Toast from './_toast';
import { subscribeToast } from './toastService';

import type { ToastUpdate } from './toastService';
import type { TypeToast } from '../../lib/types/typeComponents';

type ToastState = Pick<TypeToast, 'message' | 'position' | 'variant' | 'duration'> & { visible: boolean };

const defaultToastState: ToastState = {
  visible: false,
  message: '',
  position: 'bottom',
  variant: 'default',
  duration: 2000,
};

const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [toastState, setToastState] = React.useState<ToastState>(defaultToastState);

  React.useEffect(() => {
    const unsubscribe = subscribeToast((options: ToastUpdate) => {
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
