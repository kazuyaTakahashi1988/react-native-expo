import type { ReactNode } from 'react';

export type TypeDialog = {
  visible: boolean;
  title?: string;
  description?: string;
  eventText?: string;
  closeText?: string;
  onEvent: () => void;
  onClose?: () => void;
  children?: ReactNode;
};
