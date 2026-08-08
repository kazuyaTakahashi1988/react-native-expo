import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Child00Screen } from '../../../../app/features/main/about/aboutNest/child00';
import {
  findByProp,
  getScreenTestState,
  renderScreen,
  resetScreenTestState,
} from '../../../screenTestUtils';

const { showDialogMock } = vi.hoisted(() => ({ showDialogMock: vi.fn() }));

vi.mock('../../../../app/components/dialog', () => ({
  Dialog: 'Dialog',
  hideDialog: vi.fn(),
  showDialog: showDialogMock,
}));

describe('About Child00Screen', () => {
  beforeEach(() => {
    resetScreenTestState();
    showDialogMock.mockReset();
  });

  it('opens local and imperative dialogs from their buttons', () => {
    const tree = renderScreen(Child00Screen, {});

    (
      findByProp(tree, 'title', 'Basic ダイアログを開く').onPress as () => void
    )();
    expect(getScreenTestState().stateSetters[0]).toHaveBeenCalledWith('basic');

    (
      findByProp(tree, 'title', 'showDialog関数で ダイアログを開く')
        .onPress as () => void
    )();
    expect(showDialogMock).toHaveBeenCalledWith(
      expect.objectContaining({ dialogId: 'id-xxxx' }),
    );
  });
});
