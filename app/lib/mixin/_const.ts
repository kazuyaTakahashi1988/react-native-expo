import { useSafeAreaInsets } from 'react-native-safe-area-context';

/* -----------------------------------------------
 * セーフエリアインセット
 * （デバイス固有の top, bottom, left, right 値）
 * ----------------------------------------------- */

export const useSafeAreaConst = () => {
  const { top, bottom, left, right } = useSafeAreaInsets();

  return {
    safeAreaTop: top,
    safeAreaBottom: bottom,
    safeAreaLeft: left,
    safeAreaRight: right,
  } as const;
};
