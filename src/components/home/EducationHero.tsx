"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Row, Col } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes/routes";

export function EducationHero() {
  const router = useRouter();
  const handleNavigateToLogin = () => {
    router.push(Routes.login);
  };
  return (
    <section className="bg-white mb-20 md:mb-[120px]">
      <div className="container mx-auto px-6 lg:px-20">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={12}>
            <div className="w-full flex justify-center">
              <Image
                src="/images/home/student-boy.png"
                alt="Student"
                width={500}
                height={600}
                className="w-full max-w-md object-contain rounded-[40px]"
              />
            </div>
          </Col>

          {/* Right Side - Text */}
          <Col xs={24} lg={12}>
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-3xl lg:text-5xl font-semibold text-[#0E0F1C] leading-tight">
                Nền Tảng Giáo Dục <br />
                Cho Tương Lai Thành <br />
                Công Của Bạn
              </h2>
              <p className="text-gray-600 text-sm lg:text-base max-w-md mx-auto lg:mx-0">
                Hãy sẵn sàng cho những thử thách công nghệ, ôn lại các khái niệm
                Java đã học một cách hiệu quả và nhận đánh giá tức thì về quá
                trình tiến bộ của bạn.
              </p>
              <Button
                onClick={handleNavigateToLogin}
                className="bg-[#16A1FF] text-white px-6 py-2 rounded-full font-semibold text-sm shadow-md"
              >
                Bắt đầu miễn phí
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
