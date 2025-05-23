"use client"

import {Header} from "@/components/common/Header";
import Image from "next/image";
import {Rating, RoundedStar} from '@smastrom/react-rating'

export function Feedback() {
  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: '#ffb700',
    inactiveFillColor: '#fbf1a9',
    size: 20,
  }

  return (
    <div className="flex flex-col items-center bg-feedback">
      <Header
        label="Nhận xét và đánh giá"
        title="Học viên nói gì về khóa học của chúng tôi"
        subTitle="Nhận xét của học viên về khóa học họ đã học cùng chúng tôi. Từ dùng thử đến đăng ký"
      />
      <div className="relative">

        <div
          className="absolute top-[-40%] left-[-30%] w-[1000px] h-[600px] bg-[#D14EA8] opacity-10 rounded-full blur-[200px]"></div>

        <div className="md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto w-full relative">
          <Image src="/images/home/img_15.png" alt="Img" width={2000} height={400} className="object-cover"/>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="max-w-[60%] flex gap-16 rounded-3xl p-12 bg-white/48 border-[1px] border-white/80 box-shadow-feedback">
              <Image className="rounded-2xl" src="/images/home/img_16.png" alt="Girl" width={300} height={400}/>
              <div>
                <div className="text-3xl leading-12">Lora Ochoa</div>
                <div className="mt-1">
                  <span className="font-semibold">@Lora25,</span>
                  <span className='text-secondary ml-1'>học viên</span>
                </div>
                <Rating
                  className="pt-4 pb-6"
                  style={{maxWidth: 100}}
                  value={5}
                  readOnly
                  itemStyles={myStyles}/>
                <div>
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                  alteration in some form, by injected humour.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}