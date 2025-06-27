import {
  AuthResponse, ForgotPasswordCredentials,
  LoginCredentials,
  RegisterCredentials,
  User, VerifyEmailCredentials
} from "@/api/types/auth.type";
import api from "@/api/api";

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  },

  register: async (credentials: RegisterCredentials): Promise<any> => {
    const { data } = await api.post("/auth/register", credentials);
    return data;
  },

  forgotPassword: async (credentials: ForgotPasswordCredentials): Promise<AuthResponse> => {
    const { data } = await api.post("/auth/request-password-reset", credentials);
    return data;
  },

  verifyEmail: async (credentials: VerifyEmailCredentials): Promise<AuthResponse> => {
    const { data } = await api.post("/auth/verify-email", credentials);
    return data;
  },

  sendVerification: async (credentials: ForgotPasswordCredentials): Promise<AuthResponse> => {
    const { data } = await api.post("/auth/send-verification", credentials);
    return data;
  },

  confirmResetPassword: async (credentials: ForgotPasswordCredentials): Promise<AuthResponse> => {
    const { data } = await api.post("/auth/confirm-reset-password", credentials);
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  me: async (): Promise<User> => {
    const { data } = await api.get("/users/me");
    return data;
  },
};
