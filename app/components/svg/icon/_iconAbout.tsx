import React from 'react';
import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from '../../../lib/types';

const IconAbout: React.FC<SvgProps> = ({ color = '#000', size = 24 }) => (
  <Svg width={size} height={size} viewBox='0 0 100 100' fill='none'>
    <Path
      d='M50,5 L55,20 L70,10 L75,25 L90,20 L85,35 L100,40 L90,50 L100,60 L85,65 L90,80 L75,75 L70,90 L55,80 L50,95 L45,80 L30,90 L25,75 L10,80 L15,65 L0,60 L10,50 L0,40 L15,35 L10,20 L25,25 L30,10 L45,20 Z'
      fill={color}
    />
  </Svg>
);

export default IconAbout;
