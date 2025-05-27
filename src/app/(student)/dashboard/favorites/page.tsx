"use client";

import React, { useState } from "react";
import EnrolledCourseCard from "@/components/courses/enrolled-course-card";
import Pagination from "@/components/ui/pagination";

function FavoritesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // Mock data for favorite courses
  const favoriteCourses = [
    {
      id: 1,
      imageUrl: "/images/banner-sign-in.png",
      category: "Khóa học Thiết kế",
      courseName: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
      instructor: "Anh Tuấn, Quang Anh",
      lessonCount: 12,
      studentCount: 768,
      progress: 80,
      status: "in-progress" as const,
    },
    {
      id: 2,
      imageUrl: "/images/banner-sign-in.png",
      category: "Khóa học Thiết kế",
      courseName: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
      instructor: "Anh Tuấn, Quang Anh",
      lessonCount: 12,
      studentCount: 768,
      progress: 80,
      status: "in-progress" as const,
    },
    {
      id: 3,
      imageUrl: "/images/banner-sign-in.png",
      category: "Khóa học Thiết kế",
      courseName: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
      instructor: "Anh Tuấn, Quang Anh",
      lessonCount: 12,
      studentCount: 768,
      progress: 80,
      status: "in-progress" as const,
    },
    {
      id: 4,
      imageUrl: "/images/banner-sign-in.png",
      category: "Khóa học Thiết kế",
      courseName: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
      instructor: "Anh Tuấn, Quang Anh",
      lessonCount: 12,
      studentCount: 768,
      progress: 80,
      status: "in-progress" as const,
    },
    {
      id: 5,
      imageUrl: "/images/banner-sign-in.png",
      category: "Khóa học Thiết kế",
      courseName: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
      instructor: "Anh Tuấn, Quang Anh",
      lessonCount: 12,
      studentCount: 768,
      progress: 80,
      status: "in-progress" as const,
    },
    {
      id: 6,
      imageUrl: "/images/banner-sign-in.png",
      category: "Khóa học Thiết kế",
      courseName: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
      instructor: "Anh Tuấn, Quang Anh",
      lessonCount: 12,
      studentCount: 768,
      progress: 80,
      status: "in-progress" as const,
    },
    // Add more courses to demonstrate pagination
    {
      id: 7,
      imageUrl: "/images/banner-sign-in.png",
      category: "Khóa học Thiết kế",
      courseName: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
      instructor: "Anh Tuấn, Quang Anh",
      lessonCount: 12,
      studentCount: 768,
      progress: 80,
      status: "in-progress" as const,
    },
    {
      id: 8,
      imageUrl: "/images/banner-sign-in.png",
      category: "Khóa học Thiết kế",
      courseName: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
      instructor: "Anh Tuấn, Quang Anh",
      lessonCount: 12,
      studentCount: 768,
      progress: 80,
      status: "in-progress" as const,
    },
    {
      id: 9,
      imageUrl: "/images/banner-sign-in.png",
      category: "Khóa học Thiết kế",
      courseName: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
      instructor: "Anh Tuấn, Quang Anh",
      lessonCount: 12,
      studentCount: 768,
      progress: 80,
      status: "in-progress" as const,
    },
    {
      id: 10,
      imageUrl: "/images/banner-sign-in.png",
      category: "Khóa học Thiết kế",
      courseName: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
      instructor: "Anh Tuấn, Quang Anh",
      lessonCount: 12,
      studentCount: 768,
      progress: 80,
      status: "in-progress" as const,
    },
    {
      id: 11,
      imageUrl: "/images/banner-sign-in.png",
      category: "Khóa học Thiết kế",
      courseName: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
      instructor: "Anh Tuấn, Quang Anh",
      lessonCount: 12,
      studentCount: 768,
      progress: 80,
      status: "in-progress" as const,
    },
    {
      id: 12,
      imageUrl: "/images/banner-sign-in.png",
      category: "Khóa học Thiết kế",
      courseName: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
      instructor: "Anh Tuấn, Quang Anh",
      lessonCount: 12,
      studentCount: 768,
      progress: 80,
      status: "in-progress" as const,
    },
  ];

  // Calculate pagination
  const totalPages = Math.ceil(favoriteCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = favoriteCourses.slice(startIndex, endIndex);

  const handleContinue = (courseId: number) => {
    console.log("Continue course:", courseId);
  };

  const handleEdit = (courseId: number) => {
    console.log("Edit course:", courseId);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white shadow h-max p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6">Yêu thích</h2>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCourses.map((course) => (
          <EnrolledCourseCard
            key={course.id}
            imageUrl={course.imageUrl}
            category={course.category}
            courseName={course.courseName}
            instructor={course.instructor}
            lessonCount={course.lessonCount}
            studentCount={course.studentCount}
            progress={course.progress}
            status={course.status}
            onContinue={() => handleContinue(course.id)}
            onEdit={() => handleEdit(course.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {favoriteCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Chưa có khóa học yêu thích nào.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default FavoritesPage;
