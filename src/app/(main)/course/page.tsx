import React from "react";
import CourseCard from "@/components/courses/course-card";

function CoursePage() {
  return (
    <div>
      {/*header*/}
      <div className="bg-[linear-gradient(92.2deg,rgba(47,87,239,0.2)_0%,rgba(255,177,69,0.2)_100.43%)] h-[300px] w-full">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col md:flex-row items-center md:gap-8">
            <div className="text-5xl font-bold text-[#212B36]">
              Khóa học thiết kế
            </div>
            <div className="mt-2 md:mt-0 font-light text-[#2F57EF] border bg-[#D14EA81F] border-white px-4 py-2 rounded-full">
              🎉 12 Khoá học
            </div>
          </div>
          <p className="text-[#212B36] mt-2">
            Trang chủ {">"}{" "}
            <span className="text-gray-400">Khóa học thiết kế</span>
          </p>
        </div>
      </div>
      {/*course Start*/}
      <div className="bg-white w-full px-4 md:px-20 md:py-20 py-14">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="text-3xl font-bold text-[#212B36]">
            Các khóa học giúp bạn bắt đầu
          </div>
          <div className="text-[#637381] mt-1">
            Khám phá các khóa học từ các chuyên gia giàu kinh nghiệm thực tế.
          </div>
          <div className="md:grid md:grid-cols-3 gap-10 flex flex-col">
            {[1, 2, 3].map((_, index) => (
              <CourseCard
                key={index}
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
            ))}
          </div>
        </div>
      </div>
      <div
        className="bg-[background: linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 232, 210, 0.15) 49.52%, rgba(205, 223, 255, 0.15) 100%);
] w-full px-4 md:px-20 md:py-20 py-14"
      >
        <div className="flex flex-col gap-4">
          <div className="text-3xl font-bold text-[#212B36]">
            Tất cả khóa học Thiết kế
          </div>
          {/*<div>*/}
          {/*  <TextField.Root placeholder="Search the docs…">*/}
          {/*    <TextField.Slot>*/}
          {/*      <MagnifyingGlassIcon height="16" width="16" />*/}
          {/*    </TextField.Slot>*/}
          {/*  </TextField.Root>*/}
          {/*</div>*/}
          <div className="md:grid md:grid-cols-4 gap-8 flex flex-col">
            {[1, 2, 3, 4].map((_, index) => (
              <CourseCard
                gridNUmber={4}
                key={index}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
