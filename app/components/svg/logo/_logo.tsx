import Svg, { Text } from 'react-native-svg';

import type { TypeLogo } from '../../../lib/types/typeComponents';
import type React from 'react';

const Logo: React.FC<TypeLogo> = ({ color = '#000', width = 85, height = 35 }) => (
  <Svg fill='none' height={height} viewBox='0 0 85 35' width={width}>
    <Text fill={color} fontSize='30' fontWeight='bold' transform='translate(0 28)'>
      LOGO
    </Text>
  </Svg>
);

export default Logo;
