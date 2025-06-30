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
    id: "753d2f71-9f71-447e-bd76-2098809587c3",
    title: "Khoá học Website",
    slug: "khoa-hoc-website-mchuhrph-1bqk9",
    description: "Khoá học Website",
    shortDescription: "Khoá học Website",
    type: "COURSE",
    thumbnail:
      "https://www.icantech.vn/_next/image?url=https%3A%2F%2Fs3.icankid.io%2Ficantech%2Fcms%2F1_3x_2dad764ee9.png&w=3840&q=100",
    label: "NEW",
    status: "DRAFT",
    regularPrice: 10,
    discountedPrice: 1,
    ratingAvg: 0,
    ratingCnt: 0,
    enrollmentCnt: 0,
    category: {
      id: "de1a7b5e-4e28-45ca-b343-38428494eb35",
      title: "Clothing",
      slug: "clothing",
    },
    owner: {
      id: "8e4c7d51-8308-408c-944b-6817ed2e4920",
      email: "tuan209200@gmail.com",
      fullName: "tuanna",
    },
    previewImg:
      "https://www.icantech.vn/_next/image?url=https%3A%2F%2Fs3.icankid.io%2Ficantech%2Fcms%2F1_3x_2dad764ee9.png&w=3840&q=100",
    learningOutcomes: "Khoá học Website",
    previewVideo:
      "https://www.youtube.com/watch?v=gQVqr9t78vo&list=RDv_lgp2onzxk&index=2",
    requirements: "Khoá học Website",
    createdAt: "2025-06-29T22:49:00.681Z",
    updatedAt: "2025-06-29T22:49:00.681Z",
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
