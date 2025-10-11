import Svg, { Text } from 'react-native-svg';

import type { TypeSvg } from '../../../lib/types';
import type React from 'react';

const Logo: React.FC<TypeSvg> = ({ color = '#000', size = 100 }) => (
  <Svg width={size} height={size} viewBox='0 0 200 60' fill='none'>
    <Text fill={color} fontSize='48' fontWeight='bold' transform='translate(0 45)'>
      LOGO
    </Text>
  </Svg>
);

export default Logo;
