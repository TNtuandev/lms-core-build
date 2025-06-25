"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { bannerSignIn, logoMini } from "@/contants/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function VerifyAccountPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      setError("Vui lòng nhập đầy đủ 6 chữ số");
      return;
    }

    setIsPending(true);
    setError("");

    try {
      // TODO: Implement verification API call
      console.log("Verification code:", verificationCode);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // On success, redirect to login or dashboard
      router.push("/login");
    } catch (err) {
      console.log("Verification error:", err);
      setError("Mã xác thực không hợp lệ. Vui lòng thử lại.");
    } finally {
      setIsPending(false);
    }
  };

  const handleResendCode = async () => {
    try {
      // TODO: Implement resend code API call
      console.log("Resending verification code");
      // Show success message
    } catch (err) {
      console.log("Resend code error:", err);
      setError("Không thể gửi lại mã. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="flex w-full flex-col md:flex-row">
      <Image
        src={bannerSignIn}
        alt="banner"
        className="h-screen object-cover w-full hidden md:block"
      />
      <div className="flex flex-col justify-center items-center w-full md:w-[30%] px-6 md:px-8 flex-shrink-0">
        <Image
          src={logoMini}
          alt="logmini"
          className="block m-4 md:mt-10 mt-[144px] h-[56px] w-[180px]"
        />

        <div className="text-[#212B36] font-semibold text-2xl md:text-3xl mb-3 text-center">
          Xác thực tài khoản
        </div>

        <div className="text-[#637381] text-sm text-center mb-8 leading-relaxed max-w-sm">
          Chúng tôi đã gửi mã xác nhận gồm 6 chữ số qua email. Vui lòng nhập mã
          vào ô bên dưới để xác minh email của bạn.
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-4 w-full text-center">
            {error}
          </div>
        )}

        {/* Verification Code Inputs */}
        <div className="flex gap-3 mb-8">
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-semibold border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
              maxLength={1}
              disabled={isPending}
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={isPending || code.some((digit) => !digit)}
          className="font-semibold text-white bg-[#2F57EF] hover:bg-[#254bdc] disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl w-full h-12 mb-6"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Đang xác thực...
            </>
          ) : (
            "Xác thực tài khoản"
          )}
        </Button>

        {/* Resend Code */}
        <div className="text-center text-sm mb-8">
          <span className="text-[#637381]">Bạn không nhận được mã? </span>
          <button
            onClick={handleResendCode}
            className="text-[#2F57EF] hover:underline cursor-pointer"
            disabled={isPending}
          >
            Gửi lại mã
          </button>
        </div>

        {/* Back to Login */}
        <button
          onClick={() => router.push("/login")}
          className="text-[#637381] text-sm hover:text-[#2F57EF] cursor-pointer flex items-center gap-1"
          disabled={isPending}
        >
          <span>←</span>
          Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
}

export default VerifyAccountPage;
