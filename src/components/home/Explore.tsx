"use client";

import Image from "next/image";
import { Row, Col } from "antd";
import React from "react";

function FeatureBlock({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="h-16 w-16 rounded-full flex items-center justify-center shrink-0 mb-6">
        <Image src={icon} alt="icon" width={64} height={64} />
      </div>
      <div>
        <h4 className="text-2xl lg:text-3xl font-bold text-[#212B36] leading-snug mb-6">
          {title}
        </h4>
        <p className="text-sm lg:text-base text-[#637381] mt-2">
          {description}
        </p>
      </div>
    </div>
  );
}

export function Explore() {
  return (
    <section className="bg-white mb-20 md:mb-[120px]">
      <div className="container mx-auto px-6 lg:px-20 ">
        <div className="text-center lg:text-left mb-16 space-y-2">
          <h2 className="text-2xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-[#6D5DFB] to-[#2CD4D9] text-transparent bg-clip-text">
              Khám Phá Thế Giới Java
            </span>
          </h2>
          <h3 className="text-2xl lg:text-5xl font-extrabold text-[#0E0F1C] mb-4">
            Cùng Brainsploit!
          </h3>
          <p className="text-gray-600 max-w-2xl mt-4">
            Chúng tôi không chỉ dạy bạn cách viết code, mà còn giúp bạn hiểu sâu
            sắc về cách tư duy như một lập trình viên, giải quyết vấn đề và sáng
            tạo không giới hạn.
          </p>
        </div>

        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <FeatureBlock
              icon="/images/home/star-purple.png"
              title="Bắt Đầu Từ Số 0, Trở Thành Anh Hùng Code"
              description="Lộ trình học Java của Brainsploit được thiết kế để đưa bạn từ những khái niệm cơ bản nhất đến việc xây dựng các ứng dụng phức tạp."
            />
          </Col>
          <Col xs={24} md={12}>
            <Image
              src="/images/home/code-screen-2.png"
              alt="Java Code Example 1"
              width={600}
              height={300}
              className="w-full rounded-xl shadow-md"
            />
          </Col>

          <Col xs={24} md={12} className="order-1 md:order-2">
            <FeatureBlock
              icon="/images/home/diamond-cyan.png"
              title="Học Mà Chơi, Chơi Mà Học Với Dự Án Thực Tế"
              description="Tại Brainsploit, bạn sẽ được thử sức với các dự án Java thực tế, từ việc tạo ra những trò chơi vui nhộn đến những chương trình thú vị và khắc khe."
            />
          </Col>
          <Col xs={24} md={12} className="order-2 md:order-1">
            <Image
              src="/images/home/code-screen-3.png"
              alt="Java Code Example 2"
              width={600}
              height={300}
              className="w-full rounded-xl shadow-md"
            />
          </Col>
        </Row>
      </div>
    </section>
  );
}
