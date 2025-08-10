import React from 'react';
import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from '../../../lib/types';

const IconBtNav04: React.FC<SvgProps> = ({ color = '#000', size = 24 }) => (
  <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
    <Path
      d='M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z'
      fill={color}
    ></Path>
  </Svg>
);

export default IconBtNav04;
