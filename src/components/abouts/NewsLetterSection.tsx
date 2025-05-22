import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  return (
    <section className="relative bg-primary-main bg-blend-overlay bg-cover bg-center text-white py-20 px-4">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/about/img_3.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      ></div>

      <div className="relative z-20 md:max-w-3xl text-white max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto w-full text-center">
        <div className="text-lg text-white mb-2 font-bold">Nhận bản tin cập nhật</div>
        <div className="text-5xl font-bold mb-2 text-white leading-16">
          Đăng ký nhận bản tin<br />
          của chúng tôi
        </div>
        <p className="text-white mb-8">
          Nhận ưu đãi độc quyền và thông tin mới nhất mỗi tuần!
        </p>

        <form className="bg-white rounded-xl w-fit p-2 flex flex-col md:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Vd: kiteacademy@gmail.com"
            className="w-full md:w-[350px] px-4 py-3 rounded-lg text-primary-contrastText placeholder-gray-400 focus:outline-none"
          />
          <Button
            type="submit"
            className="bg-secondary-main hover:bg-secondary-light text-primary-contrastText font-semibold px-6 py-2 rounded-lg whitespace-nowrap flex items-center gap-2"
          >
            Đăng ký
            <ArrowRight size="24" color="#212B36" />

          </Button>
        </form>

        <p className="text-white mt-4 font-bold">
          Không quảng cáo, Không thử nghiệm, Không cam kết
        </p>

        <div className="flex justify-center gap-12 mt-12 text-center items-stretch">
          <div>
            <div className="text-white text-5xl font-bold">100+</div>
            <div className="text-white font-semibold text-xl my-2">Được đào tạo thành công</div>
            <div className="text-base text-white">Học viên hoàn thành</div>
          </div>
          <div className="w-[1px] bg-white/32 "></div>
          <div className="text-white">
            <div className="text-white text-5xl font-bold">60K+</div>
            <div className="text-white font-semibold text-xl my-2">Học viên được ứng nhận</div>
            <div className="text-white text-base ">Khóa học online</div>
          </div>
        </div>
      </div>
    </section>
  );
}
