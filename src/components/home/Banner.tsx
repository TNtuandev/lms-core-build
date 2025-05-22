import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-react";
import Image from "next/image";
import { CircleTextAnimation } from "@/components/home/CircleTextAnimation";
import EffectCardSwiper from "@/components/home/EffectCardSwiper";
import React from "react";

export function Banner() {
  return (
    <div className="home-selection h-[900px]">
      <div className="md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto w-full h-full flex items-end gap-16">
        <div className="w-1/2">
          <div className="flex flex-col gap-6">
            <div className="text-secondary-dark rounded-[500px] bg-[#FFB1451F] px-3 py-1 inline-block w-fit">
              Giảm 20% cho lần đăng ký đầu tiên
            </div>
            <div className="text-text-primary font-black text-[5rem] leading-[6rem] relative w-fit">
              KHÓA HỌC
              <br/>
              TRỰC TUYẾN
              <div className="absolute bottom-0 right-[-70px] bg-secondary-main rounded-[500px] px-2 py-1.5 text-base rotate-[12deg]">
                <span className="font-bold">299k</span>
                <span className="font-normal">/tháng</span>
              </div>
            </div>
            <div className="text-secondary text-xl">Tiếp cận thế giới tri thức trong tầm tay và thay đổi hành trình học tập của bạn</div>
          </div>
          <div className="flex gap-4 pt-16">
            <Button variant="default" className="bg-primary-main h-10  shadow-md hover:shadow-xl hover:shadow-primary-main/20 transition-shadow duration-300 text-white px-4 py-1.5 rounded-[10px]">
              Tham gia miễn phí{" "}
              <ArrowRight
                size="16"
                color="white"
              />
            </Button>
            <Button variant="outline" className="h-10 border-[1px] font-bold border-primary-main">
              Xem khoá học{" "}
              <ArrowRight
                size="16"
                color="#2F57EF"
              />
            </Button>
          </div>
          <div className="pt-32 pb-20 flex justify-between">
            <div className="w-52">
              <div className="font-bold text-3xl text-primary-main">26K+</div>
              <div className="text-text-primary">Tổng khóa học</div>
            </div>
            <div className="w-52">
              <div className="font-bold text-3xl text-error-main">150+</div>
              <div className="text-text-primary">Giảng viên</div>
            </div>
            <div className="w-52">
              <div className="font-bold text-3xl text-infor">120K+</div>
              <div className="text-text-primary">Học viên đăng ký</div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
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