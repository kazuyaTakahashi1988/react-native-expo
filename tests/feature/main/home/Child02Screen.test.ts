import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Child02Screen } from '../../../../app/features/main/home/homeNest/child02';
import {
  findByProp,
  flushPromises,
  getScreenTestState,
  renderScreen,
  resetScreenTestState,
} from '../../../screenTestUtils';

const { getCategorizedArticleApiMock } = vi.hoisted(() => ({
  getCategorizedArticleApiMock: vi.fn(),
}));

vi.mock('../../../../app/utils/apiHelper', () => ({
  getCategorizedArticleApi: getCategorizedArticleApiMock,
}));

describe('Home Child02Screen', () => {
  beforeEach(() => {
    resetScreenTestState();
    getCategorizedArticleApiMock.mockReset();
  });

  it('searches with the selected category values and can reset', async () => {
    getCategorizedArticleApiMock.mockResolvedValueOnce({
      success: true,
      response: { data: [] },
    });
    const tree = renderScreen(Child02Screen, {});

    (
      findByProp(tree, 'title', '選択したカテゴリーで記事を絞り込み検索')
        .onPress as () => void
    )();
    await flushPromises();

    expect(getCategorizedArticleApiMock).toHaveBeenCalledWith({
      filters: '',
    });
    expect(getScreenTestState().stateSetters[0]).toHaveBeenCalledWith([]);

    (findByProp(tree, 'title', 'Reset').onPress as () => void)();
    expect(getScreenTestState().formResets[0]).toHaveBeenCalledOnce();
  });
});
