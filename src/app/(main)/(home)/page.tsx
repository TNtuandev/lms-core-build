import React from "react";
import "./index.css";
import Image from "next/image";
import { Banner } from "@/components/home/Banner";
import { CourseIntro } from "@/components/home/CourseIntro";
import { Explore } from "@/components/home/Explore";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { StatsSection } from "@/components/home/StatsSection";
import {Feedback} from "@/components/home/Feedback";
import NewsletterSection from "@/components/abouts/NewsLetterSection";
import CourseTabComponent from "@/components/courses/components/CourseTabComponent";

function HomePage() {
  return (
    <div>
      <Banner />
      <Image
        className="w-full"
        src="/images/home/img_5.png"
        alt="banner"
        height={1200}
        width={2200}
      />
      <div className="md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto w-full flex flex-col items-center justify-center gap-10 lg:gap-20 px-6">
        <CourseIntro />
        <CourseTabComponent />
        <Explore />
        <div className="lg:pt-32 pt-16">
          <WhyUsSection />
        </div>
        <StatsSection />
        <Feedback />
      </div>
      <div className="pt-16 lg:pt-32">
        <NewsletterSection />
      </div>

    </div>
  );
}

export default HomePage;
