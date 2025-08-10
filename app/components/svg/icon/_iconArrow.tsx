import React from 'react';
import Svg, { G, Polygon } from 'react-native-svg';

import type { SvgProps } from '../../../lib/types';

const IconArrow: React.FC<SvgProps> = ({ color = '#000', size = 24 }) => (
  <Svg width={size} height={size} viewBox='0 0 512 512' fill='none'>
    <G>
      <Polygon
        points='419.916,71.821 348.084,0 92.084,256.005 348.084,512 419.916,440.178 235.742,256.005 '
        fill={color}
      ></Polygon>
    </G>
  </Svg>
);

export default IconArrow;
