import React from 'react';

import Dialog from './_dialog';
import { subscribeDialog } from './_useDialog';

import type {
  TypeDialogState,
  TypeDialogSubscribe,
} from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * Dialog用 プロバイダー
 * ----------------------------------------------- */

const DialogProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [dialogStates, setDialogStates] = React.useState<TypeDialogState[]>([]);
  const dialogIdRef = React.useRef(0);

  const createDialogId = React.useCallback((dialogId?: string) => {
    if (dialogId !== undefined && dialogId !== '') {
      return dialogId;
    }

    dialogIdRef.current += 1;
    return `dialog-${String(dialogIdRef.current)}`;
  }, []);

  const addDialog = React.useCallback(
    (options: TypeDialogSubscribe) => {
      const nextDialog: TypeDialogState = {
        dialogId: createDialogId(options.dialogId),
        visible: true,
        zIndex: options.zIndex,
        title: options.title,
        eventText: options.eventText,
        closeText: options.closeText,
        notBackGroundPress: options.notBackGroundPress,
        onEvent: options.onEvent,
        onClose: options.onClose,
        children: options.children,
      };

      setDialogStates((prev) => [...prev, nextDialog]);
    },
    [createDialogId],
  );

  const hideDialogs = React.useCallback((dialogId?: string) => {
    setDialogStates((prev) => {
      if (dialogId === undefined || dialogId === '') {
        return [];
      }

      return prev.filter((dialog) => dialog.dialogId !== dialogId);
    });
  }, []);

  const handleDialogSubscription = React.useCallback(
    (options: TypeDialogSubscribe) => {
      if (options.visible) {
        addDialog(options);
        return;
      }

      hideDialogs(options.dialogId);
    },
    [addDialog, hideDialogs],
  );

  const handleCloseDialog = React.useCallback(
    (dialogState: TypeDialogState) => {
      dialogState.onClose?.();
      hideDialogs(dialogState.dialogId);
    },
    [hideDialogs],
  );

  const handleEventDialog = React.useCallback(
    (dialogState: TypeDialogState) => {
      dialogState.onEvent?.();
    },
    [],
  );

  React.useEffect(() => {
    const unsubscribe = subscribeDialog(handleDialogSubscription);

    return unsubscribe;
  }, [handleDialogSubscription]);

  return (
    <>
      {children}
      {dialogStates.map((dialogState) => (
        <Dialog
          key={dialogState.dialogId}
          {...dialogState}
          onClose={() => {
            handleCloseDialog(dialogState);
          }}
          onEvent={() => {
            handleEventDialog(dialogState);
          }}
        />
      ))}
    </>
  );
};

export default DialogProvider;
