"use client";

import Image from "next/image";
import React from "react";
import IconArrowRightTop from "../../../public/icons/home/IconArrowRightTop";
import IconLike from "../../../public/icons/home/IconLike";
import { CircleTextAnimation } from "@/components/home/CircleTextAnimation";

export function Banner() {
  return (
    <div className="home-selection lg:h-[900px] mt-16 sm:mt-20 pb-10 lg:mt-0">
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start pt-16 sm:pt-24 lg:pt-32 gap-6 lg:gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start xs:w-full">
          <div className="text-5xl md:text-7xl font-extrabold leading-tight">
            Vui Học Hóa: <br /> Nơi Ươm Mầm
            <br /> Khoa Học!
          </div>
          <div className="flex items-center gap-4 mt-4 lg:mt-6">
            <div className="flex">
              <IconArrowRightTop />
              <IconLike />
            </div>
            <div>
              <div className="text-primary text-base sm:text-lg">
                Đăng ký miễn phí
              </div>
              <div className="text-secondary text-base sm:text-lg">
                Ngay hôm nay
              </div>
            </div>
          </div>
          <div className="flex gap-6 lg:gap-10 mt-8 lg:mt-0 flex-shrink-0 w-full">
            <Image
              className="mt-6 lg:mt-16 mx-auto w-[45%] md:w-[230px] sm:mx-0 flex-shrink-0"
              src="/images/home/banner_register.png"
              alt="banner"
              height={200}
              width={230}
            />
            <div className="bg-white w-[45%] md:w-max p-4 sm:p-6 rounded-2xl lg:rounded-4xl relative max-w-sm mx-auto sm:mx-0 flex-shrink-0">
              <div className="font-bold text-lg sm:text-xl lg:text-2xl mt-14 lg:mt-10">
                Hóa Học Diệu Kỳ: <br /> Mở Ra Tương Lai!
              </div>
              <div className="mt-3 lg:mt-4 text-secondary text-sm sm:text-base">
                Biến những phản ứng hóa học <br /> thành cuộc phiêu lưu lý thú
                và <br /> đầy bất ngờ!
              </div>
              <div className="absolute -top-[20%] sm:-top-[25%] lg:-top-[30%] left-[20%] scale-75 sm:scale-90 lg:scale-100">
                <CircleTextAnimation />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 mt-8 hidden md:block lg:mt-0">
          <Image
            className="max-w-full h-auto"
            src="/images/home/banner_right.png"
            alt="banner"
            height={682}
            width={440}
            priority
          />
        </div>
      </div>
    </div>
  );
}
