import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { color } from '../../lib/mixin';

import type { TypeDialog } from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * ダイアログ
 * ----------------------------------------------- */
const DialogTitle = ({ title }: Pick<TypeDialog, 'title'>) => {
  const hasTitle = typeof title === 'string' && title.length > 0;

  if (!hasTitle) return null;

  return <Text style={styles.title}>{title}</Text>;
};

const DialogDescription = ({ description }: Pick<TypeDialog, 'description'>) => {
  const hasDescription = typeof description === 'string' && description.length > 0;

  if (!hasDescription) return null;

  return <Text style={styles.description}>{description}</Text>;
};

const DialogContent = ({ children }: Pick<TypeDialog, 'children'>) => {
  if (children === null || children === undefined) return null;

  return <View style={styles.content}>{children}</View>;
};

const DialogCancelButton = ({
  closeText,
  onClose,
}: { closeText: string; onClose?: TypeDialog['onClose'] }) => {
  if (!onClose) return null;

  return (
    <Pressable accessibilityRole='button' onPress={onClose} style={[styles.button, styles.outlineButton]}>
      <Text style={[styles.buttonText, styles.outlineButtonText]}>{closeText}</Text>
    </Pressable>
  );
};

const Dialog = ({
  visible,
  title,
  description,
  eventText = 'OK',
  closeText = 'キャンセル',
  onEvent,
  onClose,
  children,
}: TypeDialog) => {
  const opacity = useDialogOpacity(visible);
  const showCloseButton = Boolean(closeText) && Boolean(onClose);
  const showEventButton = Boolean(eventText);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        scale: interpolate(opacity.value, [0, 1], [0.96, 1]),
      },
    ],
  }));

    return (
      <Modal animationType='none' onRequestClose={onClose} transparent visible={visible}>
        <View style={styles.container}>
          <Pressable accessibilityLabel='閉じる' onPress={onClose} style={styles.backdropPressable}>
            <Animated.View style={[styles.backdrop, overlayStyle]} />
          </Pressable>
          <View style={styles.center}>
            <Animated.View style={[styles.card, cardStyle]}>
              <DialogTitle title={title} />
              <DialogDescription description={description} />
              <DialogContent>{children}</DialogContent>
              <DialogActions
                closeText={closeText}
                eventText={eventText}
                onClose={onClose}
                onEvent={onEvent}
                showCloseButton={showCloseButton}
                showEventButton={showEventButton}
              />
            </Animated.View>
          </View>
        </View>
      </Modal>
    );
  };

const DialogActions = ({
  closeText,
  eventText,
  onClose,
  onEvent,
  showCloseButton,
  showEventButton,
}: {
  closeText: string;
  eventText: string;
  onClose?: TypeDialog['onClose'];
  onEvent: TypeDialog['onEvent'];
  showCloseButton: boolean;
  showEventButton: boolean;
}) => (
  <View style={styles.actions}>
    {showCloseButton ? <DialogCancelButton closeText={closeText} onClose={onClose} /> : null}
    {showEventButton ? (
      <Pressable accessibilityRole='button' onPress={onEvent} style={[styles.button, styles.fillButton]}>
        <Text style={[styles.buttonText, styles.fillButtonText]}>{eventText}</Text>
      </Pressable>
    ) : null}
  </View>
);

const useDialogOpacity = (visible: boolean) => {
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    opacity.value = visible ? withTiming(1, { duration: 250 }) : 0;
  }, [opacity, visible]);

  return opacity;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: color.backdrop,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: color.white,
    borderRadius: 16,
    elevation: 10,
    gap: 16,
    maxWidth: 420,
    padding: 20,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    width: '100%',
  },
  title: {
    color: color.black,
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    color: color.gray50,
    fontSize: 14,
    lineHeight: 20,
  },
  content: {
    gap: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  button: {
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    minWidth: 120,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  outlineButton: {
    backgroundColor: color.white,
    borderColor: color.gray100,
    borderWidth: 1,
  },
  outlineButtonText: {
    color: color.gray50,
    fontWeight: '600',
  },
  fillButton: {
    backgroundColor: color.primary,
  },
  fillButtonText: {
    color: color.white,
    fontWeight: '700',
  },
  buttonText: {
    fontSize: 14,
  },
});

export default Dialog;
