import React from "react";
import "./index.css";
import { Banner } from "@/components/home/Banner";
import { EducationHero } from "@/components/home/EducationHero";
import { Explore } from "@/components/home/Explore";
import { FeaturesOverview } from "@/components/home/FeaturesOverview";
import HomepageFeedback from "@/components/home/HomepageFeedback";
import { Information } from "@/components/home/Information";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import CourseTabHomeComponent from "@/components/home/CourseTabHome";

function HomePage() {
  return (
    <div>
      <Banner />
      <Information />
      <Explore />
      <CourseTabHomeComponent />
      <EducationHero />
      <FeaturesOverview />
      <HomepageFeedback />
      <NewsletterSignup />
    </div>
  );
}

export default HomePage;
