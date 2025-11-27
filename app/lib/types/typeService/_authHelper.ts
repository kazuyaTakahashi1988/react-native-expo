export type ResourcesConfig = {
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
};

export type AmplifyClient = {
  configure: (config: ResourcesConfig) => void;
};

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

export type SignUpValues = {
  email: string;
  password: string;
};

export type SignUpResult = {
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
};

export type SignInValues = {
  email: string;
  password: string;
};

export type SignInResult = {
  isSignedIn: boolean;
  nextStep?: {
    signInStep?: string;
    additionalInfo?: Record<string, unknown>;
  };
  userId?: string;
  username?: string;
};

export type VerifyValues = {
  email: string;
  verificationCode: string;
};
