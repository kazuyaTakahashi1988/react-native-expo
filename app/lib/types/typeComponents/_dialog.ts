import type { ReactNode } from 'react';

export type TypeDialog = {
  visible: boolean;
  zIndex?: number;
  title?: string;
  eventText?: string | React.ReactNode;
  closeText?: string | React.ReactNode;
  notBackGroundPress?: boolean;
  onEvent?: () => void;
  onClose?: () => void;
  children?: ReactNode;
};

export type TypeDialogOptions = Omit<TypeDialog, 'visible'> & {
  dialogId?: string;
};

export type TypeDialogState = TypeDialogOptions & {
  dialogId: string;
  visible: boolean;
};

export type TypeDialogSubscribe = TypeDialogOptions & { visible: boolean };
