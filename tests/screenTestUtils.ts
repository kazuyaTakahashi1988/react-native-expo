import { isValidElement } from 'react';

import type { FC, ReactElement, ReactNode } from 'react';
import type { Mock } from 'vitest';

type TestState = {
  formResets: Mock[];
  linkingOpenURL: Mock;
  stateSetters: Mock[];
};

type ElementProps = Record<string, unknown> & { children?: unknown };

const getTestState = (): TestState =>
  (globalThis as typeof globalThis & { __screenTestState: TestState })
    .__screenTestState;

export const resetScreenTestState = () => {
  const state = getTestState();
  state.formResets.length = 0;
  state.stateSetters.length = 0;
  state.linkingOpenURL.mockReset();
};

export const getScreenTestState = getTestState;

export const renderScreen = <TProps>(Screen: FC<TProps>, props: TProps) => {
  const result = Screen(props);
  if (result instanceof Promise) {
    throw new Error('Screen behavior tests only support synchronous screens');
  }
  return result;
};

const visitElements = (node: unknown, elements: ReactElement[]) => {
  if (Array.isArray(node)) {
    node.forEach((child) => {
      visitElements(child, elements);
    });
    return;
  }

  if (!isValidElement(node)) return;

  elements.push(node);
  visitElements((node.props as ElementProps).children, elements);
};

export const findByProp = (
  tree: ReactNode,
  propName: string,
  value: unknown,
) => {
  const elements: ReactElement[] = [];
  visitElements(tree, elements);
  const element = elements.find(
    (candidate) => (candidate.props as ElementProps)[propName] === value,
  );

  if (element === undefined) {
    throw new Error(`Element with ${propName}=${String(value)} was not found`);
  }

  return element.props as ElementProps;
};

export const flushPromises = async () => {
  await Promise.resolve();
  await Promise.resolve();
};
