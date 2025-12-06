import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { color } from '../../lib/mixin';

import type { TypeToast } from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * Toast（RootToast ライク）
 * ----------------------------------------------- */

const animationDuration = 250;

/* -----------------------------------------------
 * 補助コンポーネント：メッセージ表示
 * ----------------------------------------------- */

const ToastMessage = ({ message }: Pick<TypeToast, 'message'>) => {
  const isMessage = Boolean(message);
  if (!isMessage) {
    return null;
  }

  if (typeof message === 'string') {
    return <Text style={styles.toastText}>{message}</Text>;
  }

  return <View>{message}</View>;
};

/* -----------------------------------------------
 * 補助関数：位置ごとの開始オフセット
 * （ネスト三項演算子を排除）
 * ----------------------------------------------- */

const getStartOffset = (position: TypeToast['position'] = 'bottom'): number => {
  switch (position) {
    case 'top':
      return -6;
    case 'center':
      return 0;
    case 'bottom':
    default:
      return 6;
  }
};

/* -----------------------------------------------
 * 補助関数：position 用スタイル
 * ----------------------------------------------- */

const getPositionStyle = (position: TypeToast['position'] = 'bottom') => {
  switch (position) {
    case 'top':
      return styles.top;
    case 'center':
      return styles.center;
    case 'bottom':
    default:
      return styles.bottom;
  }
};

/* -----------------------------------------------
 * 補助関数：variant 用スタイル
 * ----------------------------------------------- */

const getVariantStyle = (variant: TypeToast['variant'] = 'default') => {
  switch (variant) {
    case 'success':
      return styles.success;
    case 'error':
      return styles.error;
    case 'default':
    default:
      return null;
  }
};

/* -----------------------------------------------
 * カスタムフック：表示状態 & アニメーション制御
 * ----------------------------------------------- */

type UseToastControllerProps = Pick<
  TypeToast,
  'visible' | 'duration' | 'onHide' | 'onShow' | 'position'
>;

const useToastController = ({
  visible,
  duration = 2000,
  onHide,
  onShow,
  position = 'bottom',
}: UseToastControllerProps) => {
  const opacity = useSharedValue(0);
  const [mounted, setMounted] = React.useState(visible);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (visible) {
      setMounted(true);
      onShow?.();
      opacity.value = withTiming(1, { duration: animationDuration });

      timer = setTimeout(() => {
        onHide?.();
      }, duration);
    } else {
      opacity.value = withTiming(0, { duration: animationDuration });

      timer = setTimeout(() => {
        setMounted(false);
      }, animationDuration);
    }

    return () => {
      const isTimer = Boolean(timer);
      if (isTimer) {
        clearTimeout(timer);
      }
    };
  }, [duration, onHide, onShow, opacity, visible]);

  const animatedStyle = useAnimatedStyle(() => {
    const startOffset = getStartOffset(position);

    return {
      opacity: opacity.value,
      transform: [
        {
          translateY: interpolate(opacity.value, [0, 1], [startOffset, 0]),
        },
      ],
    };
  });

  return { mounted, animatedStyle };
};

/* -----------------------------------------------
 * Toast 本体
 * ----------------------------------------------- */

const Toast = ({
  visible,
  message,
  duration = 2000,
  position = 'bottom',
  onHide,
  onShow,
  variant = 'default',
}: TypeToast) => {
  const { mounted, animatedStyle } = useToastController({
    visible,
    duration,
    onHide,
    onShow,
    position,
  });

  if (!mounted) {
    return null;
  }

  return (
    <Modal transparent statusBarTranslucent visible>
      <View
        pointerEvents='box-none'
        style={[StyleSheet.absoluteFillObject, styles.container]}
      >
        <View pointerEvents='box-none' style={[styles.position, getPositionStyle(position)]}>
          <Animated.View style={[styles.toast, getVariantStyle(variant), animatedStyle]}>
            <ToastMessage message={message} />
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
  },
  position: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  top: {
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 64,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 64,
    paddingHorizontal: 16,
  },
  toast: {
    backgroundColor: color.backdrop,
    borderRadius: 12,
    elevation: 6,
    maxWidth: 320,
    minWidth: 200,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  success: {
    backgroundColor: color.green,
  },
  error: {
    backgroundColor: color.red,
  },
  toastText: {
    color: color.white,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Toast;
