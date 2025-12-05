import type { ReactNode } from 'react';

export type TypeDialog = {
  visible: boolean;
  title?: string;
  eventText?: string;
  closeText?: string;
  closeOnBackGround?: boolean;
  onEvent?: () => void;
  onClose?: () => void;
  children?: ReactNode;
};
