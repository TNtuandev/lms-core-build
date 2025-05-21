"use client";

import React from "react";
import "./index.css";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { LIST_FOUNDATION } from "@/contants/about";
import ReactPlayer from "react-player";

function AboutPage() {



  return <div className="flex flex-col gap-[120px]">
    <div className="section-header flex items-center justify-center h-[535px] mt-[72px]">
      <div className="max-w-3/4 flex-col flex items-center">
        <div className="text-secondary-main text-center font-bold text-xl">Tầm nhìn của chúng tôi</div>
        <div className="text-white text-3xl font-bold text-center pt-4">Chúng tôi hình dung một thế giới mà bất kỳ ai, ở bất kỳ đâu cũng có khả năng thay đổi cuộc sống của mình thông qua việc học.</div>
        <Button variant="default" className="mt-8 text-center  bg-primary-main h-10 shadow-md hover:shadow-xl hover:shadow-primary-main/20 transition-shadow duration-300 text-white px-4 py-1.5 rounded-[10px]">
          <span className="mr-2 text-white">Xem thêm về chúng tôi</span>
          <ArrowRight size="24" color="white"/>
        </Button>
      </div>
    </div>

    <div id="section-2" className='flex gap-16'>
      <div className="flex flex-col justify-center relative w-1/2">
        <Image src="/images/about/img.png" className="absolute top-0 z-0" width={250} height={490} alt="Đọc sách"/>
        <Image src="/images/about/img_1.png" className="self-end" width={300} height={250} alt="Đọc sách"/>
        <Image src="/images/about/img_2.png" className="self-center pt-16 relative z-10" width={400} height={490} alt="Đọc sách"/>
      </div>
      <div className="w-1/2 flex flex-col justify-center">
        <div className="bg-gradient-to-r from-[#2F57EF] to-[#FFB145] bg-clip-text text-transparent w-fit text-lg font-semibold">
          Hiểu về chúng tôi
        </div>
        <div className="text-3xl leading-12 font-bold pb-2">Tìm hiểu về nền tảng học tập KiTE</div>
        <div className="text-secondary">KiTE Academy là nền tảng học tập trực tuyến hiện đại, mang đến trải nghiệm giáo dục linh hoạt và hiệu quả cho học sinh ở mọi lứa tuổi. Với triết lý "học mọi lúc, mọi nơi", KiTE Academy nổi bật với những tính năng sau:</div>
        <div className="grid grid-cols-1 w-5/6 pt-8 gap-8">
          {LIST_FOUNDATION.map((item) => (
            <div className="flex gap-4" key={item.title}>
              {item.icon}
              <div className="text-lg flex-1">
                <div className="font-bold">{item.title}</div>
                <div className="pt-2 text-secondary text-justify">{item.description}</div>
              </div>
            </div>
          ))}
          <Button variant="default" className="text-center w-fit bg-primary-main h-12 shadow-md hover:shadow-xl hover:shadow-primary-main/20 transition-shadow duration-300 text-white px-4 py-1.5 rounded-[10px]">
            <span className="mr-2 text-white font-bold">Học ngay hôm nay</span>
            <ArrowRight size="24" color="white"/>
          </Button>
        </div>
      </div>
    </div>

    <div id="selection-3" className="flex gap-16">
      <div className="w-1/2 flex flex-col justify-center">
        <div className="bg-gradient-to-r from-primary-main to-secondary-main bg-clip-text text-transparent w-fit text-lg font-semibold">
          Chúng tôi làm việc thế nào
        </div>
        <div className="text-3xl leading-12 font-bold pb-2">Xây dựng sự nghiệp và nâng cao cuộc sống của bạn</div>
        <div className="text-secondary">Tại KiTE Academy, chúng tôi kết hợp công nghệ hiện đại, phương pháp giảng dạy tiên tiến và sự tận tâm của đội ngũ giảng viên để mang đến trải nghiệm học tập linh hoạt, cá nhân hóa và hiệu quả cho từng học viên.</div>
        <Button variant="default" className="text-center w-fit mt-8 bg-primary-main h-12 shadow-md hover:shadow-xl hover:shadow-primary-main/20 transition-shadow duration-300 text-white px-4 py-1.5 rounded-[10px]">
          <span className="mr-2 text-white font-bold">Học ngay hôm nay</span>
          <ArrowRight size="24" color="white"/>
        </Button>
      </div>
      <div className="w-1/2 rounded-2xl overflow-hidden">
        <ReactPlayer url='https://youtu.be/YtLx_sfJquA?si=XrL1aUfiOoxyuxXY' />
      </div>
    </div>

    <div id="selection-4" className="flex gap-10">
      <div className="w-1/4 flex flex-col justify-center">
        <div className="bg-gradient-to-r from-primary-main to-secondary-main bg-clip-text text-transparent w-fit text-lg font-semibold">
          Nhận xét và đánh giá
        </div>
        <div className="text-3xl leading-12 font-bold pb-2">Học viên nói gì về khóa học của chúng tôi</div>
        <div className="text-secondary">Nhận xét của học viên về khóa học họ đã học cùng chúng tôi. Từ dùng thử đến đăng ký</div>
      </div>
      <div className="w-full grid grid-cols-2 gap-8">
        {
          [1,2,3,4].map((item) => (
            <div key={item} className="p-8 boxShadow rounded-2xl bg-white relative">
              <div className="absolute right-8 top-8">
                <svg width="52" height="40" viewBox="0 0 52 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30.17 39.34L38.43 20.3L31.22 19.6V0H51.94V17.29L37.87 39.34H30.17ZM0 39.34L8.12 20.3L0.98 19.6V0H21.63V17.29L7.56 39.34H0Z" fill="#D14EA8" fill-opacity="0.16"/>
                </svg>
              </div>
              <div className="flex gap-4 items-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary-main to-secondary-main p-0.25">
                  <Image src="/images/about/avatar_1.jpg" alt="Avatar" height={60} width={60} className="rounded-full w-full height-full p-0.25"/>
                </div>
                <div className="text-lg">
                  <div className="font-bold">Adrienne Nolan</div>
                  <div className="text-secondary">Student</div>
                </div>
              </div>
              <div className="mt-3 text-base text-secondary">Like this histudy, vulputate at sapien sit amet,auctor iaculis lorem. In vel hend rerit.</div>
            </div>
          ))
        }
      </div>
    </div>
  </div>;
}

export default AboutPage;
