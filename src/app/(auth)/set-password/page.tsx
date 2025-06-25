"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { bannerSignIn, logoMini } from "@/contants/images";
import { useLogin } from "@/hooks/queries/auth/useLogin";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Schema validation for Set Password
const setPasswordSchema = z.object({
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số"),
  confirmPassword: z
    .string()
    .min(1, "Vui lòng xác nhận mật khẩu"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

type SetPasswordFormData = z.infer<typeof setPasswordSchema>;

function SetPasswordPage() {
  const { mutate: login, isPending, error } = useLogin();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = (data: SetPasswordFormData) => {
    console.log(data, "----");
  };

  return (
    <div className="flex w-full flex-col md:flex-row flex-shrink-0">
      <Image
        src={bannerSignIn}
        alt="banner"
        className="h-screen w-full object-cover hidden md:block"
      />
      <div className="flex flex-col justify-center items-center w-full md:w-[30%] px-6 md:px-8 flex-shrink-0">
        <Image
          src={logoMini}
          alt="logmini"
          className="block m-4 md:mt-10 mt-[144px] h-[56px] w-[180px]"
        />
        <div className="text-[#212B36] font-semibold text-2xl md:text-3xl mb-3">
          Đặt lại mật khẩu
        </div>
        <div className="flex gap-2 text-sm text-[#212B36]">
          <div className="text-center">Yêu cầu đặt lại mật khẩu.</div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-[40px] space-y-4"
          >
            {/* Display API Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error.message ||
                  "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại."}
              </div>
            )}

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu mới"
                        className="w-full border border-gray-200 rounded-[10px] px-4 py-2 h-12 pr-12 focus:border-blue-500 focus:ring-blue-500"
                        disabled={isPending}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        disabled={isPending}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Xác nhận mật khẩu"
                        className="w-full border border-gray-200 rounded-[10px] px-4 py-2 h-12 pr-12 focus:border-blue-500 focus:ring-blue-500"
                        disabled={isPending}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        disabled={isPending}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="font-semibold text-white bg-[#2F57EF] hover:bg-[#254bdc] disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl mt-4 w-full h-12"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang đặt lại mật khẩu...
                </>
              ) : (
                "Đặt lại mật khẩu"
              )}
            </Button>
          </form>
        </Form>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 text-sm hover:text-[#2F57EF] cursor-pointer flex items-center gap-1"
          disabled={isPending}
        >
          ← Quay lại đăng nhập
        </button>

      </div>
    </div>
  );
}

export default SetPasswordPage;
