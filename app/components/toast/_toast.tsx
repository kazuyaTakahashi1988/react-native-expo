import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
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
 * 補助関数：position / variant 用スタイルと開始オフセット
 * ----------------------------------------------- */

const toastLookup = {
  position: {
    top: () => styles.top,
    center: () => styles.center,
    bottom: () => styles.bottom,
  } satisfies Record<TypeToast['position'], () => StyleProp<ViewStyle>>,
  variant: {
    default: () => null,
    success: () => styles.success,
    error: () => styles.error,
  } satisfies Record<TypeToast['variant'], () => StyleProp<ViewStyle> | null>,
  startOffset: {
    top: () => -6,
    center: () => 0,
    bottom: () => 6,
  } satisfies Record<TypeToast['position'], () => number>,
};

const getToastStyleConfig = ({
  position = 'bottom',
  variant = 'default',
}: Partial<Pick<TypeToast, 'position' | 'variant'>>) => {
  const getPositionStyle =
    toastLookup.position[position] ?? toastLookup.position.bottom;
  const getStartOffset =
    toastLookup.startOffset[position] ?? toastLookup.startOffset.bottom;
  const getVariantStyle =
    toastLookup.variant[variant] ?? toastLookup.variant.default;

  return {
    positionStyle: getPositionStyle(),
    startOffset: getStartOffset(),
    variantStyle: getVariantStyle(),
  };
};

/* -----------------------------------------------
 * カスタムフック：表示状態 & アニメーション制御（reanimated版）
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

  // position → startOffset は JS 側で計算して数値として渡す
  const startOffset = React.useMemo(
    () => getToastStyleConfig({ position }).startOffset,
    [position],
  );

  const animatedStyle = useAnimatedStyle(() => {
    // ここは worklet（自動で 'worklet' 付く）だが、
    // 参照しているのは primitive な startOffset と shared value だけ。
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

  const { positionStyle, variantStyle } = React.useMemo(
    () => getToastStyleConfig({ position, variant }),
    [position, variant],
  );

  if (!mounted) {
    return null;
  }

  return (
    <View
      // Toast 全体をタップ透過
      pointerEvents='none'
      style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <View style={[styles.position, positionStyle]}>
        <Animated.View style={[styles.toast, variantStyle, animatedStyle]}>
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
