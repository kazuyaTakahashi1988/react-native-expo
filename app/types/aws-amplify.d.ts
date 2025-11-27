declare module 'aws-amplify' {
  export interface ResourcesConfig {
    Auth?: {
      region?: string;
      userPoolId?: string;
      userPoolWebClientId?: string;
      authenticationFlowType?: string;
    };
  }

  export type AmplifyClient = {
    configure: (config: ResourcesConfig) => void;
  };

  export interface AuthUser {
    getUsername?: () => string;
  }

  export interface SignUpResult {
    user?: AuthUser;
    username?: string;
  }

  export interface SignInResult {
    isSignedIn?: boolean;
    username?: string;
  }

  export const Amplify: AmplifyClient;
  export const Auth: {
    signUp: (input: { username: string; password: string; attributes?: { email?: string } }) => Promise<SignUpResult>;
    signIn: (input: { username: string; password: string }) => Promise<SignInResult>;
    confirmSignUp: (username: string, confirmationCode: string) => Promise<void>;
    signOut: () => Promise<void>;
  };
}
