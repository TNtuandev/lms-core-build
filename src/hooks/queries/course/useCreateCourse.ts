import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ICreateCourseRequest } from "@/api/types/course.type";
import { courseAPI } from "@/api/endpoints/course.api";
import toast from "react-hot-toast";
import {useState} from "react";

export const useCreateCourse = () => {
  const router = useRouter();
  const [courseData, setCourseData] = useState<ICreateCourseRequest | null>(null);

  const createCourse =  useMutation({
    mutationFn: (courseData: ICreateCourseRequest) => courseAPI.createCourse(courseData),
    onSuccess: (data) => {
      toast.success("Khóa học đã được tạo thành công!");
      setCourseData(data);
    },
    onError: (error: any) => {
      console.error("Error creating course:", error);
      toast.error("Đã xảy ra lỗi khi tạo khóa học.");
    },
  });

  return {
    createCourse,
    courseData
  }
}; 