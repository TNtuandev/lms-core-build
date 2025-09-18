"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Row, Col } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes/routes";
import { useAuthContext } from "@/context/AuthProvider";

export function Banner() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  const handleNavigateToCourse = () => {
    router.push(Routes.courses);
  };

  const handleNavigateToLogin = () => {
    if (isAuthenticated) {
      router.push(Routes.courses);
    } else {
      router.push(Routes.login);
    }
  };

  return (
    <section className="bg-white mt-20">
      <div className="container mx-auto px-6 lg:px-20">
        <Row gutter={[32, 32]} align="middle" className="mb-4">
          <Col xs={24} sm={16} lg={18}>
            <div className="text-left space-y-4">
              <Image
                src="/images/home/title.png"
                alt="Code Here Code Now"
                width={547}
                height={200}
                className="mx-auto lg:mx-0"
              />
              <p className="text-base lg:text-lg text-[#212B36]">
                Chúng tôi không chỉ dạy code. <br />
                Chúng tôi kiến tạo tương lai.
              </p>
            </div>
          </Col>

          <Col xs={0} sm={8} lg={6}>
            <div className="flex flex-col items-center">
              <Image
                src="/images/home/brain_network.png"
                alt="Brain Network"
                width={400}
                height={400}
                className="mx-auto"
              />
            </div>
          </Col>
        </Row>

        <Row gutter={[32, 32]} align="middle" className="mb-16">
          <Col xs={24} md={12} lg={10}>
            <div className="space-y-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Image
                  src="/images/home/img_1.png"
                  alt="Counter"
                  width={136}
                  height={56}
                />
              </div>

              <p className="text-sm font-semibold text-[#0E0F1C]">
                ĐÂY LÀ LÚC BẠN THAM GIA.{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6D5DFB] to-[#AE67FA]">
                  HÃY CÙNG CHÚNG TÔI TẠO NÊN CỘNG ĐỒNG LẬP TRÌNH TUYỆT VỜI!
                </span>
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-10 pt-2">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#6D5DFB]">26K+</div>
                  <div className="text-sm text-[#0E0F1C]">Tổng khóa học</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#6D5DFB]">150+</div>
                  <div className="text-sm text-[#0E0F1C]">Giảng viên</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#6D5DFB]">60K+</div>
                  <div className="text-sm text-[#0E0F1C]">
                    Học viên hài lòng
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={24} md={12} lg={14}>
            <div className="flex flex-col md:flex-row items-center lg:items-center justify-between gap-6 lg:gap-12 text-center lg:text-left">
              {/* LEFT SIDE: Text + Buttons */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-semibold mb-12">
                    ✔ Brainsploit
                  </h3>
                  <p className="text-sm text-[#0E0F1C] max-w-sm mb-3">
                    Chúng tôi trao quyền cho các lập trình viên trẻ, phát triển
                    kỹ năng tư duy và kết nối các ý tưởng sáng tạo thành hiện
                    thực.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-center lg:justify-start gap-3 pt-2">
                  <Button
                    onClick={handleNavigateToLogin}
                    className="bg-[#6D5DFB] h-10 px-5 rounded-full text-white font-semibold shadow-sm"
                  >
                    Bắt đầu ngay
                  </Button>
                  <Button
                    onClick={handleNavigateToCourse}
                    className="h-10 w-10 rounded-full bg-[#6D5DFB] flex items-center justify-center text-white font-bold text-lg"
                  >
                    ➤
                  </Button>
                </div>
              </div>

              <div className="shrink-0">
                <div className="hidden md:flex border border-[#0E0F1C] h-64 w-24 rounded-full items-center justify-center text-center text-sm text-[#0E0F1C] leading-5 px-2">
                  Hãy cùng nhau làm điều gì đó ↓
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Image
          src="/images/home/code-screen-1.png"
          alt="Brain Network"
          width={1360}
          height={779}
        />
      </div>
    </section>
  );
}
