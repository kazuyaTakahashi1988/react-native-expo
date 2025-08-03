import React from 'react';
import Svg, { Path, Text} from 'react-native-svg';

type Props = {
  color?: string;
  size?: number;
};
const Logo: React.FC<Props> = ({ color = '#000', size = 100 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 200 60"
    fill="none"
  >
    <Text
      fill={color}
      fontSize="48"
      fontWeight="bold"
      x="0"
      y="45"
    >
      LOGO
    </Text>
  </Svg>
);

export default Logo;