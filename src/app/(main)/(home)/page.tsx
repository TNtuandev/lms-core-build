import React from "react";
import "./index.css";
import { Banner } from "@/components/home/Banner";
import { Explore } from "@/components/home/Explore";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { StatsSection } from "@/components/home/StatsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import CourseTabHomeComponent from "@/components/home/CourseTabHome";

function HomePage() {
  return (
    <div>
      <Banner />
      <div className="md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto w-full flex flex-col items-center justify-center gap-10 lg:gap-20 px-6">
        <Explore />
        <CourseTabHomeComponent />
        <div className="lg:pt-32 pt-16">
          <WhyUsSection />
        </div>
        <StatsSection />
      </div>
      <div className="pt-16 lg:pt-32 flex justify-center">
        <NewsletterSection />
      </div>
    </div>
  );
}

export default HomePage;
