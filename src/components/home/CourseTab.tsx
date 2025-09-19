"use client";

import CourseCard from "@/components/courses/course-card";
import React from "react";
import { Course, CourseLabel } from "@/api/types/course.type";
import { Loader2 } from "lucide-react";

interface CourseTabProps {
  courses?: Course[];
  isLoading?: boolean;
  error?: any;
  onCourseClick?: (courseId: string) => void;
  onLabelChange?: (label: string | null) => void;
  activeLabel?: string | null;
}

const listTab = [
  {
    id: 1,
    name: "Tất cả",
    numberLesson: 0, // Will be updated dynamically
    label: null,
  },
  {
    id: 2,
    name: "Nổi bật",
    numberLesson: 0,
    label: CourseLabel.FEATURED,
  },
  {
    id: 3,
    name: "Phổ biến",
    numberLesson: 0,
    label: CourseLabel.BEST_SELLER,
  },
  {
    id: 4,
    name: "Xu hướng",
    numberLesson: 0,
    label: CourseLabel.HOT,
  },
  {
    id: 5,
    name: "Mới nhất",
    numberLesson: 0,
    label: CourseLabel.NEW,
  },
];

export function CourseTab({
  courses = [],
  isLoading = false,
  error = null,
  onCourseClick,
  onLabelChange,
  activeLabel,
}: CourseTabProps) {
  // Get active tab ID based on activeLabel
  const getActiveTabId = () => {
    const matchingTab = listTab.find((tab) => tab.label === activeLabel);
    return matchingTab?.id || 1; // Default to "Tất cả" if no match
  };

  // Update tabs with actual course counts
  const updatedTabs = listTab.map((tab) => {
    if (tab.id === 1) {
      // "Tất cả" tab shows total courses available
      return { ...tab, numberLesson: courses.length };
    } else {
      // Other tabs show estimated counts (you can make these dynamic based on actual filters if needed)
      return {
        ...tab,
        numberLesson: Math.floor(courses.length * 0.7), // Estimated 70% for other categories
      };
    }
  });

  const handleTabClick = (tab: any) => {
    onLabelChange?.(tab.label);
  };

  const handleCourseClick = (courseId: string) => {
    if (onCourseClick) {
      onCourseClick(courseId);
    }
  };

  // Get courses to display (limit to 3 for preview)
  const displayCourses = courses.slice(0, 3);

  return (
    <div className="flex flex-col gap-4">
      {/*tab render*/}
      <div className="flex justify-between flex-col md:flex-row md:items-end mb-5 w-full">
        <div>
          <div className="font-bold text-xl text-[#00E4A9]">KHÓA HỌC</div>
          <div className="font-extrabold md:text-5xl text-3xl mt-2 md:leading-14">
            Hãy cùng nhau <br /> khám phá thế giới <br /> hóa học diệu kỳ!
          </div>
        </div>
        <div className="items-end">
          <div className="text-secondary mb-2 font-normal hidden md:block">
            Bắt đầu hành trình khoa học, trang bị kiến thức vững chắc để <br />{" "}
            bé tự tin tỏa sáng!
          </div>
          <div className="text-secondary mb-2 font-normal block md:hidden mt-2">
            Bắt đầu hành trình khoa học, trang bị kiến thức vững chắc để bé tự
            tin tỏa sáng!
          </div>
          <div className="flex flex-wrap gap-3">
            {updatedTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`cursor-pointer relative flex flex-col items-center justify-center px-6 py-2 rounded-full transition-all ${
                  getActiveTabId() === tab.id
                    ? "bg-[#2F57EF] text-white"
                    : "bg-white text-[#1959FF] border-[#1959FF] border"
                }`}
              >
                <span
                  className={`text-sm font-medium ${getActiveTabId() === tab.id ? "text-white" : "text-[#1959FF]"}`}
                >
                  {tab.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Display */}
      <div className="md:grid md:grid-cols-3 gap-10 flex flex-col">
        {isLoading ? (
          <div className="col-span-3 flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-gray-400" size={32} />
            <span className="ml-2 text-gray-500">Đang tải khóa học...</span>
          </div>
        ) : error ? (
          <div className="col-span-3 flex justify-center items-center py-20">
            <div className="text-center">
              <p className="text-red-500 mb-2">Có lỗi xảy ra khi tải dữ liệu</p>
              <p className="text-gray-500 text-sm">
                {error?.message || "Vui lòng thử lại sau"}
              </p>
            </div>
          </div>
        ) : displayCourses.length > 0 ? (
          displayCourses.map((course) => (
            <div
              key={course.id}
              className="cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => handleCourseClick(course.slug)}
            >
              <CourseCard
                slug={course.slug}
                badge={course.label}
                title={course.title}
                imageUrl={course.thumbnail}
                category="Khóa học"
                courseName={course.title}
                instructor={`Giảng viên: ${course?.owner.fullName}`}
                lessonCount={course.totalLesson}
                studentCount={course.enrollmentCnt}
                currentPrice={
                  course.pricing.discounted
                    ? course.pricing.discounted.toLocaleString()
                    : course.pricing.regular.toLocaleString()
                }
                originalPrice={
                  course.pricing.discounted
                    ? course.pricing.regular.toLocaleString()
                    : ""
                }
              />
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-20">
            <p className="text-gray-500">Chưa có khóa học nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
