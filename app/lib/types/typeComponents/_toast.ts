import type React from 'react';

export type TypeToast = {
  visible: boolean;
  message?: string | React.ReactNode;
  duration?: number;
  position?: 'top' | 'center' | 'bottom';
  variant?: 'default' | 'success' | 'error';
  onHide?: () => void;
  onShow?: () => void;
};
