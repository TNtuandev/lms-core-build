export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  fullName: string;
  passwordConfirmation: string;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "student" | "instructor" | "admin";
}
