import Svg, { G, Polygon } from 'react-native-svg';

import { color as mixinColor } from '../../../lib/mixin';

import type { TypeIcon } from '../../../lib/types/typeComponents';
import type React from 'react';

const IconArrow: React.FC<TypeIcon> = ({ color = mixinColor.black, size = 24 }) => (
  <Svg fill='none' height={size} viewBox='0 0 512 512' width={size}>
    <G>
      <Polygon
        fill={color}
        points='419.916,71.821 348.084,0 92.084,256.005 348.084,512 419.916,440.178 235.742,256.005 '
      ></Polygon>
    </G>
  </Svg>
);

export default IconArrow;
