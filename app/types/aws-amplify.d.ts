declare module 'aws-amplify' {
  export interface ResourcesConfig {
    Auth?: {
      Cognito?: {
        region: string;
        userPoolId: string;
        userPoolClientId: string;
        loginWith?: {
          email?: boolean;
          phone?: boolean;
          username?: boolean;
          preferredUsername?: boolean;
        };
      };
    };
  }

  export type AmplifyClient = {
    configure: (config: ResourcesConfig) => void;
  };

  export interface SignUpResult {
    isSignUpComplete?: boolean;
    nextStep?: {
      signUpStep?: string;
      codeDeliveryDetails?: {
        attributeName?: string;
        deliveryMedium?: string;
        destination?: string;
      };
    };
    userId?: string;
    username?: string;
  }

  export interface SignInResult {
    isSignedIn: boolean;
    nextStep?: {
      signInStep?: string;
      additionalInfo?: Record<string, unknown>;
    };
    userId?: string;
    username?: string;
  }

  export const Amplify: AmplifyClient;
  export const Auth: {
    signUp: (input: {
      username: string;
      password: string;
      options: { userAttributes: { email: string } };
    }) => Promise<SignUpResult>;
    signIn: (input: { username: string; password: string }) => Promise<SignInResult>;
    confirmSignUp: (username: string, confirmationCode: string) => Promise<void>;
    signOut: () => Promise<void>;
  };
}
