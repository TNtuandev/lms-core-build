import React from "react";
import "./index.css";
import Image from "next/image";
import { CourseTab } from "@/components/courses/course-tab";
import { Banner } from "@/components/home/Banner";
import { CourseIntro } from "@/components/home/CourseIntro";
import { Explore } from "@/components/home/Explore";
import { WhyUsSection } from "@/components/home/WhyUsSection";

function HomePage() {
  return (
    <div>
      <Banner />
      <Image
        className="w-full"
        src="/images/home/img_5.png"
        alt="banner"
        height={120}
        width={2200}
      />
      <div className="md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto w-full flex flex-col items-center justify-center gap-20 px-6">
        <CourseIntro />
        <CourseTab />
        <Explore />
        <WhyUsSection />
      </div>
    </div>
  );
}

export default HomePage;
