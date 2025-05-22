import { ArrowRight } from "iconsax-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function WhyUsSection() {

  return (
    <div>
      <div className="flex gap-8">
        <div className="text-5xl leading-16 font-bold">
          Tại sao chúng tôi khác biệt với những nền tảng khác?
        </div>
        <div className="flex flex-col justify-between py-3">
          <div className="text-secondary">
            Chúng tôi có những giáo viên chuyên nghiệp. Chúng tôi có những tính
            năng tuyệt vời hơn bất kỳ nền tảng nào khác
          </div>
          <button className="mt-4 font-bold justify-self-end text-primary-main w-fit flex items-center gap-2">
            Xem thêm về chúng tôi <ArrowRight size={20} color="#2F57EF" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-8 mt-12">

        <div className="col-span-2 rounded-2xl">
          <Image src="/images/home/img_6.png" alt="HS" width={300} height={300} />
        </div>

        <div className="col-span-4 rounded-2xl px-10 py-8 bg-primary-main/8 flex flex-col">
          <div className="text-primary-main font-bold text-3xl">Học Từ Mọi Nơi</div>
          <div className="mt-2 flex-1">Giáo dục trực tuyến đã trở nên phổ biến và quan trọng hơn trong những năm gần đây, đặc biệt là với những tiến bộ về công nghệ và khả năng tiếp cận Internet ngày càng cao.</div>
          <Button variant="default" className="mt-5 w-fit text-warning-dark bg-warning-dark/16 h-9 hover:bg-warning-dark/32 ">
            Xem ngay <ArrowRight size={20} color="#F57C00" />
          </Button>
        </div>

        <div className="col-span-2 rounded-2xl relative overflow-hidden">
          <Image
            src="/images/home/img_7.png" // thay bằng đúng path ảnh của bạn
            alt="Giảng viên"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 p-8 text-white flex flex-col justify-between">
            <h3 className="text-4xl font-bold leading-12 text-white">
              Giảng viên <br /> giàu kinh <br /> nghiệm
            </h3>
            <Button className="h-9 text-white w-fit bg-white/12 hover:bg-white/20">
              Xem ngay <ArrowRight size={20} color="white" />
            </Button>
          </div>
        </div>

        <div className="col-span-5 rounded-2xl overflow-hidden relative">
          <Image
            src="/images/home/img_8.png" // thay bằng đúng path ảnh của bạn
            alt="Giảng viên"
            width={1000}
            height={400}
            className="object-cover"
          />
          <div className="absolute inset-0 p-8 text-white flex flex-col justify-between">
            <h3 className="text-4xl font-bold leading-12 text-white">
              Các Lớp Học Linh Hoạt
            </h3>
            <div className="mt-2 flex-1 text-white">
              Giáo dục trực tuyến đã trở nên phổ biến và quan trọng hơn trong những năm gần đây, đặc biệt là với những tiến bộ về công nghệ và khả năng tiếp cận Internet ngày càng cao.
            </div>
            <Button className="h-9 mt-5 text-white w-fit bg-white/12 hover:bg-white/20">
              Xem ngay <ArrowRight size={20} color="white" />
            </Button>
          </div>
        </div>

        <div className="col-span-3 rounded-2xl">
          <Image
            src="/images/home/img_9.png" // thay bằng đúng path ảnh của bạn
            alt="Giảng viên"
            width={1000}
            height={300}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
}