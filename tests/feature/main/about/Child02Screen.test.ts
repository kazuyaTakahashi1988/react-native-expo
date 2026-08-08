import { beforeEach, describe, expect, it } from 'vitest';

import { Child02Screen } from '../../../../app/features/main/about/aboutNest/child02';
import { store } from '../../../../app/utils/storeHelper';
import {
  findByProp,
  renderScreen,
  resetScreenTestState,
} from '../../../screenTestUtils';

describe('About Child02Screen', () => {
  beforeEach(resetScreenTestState);

  it('updates the Redux string from user input', () => {
    const tree = renderScreen(Child02Screen, {});

    (
      findByProp(tree, 'placeholder', '入力をお願いします。')
        .onChange as (event: { nativeEvent: { text: string } }) => void
    )({ nativeEvent: { text: 'updated by user' } });

    expect(store.getState().example.exampleString).toBe('updated by user');
  });
});
