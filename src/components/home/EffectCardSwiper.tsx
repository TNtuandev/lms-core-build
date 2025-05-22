"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-cards';
import CourseCard from "@/components/courses/course-card";
import React from "react";

export default function EffectCardSwiper() {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="mySwiper"
    >
      {[1,2,3].map((item) => (
        <SwiperSlide key={item}>
          <CourseCard
            badge="NEW"
            title="Difficult Things About Education."
            imageUrl="/images/banner-sign-in.png"
            category="Khóa học Thiết kế"
            courseName="Thiết kế giao diện người dùng và trải nghiệm (UI/UX)"
            instructor="Anh Tuấn, Quang Anh"
            lessonCount={12}
            studentCount={768}
            currentPrice="529,000"
            originalPrice="1,769,000"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}