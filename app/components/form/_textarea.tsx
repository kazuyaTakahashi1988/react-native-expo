import { type FieldValues } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import Input from './_input';

import type { TypeTextArea } from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * テキストエリア項目
 * ----------------------------------------------- */

const TextArea = <TFieldValues extends FieldValues>({
  numberOfLines = 4,
  style,
  textAlignVertical = 'top',
  ...props
}: TypeTextArea<TFieldValues>) => (
  <Input
    {...props}
    multiline
    numberOfLines={numberOfLines}
    style={[styles.textArea, style]}
    textAlignVertical={textAlignVertical}
  />
);

const styles = StyleSheet.create({
  textArea: {
    minHeight: 120,
  },
});

export default TextArea;
