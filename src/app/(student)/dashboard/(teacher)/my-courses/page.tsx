"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CourseCard from "@/components/courses/course-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TABS = [
  { label: "Xuất bản", value: "published" },
  { label: "Đang xử lý", value: "processing" },
  { label: "Bị từ chối", value: "rejected" },
  { label: "Nháp", value: "draft" },
  { label: "Loại bỏ", value: "removed" },
];

const COURSES = [
  {
    badge: "NEW" as const,
    title: "ILTS ENGLISH COURSES",
    imageUrl: "/images/banner-sign-in.png",
    category: "Khóa học Thiết kế",
    courseName: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
    instructor: "Anh Tuấn, Quang Anh",
    lessonCount: 12,
    studentCount: 768,
    currentPrice: "529,000",
    originalPrice: "1,769,000",
  },
  {
    badge: "NEW" as const,
    title: "Difficult Things About Education.",
    imageUrl: "/images/banner-sign-in.png",
    category: "Khóa học Thiết kế",
    courseName: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
    instructor: "Anh Tuấn, Quang Anh",
    lessonCount: 12,
    studentCount: 768,
    currentPrice: "529,000",
    originalPrice: "1,769,000",
  },
  {
    badge: "NEW" as const,
    title: "Difficult Things About Education.",
    imageUrl: "/images/banner-sign-in.png",
    category: "Khóa học Thiết kế",
    courseName: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
    instructor: "Anh Tuấn, Quang Anh",
    lessonCount: 12,
    studentCount: 768,
    currentPrice: "529,000",
    originalPrice: "1,769,000",
  },
];

function MyCoursePage() {
  return (
    <div className="p-6 bg-[#f9f6ff] min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4">Khóa học của tôi</h2>
          <Button className="text-white">
            <Link
              href="/create-courses"
            >Tạo khoá học mới</Link>
          </Button>
        </div>
        <Tabs defaultValue="published" className="w-full">
          <TabsList className="mb-6">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COURSES.map((course, idx) => (
                  <div key={idx} className="flex flex-col h-full">
                    <CourseCard {...course} />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default MyCoursePage;
