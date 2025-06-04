"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-react";
import Image from "next/image";
import { CircleTextAnimation } from "@/components/home/CircleTextAnimation";
import EffectCardSwiper from "@/components/home/EffectCardSwiper";
import React from "react";
import {useRouter} from "next/navigation";
import {Routes} from "@/lib/routes/routes";

export function Banner() {
  const router = useRouter();

  const handleNavigateToCourse = () => {
    router.push(Routes.courses);
  };

  return (
    <div className="home-selection lg:h-[900px] mt-20 lg:mt-0">
      <div className="md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto w-full h-full flex items-end gap-16 px-4">
        <div className="lg:w-1/2 w-full">
          <div className="flex flex-col gap-6 items-center lg:items-start">
            <div className="text-secondary-dark rounded-[500px] bg-[#FFB1451F] px-3 py-1 inline-block w-fit">
              Giảm 20% cho lần đăng ký đầu tiên
            </div>
            <div className="text-text-primary font-black text-5xl leading-16 text-center lg:text-start lg:text-[5rem] lg:leading-[6rem] relative w-fit">
              KHÓA HỌC
              <br/>
              TRỰC TUYẾN
              <div className="lg:block hidden absolute bottom-0 right-[-70px] bg-secondary-main rounded-[500px] px-2 py-1.5 text-base rotate-[12deg]">
                <span className="font-bold">299k</span>
                <span className="font-normal">/tháng</span>
              </div>
            </div>
            <div className="text-secondary text-xl">Tiếp cận thế giới tri thức trong tầm tay và thay đổi hành trình học tập của bạn</div>
          </div>
          <div className="flex lg:flex-row flex-col gap-4 pt-8 lg:pt-16 items-center lg:items-start">
            <Button style={{padding: '11px 22px'}} variant="default" className="bg-primary-main h-12 w-fit shadow-md hover:shadow-xl font-bold hover:shadow-primary-main/20 transition-shadow duration-300 text-white px-4 py-1.5 rounded-[10px]">
              Tham gia miễn phí{" "}
              <ArrowRight
                size="16"
                color="white"
              />
            </Button>
            <Button style={{padding: '11px 22px'}} onClick={handleNavigateToCourse} variant="outline" className="h-12 border-[1px] w-fit font-bold border-primary-main rounded-[10px]">
              Xem khoá học{" "}
              <ArrowRight
                size="16"
                color="#2F57EF"
              />
            </Button>
          </div>
          <div className="lg:pt-32 lg:pb-20 py-8 flex justify-between">
            <div className="lg:w-52 flex-1 lg:text-left text-center">
              <div className="font-bold text-3xl text-primary-main">26K+</div>
              <div className="text-text-primary text-sm">Tổng khóa học</div>
            </div>
            <div className="lg:w-52 flex-1 lg:text-left text-center">
              <div className="font-bold text-3xl text-error-main">150+</div>
              <div className="text-text-primary text-sm">Giảng viên</div>
            </div>
            <div className="lg:w-52 flex-1 lg:text-left text-center">
              <div className="font-bold text-3xl text-infor">120K+</div>
              <div className="text-text-primary text-sm">Học viên đăng ký</div>
            </div>
          </div>

          {/*Mobile*/}
          <div className="py-8 lg:hidden w-[80%] mx-auto">
            <EffectCardSwiper />
          </div>
        </div>
        <div className="w-1/2 lg:block hidden">
          <div className="flex gap-8 items-center">
            <div className="basis-1/2">
              Chương trình đào tạo và phát triển đẳng cấp thế giới được phát triển bởi các giáo viên hàng đầu
            </div>
            <div className="basis-1/2 flex gap-3">
              <Image src="/images/home/img_1.png" alt="Counter" className="" width="136" height="56"/>
              <div>
                <h3 className="text-primary-main font-bold">60K+</h3>
                <div className="text-sm">Học viên được chứng nhận</div>
              </div>
            </div>
          </div>
          <div className="pt-8 relative">
            <Image className="" src="/images/home/img_2.png" alt="Sinh_Vien" height={600} width={420} />
            <div className="absolute bottom-[13%] left-[-5%]">
              <CircleTextAnimation />
            </div>
            <div className="absolute w-[330px] top-[80px] right-0">
              <EffectCardSwiper />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}