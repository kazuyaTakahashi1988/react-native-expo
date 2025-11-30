import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import ErrorText from './_errorText';
import Label from './_label';
import { color } from '../../lib/mixin';
import { useRHFController } from '../../services/formHelper';

import type { TypeSelectBox } from '../../lib/types/typeComponents';
import type { FieldValues } from 'react-hook-form';
import type { StyleProp, ViewStyle } from 'react-native';

/* -----------------------------------------------
 * プレーンなセレクトボックス
 * ----------------------------------------------- */
const SelectBoxNew = <TFieldValues extends FieldValues>({
  containerStyle,
  control,
  disabled = false,
  errorText,
  label,
  name,
  options,
  placeholder = '選択してください',
  rules,
  triggerStyle,
}: TypeSelectBox<TFieldValues>) => {
  const { controller } = useRHFController({ control, name, rules });
  const selectedValue = ensureString(controller.field.value);

  const pickerOptions = React.useMemo(() => {
    return [{ label: placeholder, value: '' }, ...options];
  }, [options, placeholder]);

  const handleChange = (value: string) => {
    controller.field.onChange?.(value);
  };

  return (
    <View style={containerStyle}>
      <Label {...{ label, rules }} />

      <View style={buildPickerWrapper(triggerStyle, Boolean(errorText), disabled)}>
        <Picker
          enabled={!disabled}
          selectedValue={selectedValue}
          onValueChange={handleChange}
          dropdownIconColor={color.gray100}
          style={styles.picker}
        >
          {pickerOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
              color={option.value === '' ? color.gray100 : option.color}
            />
          ))}
        </Picker>
      </View>

      <ErrorText errorText={errorText} />
    </View>
  );
};

const buildPickerWrapper = (
  triggerStyle: StyleProp<ViewStyle> | undefined,
  hasError: boolean,
  disabled: boolean,
): StyleProp<ViewStyle>[] => {
  const wrapperStyles: StyleProp<ViewStyle>[] = [
    styles.wrapper,
    disabled ? styles.wrapperDisabled : null,
  ];

  if (hasError) {
    wrapperStyles.push(styles.wrapperError);
  }

  if (triggerStyle != null) {
    wrapperStyles.push(triggerStyle);
  }

  return wrapperStyles;
};

const ensureString = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }
  return '';
};

const styles = StyleSheet.create({
  wrapper: {
    borderColor: color.gray100,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: color.white,
    overflow: 'hidden',
  },
  wrapperDisabled: {
    backgroundColor: color.gray100,
  },
  wrapperError: {
    borderColor: color.red,
  },
  picker: {
    minHeight: 44,
  },
});

export default SelectBoxNew;
