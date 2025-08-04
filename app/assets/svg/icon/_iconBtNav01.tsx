import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  size?: number;
};
const IconBtNav01: React.FC<Props> = ({ color = '#000', size = 24 }) => (
  <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
    <Path
      d='M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.5z'
      fill={color}
    />
  </Svg>
);

export default IconBtNav01;
