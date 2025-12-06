import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { color } from '../../lib/mixin';
import { Button } from '../button';

import type { TypeDialog } from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * ダイアログ 各パーツ
 * ----------------------------------------------- */

/*
 * 透過背景
 */
const DialogBackGround = ({
  onClose,
  notBackGroundPress,
}: Pick<TypeDialog, 'onClose' | 'notBackGroundPress'>) => {
  if (notBackGroundPress !== false) {
    return null;
  }

  return (
    <Pressable onPress={onClose} style={styles.dialogBackGround}>
      <View style={styles.backGround} />
    </Pressable>
  );
};

/*
 * タイトル
 */
const DialogTitle = ({ title }: Pick<TypeDialog, 'title'>) => {
  const istitle = Boolean(title);
  if (!istitle) {
    return null;
  }

  return (
    <View style={styles.dialogTitle}>
      <Text style={styles.dialogTitleText}>{title}</Text>
    </View>
  );
};

/*
 * チャイルドコンテンツ
 */
const DialogChildren = ({ children }: Pick<TypeDialog, 'children'>) => {
  const ischildren = Boolean(children);
  if (!ischildren) {
    return null;
  }

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.dialogChildren}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
    >
      <View style={styles.children}>{children}</View>
    </ScrollView>
  );
};

/*
 * ボトム（ボタン）
 */
const DialogBottom = ({
  closeText,
  eventText,
  onClose,
  onEvent,
}: Pick<TypeDialog, 'closeText' | 'eventText' | 'onClose' | 'onEvent'>) => {
  const isCloseText = Boolean(closeText);
  const isEventText = Boolean(eventText);
  if (!isCloseText && !isEventText) {
    return null;
  }

  return (
    <View style={styles.dialogBottom}>
      {isCloseText ? <Button onPress={onClose} pattern='secondary' title={closeText} /> : null}
      {isEventText ? <Button onPress={onEvent} title={eventText} /> : null}
    </View>
  );
};

/* -----------------------------------------------
 * ダイアログ（親コンポーネント）
 * ----------------------------------------------- */

const Dialog = ({
  visible,
  title,
  notBackGroundPress = false,
  eventText,
  closeText,
  onEvent,
  onClose,
  children,
}: TypeDialog) => {
  const { height } = useWindowDimensions();

  /*
   * アニメーション設定
   */
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    opacity.value = visible ? withTiming(1, { duration: 250 }) : 0;
  }, [opacity, visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        scale: interpolate(opacity.value, [0, 1], [0.98, 1]),
      },
    ],
  }));

  return (
    <Modal animationType='none' onRequestClose={onClose} transparent visible={visible}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {/*
         * 透過背景
         */}
        <DialogBackGround {...{ notBackGroundPress, onClose }} />
        <View style={styles.dialog}>
          <View style={[styles.dialogCard, { maxHeight: height - 120 }]}>
            {/*
             * タイトル
             */}
            <DialogTitle {...{ title }} />
            {/*
             * チャイルドコンテンツ
             */}
            <DialogChildren {...{ children }} />
            {/*
             * ボトム（ボタン）
             */}
            <DialogBottom {...{ closeText, eventText, onClose, onEvent }} />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: color.backdrop,
    justifyContent: 'center',
    padding: 24,
  },
  dialogBackGround: {
    ...StyleSheet.absoluteFillObject,
  },
  backGround: {
    ...StyleSheet.absoluteFillObject,
  },
  dialog: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  dialogCard: {
    backgroundColor: color.white,
    borderRadius: 16,
    elevation: 10,
    gap: 16,
    overflow: 'hidden',
    padding: 20,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    width: '100%',
  },
  scrollView: {
    flexShrink: 1,
  },
  dialogChildren: {
    gap: 16,
    paddingBottom: 8,
  },
  children: {
    gap: 8,
  },
  dialogTitle: {
    paddingBottom: 4,
    paddingTop: 4,
  },
  dialogTitleText: {
    color: color.black,
    fontSize: 18,
    fontWeight: '600',
  },
  dialogBottom: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
});

export default Dialog;
