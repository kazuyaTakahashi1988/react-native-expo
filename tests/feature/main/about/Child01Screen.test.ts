import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Child01Screen } from '../../../../app/features/main/about/aboutNest/child01';
import {
  findByProp,
  renderScreen,
  resetScreenTestState,
} from '../../../screenTestUtils';

const { showToastMock } = vi.hoisted(() => ({ showToastMock: vi.fn() }));

vi.mock('../../../../app/components/toast', () => ({
  showToast: showToastMock,
}));

describe('About Child01Screen', () => {
  beforeEach(() => {
    resetScreenTestState();
    showToastMock.mockReset();
  });

  it('shows the selected toast variant', () => {
    const tree = renderScreen(Child01Screen, {});

    (
      findByProp(tree, 'title', 'Success Center トーストを表示')
        .onPress as () => void
    )();

    expect(showToastMock).toHaveBeenCalledWith({
      message: 'Success Center トースト',
      position: 'center',
      variant: 'success',
    });
  });
});
