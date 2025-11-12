import { getStorybookUI } from '@storybook/react-native';

import type { ComponentType } from 'react';

import './rn-addons';
import './stories';

const StorybookUIRoot: ComponentType<unknown> = getStorybookUI({
  asyncStorage: null,
  shouldDisableKeyboardAvoidingView: true,
});

export default StorybookUIRoot;
