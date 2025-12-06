import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { color } from '../../lib/mixin';

import type { TypeToast } from '../../lib/types/typeComponents';
import type { ViewStyle } from 'react-native';

/* -----------------------------------------------
 * Toast 各パーツ & 関数
 * ----------------------------------------------- */

/*
 * 補助コンポーネント：メッセージ表示
 */
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

/*
 * カスタムフック：表示状態 & アニメーション制御
 */
const animationDuration = 250;
const useToastController = ({
  visible,
  duration = 2000,
  onHide,
  onShow,
  position = 'bottom',
}: Pick<TypeToast, 'visible' | 'duration' | 'onHide' | 'onShow' | 'position'>) => {
  const opacity = useSharedValue(0);
  const [mounted, setMounted] = React.useState(visible);

  const onHideRef = React.useRef(onHide);
  const onShowRef = React.useRef(onShow);

  React.useEffect(() => {
    onHideRef.current = onHide;
  }, [onHide]);

  React.useEffect(() => {
    onShowRef.current = onShow;
  }, [onShow]);

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (visible) {
      setMounted(true);
      onShowRef.current?.();

      opacity.value = withTiming(1, {
        duration: animationDuration,
      });

      timer = setTimeout(() => {
        onHideRef.current?.();
      }, duration);
    } else if (mounted) {
      opacity.value = withTiming(0, {
        duration: animationDuration,
      });

      timer = setTimeout(() => {
        setMounted(false);
      }, animationDuration);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [duration, mounted, opacity, visible]);

  const startOffset = React.useMemo(() => getStartOffset(position), [position]);

  const animatedStyle = useAnimatedStyle(() => {
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
 * Toast（親コンポーネント）
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
    <View pointerEvents='none' style={[StyleSheet.absoluteFillObject, styles.container]}>
      <View style={[styles.positionBase, getPositionStyle(position)]}>
        <Animated.View style={[styles.toast, getVariantStyle(variant), animatedStyle]}>
          <ToastMessage message={message} />
        </Animated.View>
      </View>
    </View>
  );
};

// position 用スタイル
const getPositionStyle = (position: NonNullable<TypeToast['position']> = 'bottom') => {
  const positionStyle = {
    top: styles.top,
    center: styles.center,
    bottom: styles.bottom,
  } satisfies Record<NonNullable<TypeToast['position']>, ViewStyle>;

  return positionStyle[position];
};

// variant 用スタイル
const getVariantStyle = (variant: NonNullable<TypeToast['variant']> = 'default') => {
  const variantStyle = {
    default: undefined,
    success: styles.success,
    error: styles.error,
  } satisfies Record<NonNullable<TypeToast['variant']>, ViewStyle | undefined>;

  return variantStyle[variant] ?? null;
};

// position に応じた開始オフセットスタイル
const getStartOffset = (position: NonNullable<TypeToast['position']> = 'bottom'): number => {
  const startOffset = {
    top: -6,
    center: 0,
    bottom: 6,
  } satisfies Record<NonNullable<TypeToast['position']>, number>;

  return startOffset[position];
};

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
  },
  positionBase: {
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
