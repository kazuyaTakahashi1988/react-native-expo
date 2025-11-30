import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { color as mixinColor } from '../../../lib/mixin';

import type { TypeIcon } from '../../../lib/types/typeComponents';
import type React from 'react';

const IconLogin: React.FC<TypeIcon> = ({ color = mixinColor.gray, size = 24 }) => {
  const styles = StyleSheet.create({
    svgColor: {
      backgroundColor: mixinColor.white,
      borderRadius: size,
    },
  });

  return (
    <Svg height={size} style={styles.svgColor} viewBox='0 0 512 512' width={size}>
      <Path
        d='M332.933,213.451c-20.713,17.784-47.559,28.624-76.938,28.624c-29.37,0-56.224-10.84-76.928-28.624
		c-54.991,20.952-92.686,66.126-92.686,132.094v98.082c0,0,14.505,19.331,45.864,37.437v-69.339h28.992v83.228
		c24.848,9.78,56.243,17.047,94.758,17.047c38.524,0,69.901-7.266,94.767-17.047v-83.228h28.992v69.339
		c31.359-18.106,45.864-37.437,45.864-37.437v-98.082C425.618,279.577,387.923,234.403,332.933,213.451z'
        fill={color}
      ></Path>
      <Path
        d='M255.996,213.902c49.299,0,89.26-39.96,89.26-89.259V89.269C345.255,39.96,305.294,0,255.996,0
		c-49.3,0-89.268,39.96-89.268,89.269v35.374C166.727,173.942,206.696,213.902,255.996,213.902z'
        fill={color}
      ></Path>
    </Svg>
  );
};

export default IconLogin;
