import React from "react";
import { Title } from "@/components/common/Title";
import { CONTACT } from "@/contants/contact";
import { ArrowRight2 } from "iconsax-react";
import Image from "next/image";
import { TEACHER_LIST } from "@/contants/instructor";
import { clsx } from "clsx";

function InstructorListPage() {
  return <div>
    <div className="bg-gradient-to-tr from-primary-main/16  to-secondary-main/16 h-[300px]">
      <div className="px-6 md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto w-full flex flex-col items-center justify-center h-full">
        <div className="font-bold text-5xl leading-16">Giảng viên</div>
        <div className="mt-2 text-sm flex items-center justify-between gap-2">
          <span>Trang chủ</span>
          <ArrowRight2
            size="14"
            color="#212B36"
          />
          <span className="text-secondary">Giảng viên</span>
        </div>
      </div>
    </div>
    <div className="bg-gradient-to-br from-primary-light  to-primary-main">
      <div className="py-32 px-6 md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto w-full flex flex-col items-center justify-center h-full">
        <div className='font-semibold text-white text-lg'>Giảng viên của chúng tôi</div>
        <div className="mt-2 font-bold text-white text-3xl leading-12">Đội ngũ giảng viên chuyên nghiệp</div>
        <div className="grid grid-cols-12 grid-rows-5 gap-8 mt-10">
          {TEACHER_LIST.map((item, idx) => (
            <div key={idx}
                 className={clsx('p-2.5 bg-white/16 rounded-2xl', item.containerClass)}>
              <Image
                className="w-full h-full rounded-2xl"
                src={item.images}
                alt=""
                width={250}
                height={350} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>;
}

export default InstructorListPage;
