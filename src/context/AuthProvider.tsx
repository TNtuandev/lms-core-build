"use client";
import { createContext, ReactNode, useContext } from "react";
import { useAuthStore } from "@/store/slices/auth.slice";
import { User } from "@/models/user.model";
import { useMe } from "@/hooks/queries/auth/useMe";

// ✅ Define AuthContext Interface
interface AuthContextType {
  user: User | null; // Define a proper user type in the future
  isAuthenticated: boolean;
  isLoading: boolean;
  signOut: () => void;
}

// ✅ Create Context
const AuthContext = createContext<AuthContextType | null>(null);

// ✅ Custom Hook to Access Context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

// ✅ AuthProvider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, logout } = useAuthStore();
  const userQuery = useMe();
  // const signOutMutation = useLogout();

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading: userQuery.isLoading,
        signOut: () => {
          logout();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
