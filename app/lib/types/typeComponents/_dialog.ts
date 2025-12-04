import type { ReactNode } from 'react';

export type TypeDialog = {
  visible: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  children?: ReactNode;
  hideCancelButton?: boolean;
};
