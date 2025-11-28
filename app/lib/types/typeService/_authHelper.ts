export type TypeAuthConfig = {
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

export type TypeAmplifyClient = {
  configure: (config: TypeAuthConfig, options?: Record<string, unknown>) => void;
};

export type TypeSignInValues = {
  email: string;
  password: string;
};

export type TypeSignInResult = {
  isSignedIn: boolean;
  nextStep?: {
    signInStep?: string;
    additionalInfo?: Record<string, unknown>;
  };
};

export type TypeSignUpValues = {
  email: string;
  password: string;
};

export type TypeSignUpResult = {
  isSignUpComplete?: boolean;
  nextStep?: {
    signUpStep?: string;
    codeDeliveryDetails?: {
      attributeName?: string;
      deliveryMedium?: string;
      destination?: string;
    };
  };
};

export type TypeVerifyValues = {
  email: string;
  verificationCode: string;
};
