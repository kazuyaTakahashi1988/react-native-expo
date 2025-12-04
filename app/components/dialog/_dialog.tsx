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
  cancelText,
  onCancel,
}: { cancelText: string; onCancel?: TypeDialog['onCancel'] }) => {
  if (!onCancel) return null;

  return (
    <Pressable accessibilityRole='button' onPress={onCancel} style={[styles.button, styles.outlineButton]}>
      <Text style={[styles.buttonText, styles.outlineButtonText]}>{cancelText}</Text>
    </Pressable>
  );
};

const Dialog = ({
  visible,
  title,
  description,
  confirmText = 'OK',
  cancelText = 'キャンセル',
  onConfirm,
  onCancel,
  children,
  hideCancelButton = false,
}: TypeDialog) => {
  const opacity = useDialogOpacity(visible);
  const showCancelButton = Boolean(onCancel) && !hideCancelButton;

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
      <Modal animationType='none' onRequestClose={onCancel} transparent visible={visible}>
        <View style={styles.container}>
          <Pressable accessibilityLabel='閉じる' onPress={onCancel} style={styles.backdropPressable}>
            <Animated.View style={[styles.backdrop, overlayStyle]} />
          </Pressable>
          <View style={styles.center}>
            <Animated.View style={[styles.card, cardStyle]}>
              <DialogTitle title={title} />
              <DialogDescription description={description} />
              <DialogContent>{children}</DialogContent>
              <DialogActions
                cancelText={cancelText}
                confirmText={confirmText}
                onCancel={onCancel}
                onConfirm={onConfirm}
                showCancelButton={showCancelButton}
              />
            </Animated.View>
          </View>
        </View>
      </Modal>
    );
  };

const DialogActions = ({
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  showCancelButton,
}: {
  cancelText: string;
  confirmText: string;
  onCancel?: TypeDialog['onCancel'];
  onConfirm: TypeDialog['onConfirm'];
  showCancelButton: boolean;
}) => (
  <View style={styles.actions}>
    {showCancelButton ? <DialogCancelButton cancelText={cancelText} onCancel={onCancel} /> : null}
    <Pressable accessibilityRole='button' onPress={onConfirm} style={[styles.button, styles.fillButton]}>
      <Text style={[styles.buttonText, styles.fillButtonText]}>{confirmText}</Text>
    </Pressable>
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
