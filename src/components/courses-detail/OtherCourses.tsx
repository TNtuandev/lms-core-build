import React from "react";
import { useRouter } from "next/navigation";
import CourseCard from "@/components/courses/course-card";

interface OtherCoursesProps {
  instructorName: string;
  onCourseClick: (courseSlug: string) => void;
}

export const OtherCourses: React.FC<OtherCoursesProps> = ({ 
  instructorName, 
  onCourseClick 
}) => {
  const router = useRouter();

  const handleCourseClick = (courseSlug: string) => {
    onCourseClick(courseSlug);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="md:text-3xl text-sm font-bold text-[#212B36]">
          Khóa học khác của{" "}
          <span className="text-[#2F57EF]">
            {instructorName}
          </span>
        </div>
        <button
          type="button"
          className="font-semibold cursor-pointer text-xs md:text-base border rounded-lg px-2 py-1 border-gray-200"
        >
          Xem tất cả
        </button>
      </div>

      <div className="md:grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 flex flex-col mt-4">
        {[1, 2].map((courseId, index) => (
          <div
            key={index}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => handleCourseClick(courseId.toString())}
          >
            <CourseCard
              gridNUmber={2}
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
          </div>
        ))}
      </div>
    </div>
  );
}; 