"use client";

import CourseCard from "@/components/courses/course-card";
import React, { useState } from "react";
const listTab = [
  {
    id: 1,
    name: "Tất cả",
    numberLesson: 2635,
  },
  {
    id: 2,
    name: "Nổi bật",
    numberLesson: 1233,
  },
  {
    id: 3,
    name: "Phổ biến",
    numberLesson: 433,
  },
  {
    id: 4,
    name: "Xu hướng",
    numberLesson: 757,
  },
  {
    id: 5,
    name: "Mới nhất",
    numberLesson: 212,
  },
];
export function CourseTab() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      {/*tab render*/}
      <div className="flex flex-wrap justify-center gap-3 mt-5 mb-5">
        {listTab.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer relative flex flex-col items-center justify-center min-w-[120px] px-8 py-4 rounded-full transition-all ${
              activeTab === tab.id
                ? "bg-[#2F57EF] text-white"
                : "bg-white text-[#637381] border border-gray-200 hover:bg-gray-50"
            }`}
          >
                <span className="text-[10px] right-2.5 top-2 absolute text-[#919EABCC]">
                  {tab.numberLesson}
                </span>
            <span
              className={`text-sm font-medium ${activeTab === tab.id ? "text-white" : "text-gray-700"}`}
            >
                  {tab.name}
                </span>
          </button>
        ))}
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
  )
}