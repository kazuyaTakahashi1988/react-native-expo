import { vi } from 'vitest';

import type * as ReactModule from 'react';
import type * as ReactReduxModule from 'react-redux';

type TestState = {
  formResets: Array<ReturnType<typeof vi.fn>>;
  linkingOpenURL: ReturnType<typeof vi.fn>;
  stateSetters: Array<ReturnType<typeof vi.fn>>;
};

const testState: TestState = {
  formResets: [],
  linkingOpenURL: vi.fn(),
  stateSetters: [],
};

Object.assign(globalThis, { __screenTestState: testState });

vi.mock('../app/components/button', () => ({ Button: 'Button' }));
vi.mock('../app/components/form', () => ({
  CheckBox: 'CheckBox',
  CheckBoxCustom: 'CheckBoxCustom',
  Input: 'Input',
  RadioBox: 'RadioBox',
  RadioBoxCustom: 'RadioBoxCustom',
  SelectBox: 'SelectBox',
  TextArea: 'TextArea',
}));
vi.mock('../app/components/layouts/layout', () => ({ Layout: 'Layout' }));

vi.mock('react', async (importOriginal) => {
  const original = await importOriginal<typeof ReactModule>();
  const useCallback = <T>(callback: T): T => callback;
  const useEffect = () => undefined;
  const useMemo = <T>(factory: () => T): T => factory();
  const useRef = <T>(initialValue: T) => ({ current: initialValue });
  const useState = <T>(initialValue: T | (() => T)) => {
    const setter = vi.fn();
    testState.stateSetters.push(setter);
    return [
      typeof initialValue === 'function'
        ? (initialValue as () => T)()
        : initialValue,
      setter,
    ] as const;
  };
  const mockedHooks = { useCallback, useEffect, useMemo, useRef, useState };
  const mockedReact = { ...original, ...mockedHooks };

  Object.assign(globalThis, { React: mockedReact });

  return {
    ...mockedReact,
    default: mockedReact,
  };
});

vi.mock('react-native', () => ({
  ActivityIndicator: 'ActivityIndicator',
  Alert: { alert: vi.fn() },
  Animated: {
    View: 'AnimatedView',
    timing: vi.fn(() => ({ start: vi.fn() })),
    Value: vi.fn(() => ({ interpolate: vi.fn() })),
  },
  FlatList: 'FlatList',
  Image: 'Image',
  KeyboardAvoidingView: 'KeyboardAvoidingView',
  Linking: { openURL: testState.linkingOpenURL },
  Modal: 'Modal',
  Platform: {
    OS: 'web',
    select: vi.fn(
      (options: { default?: unknown; web?: unknown }) =>
        options.web ?? options.default,
    ),
  },
  Pressable: 'Pressable',
  ScrollView: 'ScrollView',
  StyleSheet: { create: <T>(styles: T): T => styles },
  Switch: 'Switch',
  Text: 'Text',
  TextInput: 'TextInput',
  TouchableOpacity: 'TouchableOpacity',
  View: 'View',
}));

vi.mock('react-hook-form', () => ({
  Controller: 'Controller',
  useController: vi.fn(() => ({
    field: { onBlur: vi.fn(), onChange: vi.fn(), value: '' },
    fieldState: {},
  })),
  useForm: vi.fn(({ defaultValues = {} } = {}) => {
    const reset = vi.fn();
    testState.formResets.push(reset);
    return {
      control: {},
      formState: { errors: {} },
      handleSubmit: (callback: (values: unknown) => unknown) => () =>
        callback(defaultValues),
      reset,
    };
  }),
}));

vi.mock('react-redux', async (importOriginal) => {
  const original = await importOriginal<typeof ReactReduxModule>();
  type MockState = {
    example: { exampleFlag: boolean; exampleString: string };
    loading: { count: number };
  };
  return {
    ...original,
    useSelector: vi.fn((selector: (state: MockState) => unknown) =>
      selector({
        example: { exampleFlag: false, exampleString: '' },
        loading: { count: 0 },
      }),
    ),
  };
});
