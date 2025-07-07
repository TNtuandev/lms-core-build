"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { Course } from "@/api/types/course.type";

// ✅ Define AuthContext Interface
interface CreateCourseContextType {
  courseData?: Course;
  setCourseData: (course: Course) => void;
}

// ✅ Create Context
const CreateCourseContext = createContext<CreateCourseContextType | null>(null);

// ✅ Custom Hook to Access Context
export const useCreateCourseContext = () => {
  const context = useContext(CreateCourseContext);
  if (!context) {
    throw new Error(
      "CreateCourseContext must be used within an CreateCourseProvider",
    );
  }
  return context;
};

// ✅ AuthProvider Component
export function CreateCourseProvider({ children }: { children: ReactNode }) {
  const [courseData, setCourseData] = useState<Course>({
    id: "1d0d04e1-957c-4e54-9629-b63c3ef4ca31",
    title: "Khoá học thiết kế Web",
    slug: "khoa-hoc-thiet-ke-web-mct9lony-3ww1e",
    shortDescription: "Giứoi thiệu",
    thumbnail: "https://www.youtube.com/watch?v=Nu95GIWYK_E",
    difficulty: "ADVANCED",
    label: "BEST_SELLER",
    category: {
      id: "166e17a8-5e21-48ee-836b-1d190476617f",
      slug: "khoa-hoc-thiet-ke-web-mct9lony-3ww1e",
      title: "khoa-hoc-thiet-ke-web-mct9lony-3ww1e",
    },
    pricing: {
      regular: 1111110,
      discounted: 222220,
    },
    rating: {
      avg: 0,
      count: 0,
    },
    owner: {
      id: "c2d248e0-59be-43df-95a1-ad8d924d1990",
      email: "admin@thangvv.id.vn",
      fullName: "Thắng Vũ",
    },
    totalLesson: 0,
    enrollmentCnt: 0,
  });

  return (
    <CreateCourseContext.Provider
      value={{
        courseData,
        setCourseData: (c: Course) => {
          setCourseData(c);
        },
      }}
    >
      {children}
    </CreateCourseContext.Provider>
  );
}
