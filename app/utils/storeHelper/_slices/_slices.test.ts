import { describe, expect, it } from 'vitest';

import {
  exampleFlagSet,
  exampleReducer,
  exampleStringSet,
  loadingFlagDown,
  loadingFlagUp,
  loadingReducer,
} from './index';

describe('exampleReducer', () => {
  it('updates the example values', () => {
    const flagState = exampleReducer(undefined, exampleFlagSet(true));
    const stringState = exampleReducer(flagState, exampleStringSet('updated'));

    expect(stringState).toEqual({
      exampleFlag: true,
      exampleString: 'updated',
    });
  });
});

describe('loadingReducer', () => {
  it('counts concurrent loading operations', () => {
    const firstRequest = loadingReducer(undefined, loadingFlagUp());
    const secondRequest = loadingReducer(firstRequest, loadingFlagUp());

    expect(secondRequest.count).toBe(2);
    expect(loadingReducer(secondRequest, loadingFlagDown()).count).toBe(1);
  });

  it('does not decrement below zero', () => {
    expect(loadingReducer(undefined, loadingFlagDown()).count).toBe(0);
  });
});
