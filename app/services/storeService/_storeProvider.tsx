import { Provider } from 'react-redux';

import { store } from './_redux';

import type React from 'react';

/* -----------------------------------------------
 * Store（Redux）用 Provider
 * ----------------------------------------------- */

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
