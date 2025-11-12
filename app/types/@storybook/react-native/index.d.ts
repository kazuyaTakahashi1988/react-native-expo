import type { ComponentType, ReactNode } from 'react';

declare module '@storybook/react-native' {
  export type Meta = {
    title: string;
    component?: ComponentType<unknown>;
    args?: Record<string, unknown>;
    argTypes?: Record<string, unknown>;
    decorators?: Array<(Story: () => ReactNode) => ReactNode>;
    parameters?: Record<string, unknown>;
  } & Record<string, unknown>;

  export type StoryObj<TArgs = Record<string, unknown>> = {
    args?: Partial<Record<string, unknown>>;
    render?: (args: TArgs) => ReactNode;
    decorators?: Array<(Story: () => ReactNode) => ReactNode>;
    parameters?: Record<string, unknown>;
  } & Record<string, unknown>;

  export function getStorybookUI(options?: Record<string, unknown>): ComponentType<unknown>;
}
