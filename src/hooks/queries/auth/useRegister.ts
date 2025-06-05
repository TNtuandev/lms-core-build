import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/slices/auth.slice";
import { useRouter } from "next/navigation";
import { RegisterCredentials } from "@/api/types/auth.type";
import { authAPI } from "@/api/endpoints/auth.api";

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => authAPI.register(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      router.push("/dashboard");
    },
  });
}; 