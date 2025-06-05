"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { bannerSignIn, logoGoogle, logoMini } from "@/contants/images";
import { useRegister } from "@/hooks/queries/auth/useRegister";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

// Schema validation for Register
const registerSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  password: z
    .string()
    .min(1, "Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterPage() {
  const { mutate: register, isPending, error } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    register(data);
  };

  const handleGoogleRegister = () => {
    // TODO: Implement Google registration
    console.log("Google register clicked");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex w-full flex-col md:flex-row">
      <Image
        src={bannerSignIn}
        alt="banner"
        className="h-screen object-cover hidden md:block"
      />
      <div className="flex flex-col justify-center items-center w-full px-6 md:px-8">
        <Image
          src={logoMini}
          alt="logmini"
          className="block m-4 md:mt-10 mt-[144px] h-[56px] w-[180px]"
        />
        <div className="text-[#212B36] font-semibold text-2xl md:text-3xl mb-3">
          Bắt đầu hoàn toàn miễn phí
        </div>
        <div className="flex gap-2 text-sm text-[#212B36]">
          <div>Bạn đã có tài khoản?</div>
          <div
            role="presentation"
            className="text-[#2F57EF] cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Đăng nhập
          </div>
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
                  "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại."}
              </div>
            )}

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Họ và tên"
                      className="w-full border border-gray-200 rounded-md px-4 py-2 h-12 focus:border-blue-500 focus:ring-blue-500"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="w-full border border-gray-200 rounded-md px-4 py-2 h-12 focus:border-blue-500 focus:ring-blue-500"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                        placeholder="Password"
                        className="w-full border border-gray-200 rounded-md px-4 py-2 h-12 pr-12 focus:border-blue-500 focus:ring-blue-500"
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

            {/* Terms and Conditions */}
            <div className="text-center text-[#637381] text-xs mt-4">
              Bằng cách đăng ký, tôi đồng ý với
            </div>
            <div className="flex justify-center items-center w-full mt-1 gap-1">
              <div className="underline text-xs cursor-pointer hover:text-blue-600">
                Điều khoản dịch vụ
              </div>
              <div className="text-center text-[#637381] text-xs">và</div>
              <div className="underline text-xs cursor-pointer hover:text-blue-600">
                Chính sách bảo mật
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="font-semibold text-white bg-[#2F57EF] hover:bg-[#254bdc] disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl mt-4 w-full h-12"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang tạo tài khoản...
                </>
              ) : (
                "Tạo tài khoản"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-[#637381] text-sm my-5">Hoặc</div>

        <Button
          type="button"
          onClick={handleGoogleRegister}
          disabled={isPending}
          variant="outline"
          className="font-semibold text-white bg-[#919EAB8f] hover:bg-[#919EABa0] disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl w-full h-12 flex justify-center items-center gap-2 border-none"
        >
          <Image
            src={logoGoogle}
            alt="Google logo"
            className="h-6 w-6 object-cover"
          />
          Đăng ký với Google
        </Button>
      </div>
    </div>
  );
}

export default RegisterPage;
