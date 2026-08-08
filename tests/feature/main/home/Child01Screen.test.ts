import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Child01Screen } from '../../../../app/features/main/home/homeNest/child01';
import {
  findByProp,
  flushPromises,
  getScreenTestState,
  renderScreen,
  resetScreenTestState,
} from '../../../screenTestUtils';

const { getArticleApiMock } = vi.hoisted(() => ({
  getArticleApiMock: vi.fn(),
}));

vi.mock('../../../../app/utils/apiHelper', () => ({
  getArticleApi: getArticleApiMock,
}));

describe('Home Child01Screen', () => {
  beforeEach(() => {
    resetScreenTestState();
    getArticleApiMock.mockReset();
  });

  it('fetches articles when the user presses the fetch button', async () => {
    const articles = [
      { id: 1, link: 'https://example.com', title: { rendered: 'Article' } },
    ];
    getArticleApiMock.mockResolvedValueOnce({
      ok: true,
      response: { data: articles },
    });
    const tree = renderScreen(Child01Screen, {});

    (findByProp(tree, 'title', '- 記事取得 -').onPress as () => void)();
    await flushPromises();

    expect(getArticleApiMock).toHaveBeenCalledOnce();
    expect(getScreenTestState().stateSetters[0]).toHaveBeenCalledWith(articles);
  });
});
