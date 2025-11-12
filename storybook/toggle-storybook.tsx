import { useEffect, useState } from 'react';

import App from '../app/App';

import type { ComponentType, JSX } from 'react';

const SHOW_STORYBOOK = __DEV__ && process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';

const ToggleStorybook = (): JSX.Element => {
  const [StorybookUI, setStorybookUI] = useState<ComponentType<unknown> | null>(null);

  useEffect(() => {
    if (!SHOW_STORYBOOK) {
      return;
    }

    let isMounted = true;

    import('./index')
      .then(({ default: StorybookUIRoot }: { default: ComponentType<unknown> }) => {
        if (isMounted) {
          setStorybookUI(() => StorybookUIRoot);
        }
      })
      .catch((error: unknown) => {
        console.error('Failed to load Storybook UI', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (SHOW_STORYBOOK && StorybookUI != null) {
    return <StorybookUI />;
  }

  return <App />;
};

export default ToggleStorybook;
