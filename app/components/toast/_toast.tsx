import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

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
  const opacity = React.useRef(new Animated.Value(0)).current;
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
    let timer: NodeJS.Timeout | undefined;

    if (visible) {
      setMounted(true);
      onShowRef.current?.();
      Animated.timing(opacity, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();

      timer = setTimeout(() => {
        onHideRef.current?.();
      }, duration);
    } else if (mounted) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();

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

  const startOffset = getStartOffset(position);
  const animatedStyle = {
    opacity,
    transform: [
      {
        translateY: opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [startOffset, 0],
        }),
      },
    ],
  };

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
    <View pointerEvents='box-none' style={[StyleSheet.absoluteFillObject, styles.container]}>
      <View pointerEvents='box-none' style={[styles.position, getPositionStyle(position)]}>
        <Animated.View
          pointerEvents='none'
          style={[styles.toast, getVariantStyle(variant), animatedStyle]}
        >
          <ToastMessage message={message} />
        </Animated.View>
      </View>
    </View>
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
