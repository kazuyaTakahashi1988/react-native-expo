import { describe, expect, it } from 'vitest';

import {
  exampleFlagSet,
  exampleReducer,
  exampleStringSet,
  loadingFlagDown,
  loadingFlagUp,
  loadingReducer,
} from '../../app/utils/storeHelper/_slices';

describe('loadingReducer', () => {
  it('tracks overlapping operations with a counter', () => {
    let state = loadingReducer(undefined, { type: 'initial' });

    state = loadingReducer(state, loadingFlagUp());
    state = loadingReducer(state, loadingFlagUp());
    expect(state.count).toBe(2);

    state = loadingReducer(state, loadingFlagDown());
    expect(state.count).toBe(1);
  });

  it('never decrements below zero', () => {
    const state = loadingReducer(undefined, loadingFlagDown());

    expect(state.count).toBe(0);
  });
});

describe('exampleReducer', () => {
  it('updates each example field independently', () => {
    let state = exampleReducer(undefined, exampleFlagSet(true));
    state = exampleReducer(state, exampleStringSet('updated'));

    expect(state).toEqual({ exampleFlag: true, exampleString: 'updated' });
  });
});
