import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from '../../../lib/types';
import type React from 'react';

const IconWork: React.FC<SvgProps> = ({ color = '#000', size = 24 }) => (
  <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
    <Path
      d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.5 3.5 5 5.5 5 c1.54 0 3.04.99 3.57 2.36h1.87 C13.46 5.99 14.96 5 16.5 5 C18.5 5 20 6.5 20 8.5 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
      fill={color}
    />
  </Svg>
);

export default IconWork;
