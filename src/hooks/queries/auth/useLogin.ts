import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/slices/auth.slice";
import { useRouter } from "next/navigation";
import { LoginCredentials } from "@/api/types/auth.type";
import { authAPI } from "@/api/endpoints/auth.api";
import { useMe } from "@/hooks/queries/auth/useMe";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();
  const userQuery = useMe();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authAPI.login(credentials),
    onSuccess: (data) => {
      if (userQuery?.data) {
        setAuth(userQuery.data, data?.accessToken);
        if (userQuery.data.isEmailVerified) {
          router.push("/dashboard");
        } else {
          router.push("/verify-account");
        }
      }
    },
  });
};
