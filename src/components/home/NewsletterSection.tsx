"use client";

import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NewsletterSection() {
  return (
    <div className="bg-[#212B36] w-full md:max-w-[1280px] md:mx-8 mx-4 md:p-16 p-8 mb-20 rounded-[48px]">
      <div className="flex justify-between items-center">
        <div className="text-[#82FFCE] text-xl font-bold">NHẬN BẢN TIN</div>
        <Image
          className=""
          src="/images/home/logo_chemistry.png"
          alt="banner"
          height={40}
          width={40}
        />
      </div>
      <div className="flex justify-between flex-col md:flex-row mt-4 gap-10">
        <div className="text-white md:text-5xl text-3xl font-extrabold leading-14">
          Nhận ưu đãi độc quyền <br /> & thông tin mới nhất <br /> mỗi tuần!
        </div>
        <div className="text-secondary text-lg">
          Đăng ký nhận bản tin của Vui Học Hóa ngay hôm
          <br /> nay để được cập nhật những ưu đãi đặc biệt dành
          <br /> riêng cho thành viên và các thông tin thú vị về thế
          <br /> giới hóa học mỗi tuần!
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <div className="bg-white rounded-full p-2 flex items-center justify-end gap-4">
          <input
            type="email"
            placeholder="Vd: vuihochoa@gmail.com"
            className="w-full md:w-[350px] px-4 py-3 rounded-lg bg-white text-primary-contrastText placeholder-gray-400 focus:outline-none"
          />
          <Button
            type="submit"
            className="bg-[#212B36] text-primary-contrastText font-semibold px-8 py-2 rounded-full whitespace-nowrap flex items-center gap-2"
          >
            <ArrowRight size="24" color="#ffffff" />
          </Button>
        </div>
      </div>
    </div>
  );
}
