type Environment = {
  apiBaseUrl: string;
  authUserPoolClientId: string;
  authUserPoolId: string;
};

const requireEnvironmentValue = (name: string, value: unknown): string => {
  if (typeof value !== 'string') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  if (!/\S/u.test(value)) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const env: Environment = {
  apiBaseUrl: requireEnvironmentValue(
    'EXPO_PUBLIC_API_BASE_URL',
    process.env.EXPO_PUBLIC_API_BASE_URL,
  ),
  authUserPoolClientId: requireEnvironmentValue(
    'EXPO_PUBLIC_AUTH_USER_POOL_CLIENT_ID',
    process.env.EXPO_PUBLIC_AUTH_USER_POOL_CLIENT_ID,
  ),
  authUserPoolId: requireEnvironmentValue(
    'EXPO_PUBLIC_AUTH_USER_POOL_ID',
    process.env.EXPO_PUBLIC_AUTH_USER_POOL_ID,
  ),
};
