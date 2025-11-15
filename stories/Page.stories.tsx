import { expect, userEvent, within } from 'storybook/test';

import { Page } from './Page';

import type { Meta } from '@storybook/react-native-web-vite';

export default {
  title: 'Example/Page',
  component: Page,
} as Meta<typeof Page>;

export const LoggedIn = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  play: async ({ canvasElement }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /Log in/i });
    await expect(loginButton).toBeInTheDocument();
    await userEvent.click(loginButton);

    const logoutButton = canvas.getByRole('button', { name: /Log out/i });
    await expect(logoutButton).toBeInTheDocument();
  },
};

export const LoggedOut = {};
