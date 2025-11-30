import Svg, { Text } from 'react-native-svg';

import { color as mixinColor } from '../../../lib/mixin';

import type { TypeLogo } from '../../../lib/types/typeComponents';
import type React from 'react';

const LogoDummy: React.FC<TypeLogo> = ({ color = mixinColor.black, width = 100, height = 35 }) => (
  <Svg fill='none' height={height} viewBox='0 0 125 30' width={width}>
    <Text fill={color} fontSize='30' fontWeight='bold' transform='translate(0 28)'>
      Dummy
    </Text>
  </Svg>
);

export default LogoDummy;
