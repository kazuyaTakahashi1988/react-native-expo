/* 認証設定 */
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

/* 認証クライアント */
export type TypeAmplifyClient = {
  configure: (config: TypeAuthConfig) => void;
};

/* 認証状態 */
export type AuthStatus =
  | 'checking' // 確認中
  | 'guest' // 未認証
  | 'authenticated' // 認証済み
  | 'error'; // エラー

/* 認証コンテキスト */
export type TypeAuthContext = {
  status: AuthStatus;
  error: Error | null;
  refreshAuthState: () => Promise<void>;
};

/* 認証情報 */
export type TypeSignInValues = {
  email: string;
  password: string;
};

/* サインイン結果 */
export type TypeSignInResult = {
  isSignedIn: boolean;
  nextStep?: {
    signInStep?: string;
    additionalInfo?: Record<string, unknown>;
  };
};

/* サインアップ情報 */
export type TypeSignUpValues = {
  email: string;
  password: string;
};

/* サインアップ結果 */
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

/* 認証コード確認情報 */
export type TypeVerifyValues = {
  email: string;
  verificationCode: string;
};
