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
    storage?: TypeAuthStorage;
  };
};

export type TypeAuthStorage = {
  getItem: (key: string) => Promise<string | null> | string | null;
  setItem: (key: string, value: string) => Promise<void> | void;
  removeItem: (key: string) => Promise<void> | void;
};

export type TypeAmplifyClient = {
  configure: (config: TypeAuthConfig) => void;
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
