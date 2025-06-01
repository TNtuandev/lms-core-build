"use client";

import React from "react";
import Image from "next/image";
import { bannerSignIn, logoGoogle, logoMini } from "@/contants/images";
import {useAuthStore} from "@/store/slices/auth.slice";
import {Routes} from "@/lib/routes/routes";
import { useRouter } from "next/navigation";

function LoginPage() {

  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleLogin = () => {
    setAuth({
      id: '1',
      email: "",
      name: "Nguyễn Văn A",
    }, "token_example");
    router.push(Routes.home);

  }

  return (
    <div className="flex w-full flex-col md:flex-row">
      <Image
        src={logoMini}
        alt="logmini"
        className="md:hidden block h-full m-4 mb-10"
      />
      <Image
        src={bannerSignIn}
        alt="banner"
        className="h-screen object-cover hidden md:block"
      />
      <div className="flex flex-col justify-center items-center w-full px-6 md:px-8">
        <div className="text-[#212B36] font-semibold text-2xl md:text-3xl mb-3">
          Chào mừng bạn trở lại
        </div>
        <div className="flex gap-2 text-sm text-[#212B36]">
          <div>Bạn chưa phải là thành viên?</div>
          <div className="text-[#2F57EF]">Đăng ký</div>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4 mt-[40px]">
          <input
            type="text"
            placeholder="Email"
            className="w-full mt-4 border border-gray-200 rounded-md px-4 py-2 h-12"
          />
          <input
            type="text"
            placeholder="Password"
            className="w-full mt-2 border border-gray-200 rounded-md px-4 py-2 h-12"
          />
        </div>
        <div className="flex justify-end items-end w-full">
          <div className="underline mt-4 text-xs">Quên mật khẩu?</div>
        </div>
        <button onClick={handleLogin} className="font-semibold text-white bg-[#2F57EF] rounded-xl mt-4 w-full h-12">
          Đăng nhập
        </button>
        <div className="text-center text-[#637381] text-sm my-5">Hoặc</div>
        <button className="font-semibold text-white bg-[#919EAB8f] rounded-xl w-full h-12 flex justify-center items-center gap-2">
          <Image
            src={logoGoogle}
            alt="banner"
            className="h-6 w-6 object-cover"
          />
          Đăng nhập với Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
