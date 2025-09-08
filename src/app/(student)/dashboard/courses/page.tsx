"use client";

import React from "react";
import EnrolledCourseCard from "@/components/courses/enrolled-course-card";
import { useGetEnrollments } from "@/hooks/queries/enrollments/useEnrollments";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes/routes";
import { Loader2 } from "lucide-react";

// type TabType = "all" | "in-progress" | "completed";

function EnrolledCoursesPage() {
  const { data, isLoading, error } = useGetEnrollments();
  const router = useRouter();

  const handleContinue = (courseId: string) => {
    router.push(`${Routes.course}/${courseId}`);
  };

  const handleEdit = (courseId: string) => {
    console.log("Edit course:", courseId);
  };

  return (
    <div className="bg-white shadow h-max p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6">Khóa học đã đăng ký</h2>

      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="animate-spin text-gray-400" />
          <span className="ml-2 text-gray-500">Đang tải khóa học...</span>
        </div>
      )}

      {error && (
        <div className="text-center py-10 text-red-500">Không thể tải dữ liệu.</div>
      )}


      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((item) => (
          <EnrolledCourseCard
            key={item.course.id}
            imageUrl={item.course?.thumbnail}
            category={item.course.category.title || "Khóa học"}
            courseName={item.course?.title}
            instructor={"Anh Tuấn, Quang Anh"}
            lessonCount={item.course?.totalLessons}
            studentCount={item.course?.enrollmentCnt}
            progress={item.course.totalCompletedLessons}
            status={"in-progress"}
            onContinue={() => handleContinue(item.course?.slug)}
            onEdit={() => handleEdit(item?.course?.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default EnrolledCoursesPage;
