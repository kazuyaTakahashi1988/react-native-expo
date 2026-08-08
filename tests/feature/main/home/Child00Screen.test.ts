import { beforeEach, describe, expect, it } from 'vitest';

import { Child00Screen } from '../../../../app/features/main/home/homeNest/child00';
import {
  findByProp,
  getScreenTestState,
  renderScreen,
  resetScreenTestState,
} from '../../../screenTestUtils';

describe('Home Child00Screen', () => {
  beforeEach(resetScreenTestState);

  it('submits and resets the form through the user-facing buttons', () => {
    const tree = renderScreen(Child00Screen, {});

    (findByProp(tree, 'title', 'Submit').onPress as () => void)();
    const { stateSetters } = getScreenTestState();
    const submitSetter = stateSetters[stateSetters.length - 1];
    expect(submitSetter).toBeDefined();
    expect(submitSetter).toHaveBeenCalled();

    (findByProp(tree, 'title', 'Reset').onPress as () => void)();
    const formReset = getScreenTestState().formResets[0];
    expect(formReset).toBeDefined();
    expect(formReset).toHaveBeenCalledOnce();
  });
});
