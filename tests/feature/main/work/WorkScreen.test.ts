import { describe, expect, it, vi } from 'vitest';

import { WorkScreen } from '../../../../app/features/main/work';
import { findByProp, renderScreen } from '../../../screenTestUtils';

describe('WorkScreen', () => {
  it('navigates to About when the user presses the button', () => {
    const navigate = vi.fn();
    const tree = renderScreen(WorkScreen, {
      navigation: { navigate },
    } as never);

    (findByProp(tree, 'title', 'Go to About').onPress as () => void)();

    expect(navigate).toHaveBeenCalledWith('about');
  });
});
