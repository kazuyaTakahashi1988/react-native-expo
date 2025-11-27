export type SignInValues = {
  email: string;
  password: string;
};

export type SignUpValues = {
  email: string;
  password: string;
};

export type VerifyValues = {
  email: string;
  verificationCode: string;
};

export type SignUpResult = {
  user?: {
    getUsername?: () => string;
  };
  username?: string;
};

export type SignInResult = {
  isSignedIn?: boolean;
  username?: string;
};
