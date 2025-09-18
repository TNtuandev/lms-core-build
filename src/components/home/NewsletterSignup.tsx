"use client";

import { Input, message } from "antd";
import { SendOutlined, MailOutlined } from "@ant-design/icons";
import Image from "next/image";
import React, { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email.trim()) {
      message.warning("Vui lòng nhập email trước khi đăng ký.");
      return;
    }

    console.log("Email đã đăng ký:", email);
    setEmail("");
    message.success("Đã gửi đăng ký thành công!");
  };

  return (
    <section className="pb-16 md:pb-24 bg-cover bg-center ">
      <div
        className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 rounded-[20px] p-10 md:p-20"
        style={{
          backgroundImage: "url('/images/home/newsletter-bg.png')",
        }}
      >
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/images/home/newsletter-illustration.png"
            alt="Đăng ký nhận tin"
            width={400}
            height={400}
            className="max-w-[200px] max-h-[200px] md:max-w-[400px] l md:max-h-[400px] h-auto w-auto"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left mt-4  md:mt-0">
          <h2 className=" text-2xl md:text-5xl font-bold mb-4">
            Đăng ký nhận bản tin của chúng tôi
          </h2>
          <p className="text-base md:text-xl mb-6">
            Nhận ưu đãi độc quyền & thông tin mới nhất mỗi tuần!
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 max-w-full sm:max-w-md mx-auto sm:mx-0">
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md w-full mx-auto">
              <MailOutlined className="text-gray-400 text-lg mr-2 mt-1" />
              <Input
                placeholder="Nhập địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="!border-none shadow-none focus:ring-0 focus:outline-none text-sm"
                style={{ flex: 1 }}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="bg-[#7B61FF] text-white px-6 py-2 rounded-full flex items-center justify-center gap-1 hover:bg-[#6346f8] transition text-sm whitespace-nowrap w-full sm:w-auto"
            >
              Đăng ký <SendOutlined className="home-send-email-button" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
