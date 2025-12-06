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

/* -----------------------------------------------
 * Toast（RootToast ライク）
 * ----------------------------------------------- */

const animationDuration = 250;

const ToastMessage = ({ message }: Pick<TypeToast, 'message'>) => {
  if (!message) {
    return null;
  }

  if (typeof message === 'string') {
    return <Text style={styles.toastText}>{message}</Text>;
  }

  return message;
};

const Toast = ({
  visible,
  message,
  duration = 2000,
  position = 'bottom',
  onHide,
  onShow,
  variant = 'default',
}: TypeToast) => {
  const opacity = useSharedValue(0);
  const [mounted, setMounted] = React.useState(visible);

  React.useEffect(() => {
    if (visible) {
      setMounted(true);
      onShow?.();
      opacity.value = withTiming(1, { duration: animationDuration });
      const timer = setTimeout(() => {
        onHide?.();
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }

    opacity.value = withTiming(0, { duration: animationDuration });
    const timer = setTimeout(() => {
      setMounted(false);
    }, animationDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onHide, onShow, opacity, visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        translateY: interpolate(
          opacity.value,
          [0, 1],
          [position === 'top' ? -6 : position === 'bottom' ? 6 : 0, 0],
        ),
      },
    ],
  }));

  if (!mounted) {
    return null;
  }

  return (
    <View pointerEvents='box-none' style={[StyleSheet.absoluteFillObject, styles.container]}>
      <View
        pointerEvents='box-none'
        style={[
          styles.position,
          position === 'top' && styles.top,
          position === 'center' && styles.center,
          position === 'bottom' && styles.bottom,
        ]}
      >
        <Animated.View
          style={[
            styles.toast,
            variant === 'success' && styles.success,
            variant === 'error' && styles.error,
            animatedStyle,
          ]}
        >
          <ToastMessage {...{ message }} />
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
    flex: 1,
    width: '100%',
    alignItems: 'center',
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
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
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
