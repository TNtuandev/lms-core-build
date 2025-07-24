import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/slices/auth.slice";
import { useRouter } from "next/navigation";
import { GoogleAuthCredentials } from "@/api/types/auth.type";
import { useMe } from "@/hooks/queries/auth/useMe";
import { useGetOtp } from "@/hooks/queries/auth/useGetOtp";
import { initializeGoogleAuth, signInWithGoogle } from "@/until/google-auth";
import { useEffect } from "react";

export const useGoogleLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();
  const userQuery = useMe();
  const { mutate: getOtp } = useGetOtp();

  // Initialize Google OAuth when the hook is used
  useEffect(() => {
    initializeGoogleAuth().catch((error) => {
      console.error("Failed to initialize Google Auth:", error);
    });
  }, []);

  const googleLoginMutation = useMutation({
    mutationFn: async (credentials: GoogleAuthCredentials) => {
      // Use client-side API that goes through Next.js API routes
      const response = await fetch('/api/auth/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        throw new Error('Google login failed');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setAuth(data as any, data?.accessToken);
      userQuery.refetch().then((res) => {
        if (res?.data) {
          setAuth(res.data as any, data?.accessToken);
          if (res.data.isEmailVerified) {
            router.push("/dashboard");
          } else {
            getOtp({ email: res.data.email });
          }
        }
      });
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const googleResponse = await signInWithGoogle();

      console.log(googleResponse, "---googleResponse");
      
      // Send Google tokens to our backend
      googleLoginMutation.mutate({
        accessToken: googleResponse.access_token,
        idToken: googleResponse.id_token,
      });
    } catch (error: any) {
      console.error("Google login failed:", error);
      throw new Error(error.message || "Google login failed");
    }
  };

  return {
    handleGoogleLogin,
    isPending: googleLoginMutation.isPending,
    error: googleLoginMutation.error,
  };
}; 