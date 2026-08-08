import { beforeEach, describe, expect, it, vi } from 'vitest';

import { InformationScreen } from '../../../app/features/others/information';
import {
  findByProp,
  getScreenTestState,
  renderScreen,
  resetScreenTestState,
} from '../../screenTestUtils';

describe('InformationScreen', () => {
  beforeEach(resetScreenTestState);

  it('opens external information and navigates back to About', () => {
    const navigate = vi.fn();
    const tree = renderScreen(InformationScreen, {
      navigation: { navigate },
    } as never);

    (
      findByProp(tree, 'title', 'Go to GitHub Repository').onPress as () => void
    )();
    expect(getScreenTestState().linkingOpenURL).toHaveBeenCalledWith(
      'https://github.com/kazuyaTakahashi1988/react-native-expo',
    );

    (findByProp(tree, 'title', 'Go to About').onPress as () => void)();
    expect(navigate).toHaveBeenCalledWith('main', { screen: 'about' });
  });
});
