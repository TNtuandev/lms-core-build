export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginGoogleCredentials {
  accessToken: string;
  idToken: string;
}

export interface RegisterCredentials extends LoginCredentials {
  fullName: string;
  passwordConfirmation: string;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface VerifyEmailCredentials {
  email: string;
  code: string
}

export interface ChangePasswordCredentials {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface User {
  id: string;
  email: string;
  isEmailVerified: boolean;
  name: string;
  avatar?: string;
  type: "learner" | "instructor" | "admin";
}
