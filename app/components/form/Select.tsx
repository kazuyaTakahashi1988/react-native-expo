import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { LayoutRectangle, StyleProp, ViewStyle, View as ViewType } from 'react-native';
import type React from 'react';

type Option<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  value: T | null | undefined;
  onValueChange: (value: T) => void;
  options: Array<Option<T>>;
  placeholder?: string;
  hasError?: boolean;
  style?: StyleProp<ViewStyle>;
};

type TriggerLayout = Pick<LayoutRectangle, 'x' | 'y' | 'width' | 'height'>;

const defaultTriggerLayout: TriggerLayout = { height: 0, width: 0, x: 0, y: 0 };

const Select = <T,>(props: Props<T>): React.JSX.Element => {
  const { value, onValueChange, options, placeholder = '選択してください', hasError = false, style } = props;

  const triggerRef = useRef<ViewType>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<TriggerLayout>(defaultTriggerLayout);

  const selectedOption = useMemo(() => options.find((option) => option.value === value), [options, value]);

  const openDropdown = useCallback(() => {
    if (!triggerRef.current) {
      setIsOpen(true);
      return;
    }

    triggerRef.current.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ height, width, x, y });
      setIsOpen(true);
    });
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSelect = useCallback(
    (nextValue: T) => {
      closeDropdown();
      onValueChange(nextValue);
    },
    [closeDropdown, onValueChange],
  );

  return (
    <>
      <Pressable
        ref={triggerRef}
        accessibilityRole='button'
        onPress={openDropdown}
        style={[styles.control, hasError ? styles.controlError : null, style]}
      >
        <Text style={[styles.label, selectedOption ? styles.labelActive : styles.labelPlaceholder]}>
          {selectedOption?.label ?? placeholder}
        </Text>
        <Text style={styles.chevron}>▾</Text>
      </Pressable>

      <Modal
        animationType='fade'
        onRequestClose={closeDropdown}
        supportedOrientations={['portrait', 'portrait-upside-down', 'landscape']}
        transparent
        visible={isOpen}
      >
        <View style={styles.modalRoot}>
          <Pressable style={styles.backdrop} onPress={closeDropdown} />
          <View pointerEvents='box-none' style={StyleSheet.absoluteFillObject}>
            <View
              style={[
                styles.dropdown,
                {
                  left: triggerLayout.x,
                  top: triggerLayout.y + triggerLayout.height + 6,
                  width: triggerLayout.width || 240,
                },
              ]}
            >
              <ScrollView keyboardShouldPersistTaps='handled'>
                {options.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <Pressable
                      key={String(option.value)}
                      accessibilityRole='menuitem'
                      onPress={() => {
                        handleSelect(option.value);
                      }}
                      style={[styles.option, isSelected ? styles.optionSelected : null]}
                    >
                      <Text style={[styles.optionLabel, isSelected ? styles.optionLabelSelected : null]}>
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  control: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: '100%',
  },
  controlError: {
    borderColor: '#ef4444',
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  labelPlaceholder: {
    color: '#9ca3af',
  },
  labelActive: {
    color: '#111827',
  },
  chevron: {
    color: '#6b7280',
    fontSize: 16,
    marginLeft: 12,
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17, 24, 39, 0.35)',
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
    borderRadius: 8,
    borderWidth: 1,
    elevation: 4,
    maxHeight: 280,
    overflow: 'hidden',
    position: 'absolute',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionSelected: {
    backgroundColor: '#eff6ff',
  },
  optionLabel: {
    color: '#111827',
    fontSize: 16,
  },
  optionLabelSelected: {
    fontWeight: '600',
  },
});

export default Select;
