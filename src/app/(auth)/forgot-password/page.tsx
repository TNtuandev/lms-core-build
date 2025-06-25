"use client";

import React from "react";
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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Schema validation for Login
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
});

type ForgorPasswordFormData = z.infer<typeof loginSchema>;

function ForgotPasswordPage() {
  const { mutate: login, isPending, error } = useLogin();
  const router = useRouter();

  const form = useForm<ForgorPasswordFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgorPasswordFormData) => {
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
          Quên mật khẩu
        </div>
        <div className="flex gap-2 text-sm text-[#212B36]">
          <div className="text-center">Vui lòng nhập địa chỉ email được liên kết với tài khoản của bạn và chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu.</div>
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
                      className="w-full border border-gray-200 rounded-[10px] px-4 py-2 h-12 focus:border-blue-500 focus:ring-blue-500"
                      disabled={isPending}
                      {...field}
                    />
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
                  Đang gửi yêu cầu...
                </>
              ) : (
                "Gửi yêu cầu"
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

export default ForgotPasswordPage;
