declare global {
  const process: {
    env: {
      EXPO_PUBLIC_STORYBOOK_ENABLED?: string;
      [key: string]: string | undefined;
    };
  };
}

export {};
