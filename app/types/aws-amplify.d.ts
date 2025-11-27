declare module 'aws-amplify' {
  export interface ResourcesConfig {
    Auth?: {
      Cognito?: {
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

  export const Amplify: AmplifyClient;
}

declare module 'aws-amplify/auth' {
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

  export type SignUpInput = {
    username: string;
    password: string;
    options: { userAttributes: { email: string } };
  };

  export type SignInInput = { username: string; password: string };

  export type ConfirmSignUpInput = {
    username: string;
    confirmationCode: string;
  };

  export const signUp: (input: SignUpInput) => Promise<SignUpResult>;
  export const signIn: (input: SignInInput) => Promise<SignInResult>;
  export const confirmSignUp: (input: ConfirmSignUpInput) => Promise<void>;
  export const signOut: () => Promise<void>;
}
