"use client";

import Image from "next/image";
import React from "react";
import IconArrowRightTop from "../../../public/icons/home/IconArrowRightTop";
import IconLike from "../../../public/icons/home/IconLike";

export function WhyUsSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center items-center lg:items-start px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <div className="flex-shrink-0 order-2 lg:order-1">
        <Image
          className="max-w-full h-auto w-full lg:max-w-none"
          src="/images/home/banner_difference.png"
          alt="banner"
          height={600}
          width={600}
          priority
        />
      </div>
      <div className="order-1 lg:order-2 text-center lg:text-left max-w-2xl lg:max-w-none">
        <div className="text-[#1959FF] font-bold text-lg sm:text-xl">
          ĐIỂM KHÁC BIỆT
        </div>
        <div className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mt-3">
          Điểm Khác Biệt
          <br /> của Chúng Tôi với
          <br /> Những Nền Tảng
          <br /> Khác?
        </div>
        <div className="mt-4 text-secondary text-sm sm:text-base lg:text-base">
          Không chỉ kiến thức, bé còn rèn kỹ năng mềm,
          <br className="hidden sm:block" /> tư duy sáng tạo và lòng yêu khoa
          học.
        </div>
        <div className="flex items-center justify-center lg:justify-start gap-4 mt-6">
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
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-6">
          <div className="flex flex-col items-center bg-[#82FFCE] p-4 sm:p-6 w-full sm:w-40 lg:w-3xs rounded-3xl lg:rounded-[40px]">
            <div className="text-2xl sm:text-3xl font-bold">26K+</div>
            <div className="text-sm sm:text-base text-center">
              Giáo Trình Riêng
            </div>
          </div>
          <div className="flex flex-col items-center bg-[#F4F6F8] p-4 sm:p-6 w-full sm:w-40 lg:w-3xs rounded-3xl lg:rounded-[40px]">
            <div className="text-2xl sm:text-3xl font-bold">1000+</div>
            <div className="text-sm sm:text-base text-center">
              Giáo Viên Chuyên Môn
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
