import type { ReactNode } from 'react';

export type TypeDialog = {
  visible: boolean;
  title?: string;
  eventText?: string | React.ReactNode;
  closeText?: string | React.ReactNode;
  closeOnBackGround?: boolean;
  onEvent?: () => void;
  onClose?: () => void;
  children?: ReactNode;
};
