"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { CourseDetail } from "@/api/types/course.type";
import { IModule } from "@/hooks/queries/course/useModuleCourse";

// ✅ Define AuthContext Interface
interface CreateCourseContextType {
  courseData?: CourseDetail;
  setCourseData: (course?: CourseDetail) => void;
  moduleSelected?: IModule;
  setModuleSelected: (module?: IModule) => void;
  lessonSelected?: any; // Adjust type as needed
  setLessonSelected: (lesson?: any) => void; // Adjust type as needed
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
  const [courseData, setCourseData] = useState<CourseDetail>({
    id: "a105aa71-8deb-4545-8ad1-8ca0ddcd1497",
    title: "Minh tạo khoá học",
    slug: "minh-tao-khoa-hoc",
    description: "minh-tao-khoa-hoc",
    shortDescription: "minh-tao-khoa-hoc",
    type: "COURSE",
    thumbnail:
      "https://www.icantech.vn/_next/image?url=https%3A%2F%2Fs3.icankid.io%2Ficantech%2Fcms%2F1_3x_2dad764ee9.png&w=3840&q=100",
    label: "HOT",
    status: "DRAFT",
    regularPrice: 200000,
    discountedPrice: 100000,
    ratingAvg: 0,
    ratingCnt: 0,
    enrollmentCnt: 0,
    category: {
      id: "64389a22-89dc-44d6-9308-fff010d95b36",
      title: "Sports & Outdoors",
      slug: "sports-outdoors",
    },
    owner: {
      id: "c2d248e0-59be-43df-95a1-ad8d924d1990",
      email: "admin@thangvv.id.vn",
      fullName: "Thắng Vũ",
    },
    previewImg:
      "https://www.icantech.vn/_next/image?url=https%3A%2F%2Fs3.icankid.io%2Ficantech%2Fcms%2F1_3x_2dad764ee9.png&w=3840&q=100",
    learningOutcomes: "minh-tao-khoa-hoc",
    previewVideo:
      "https://www.youtube.com/watch?v=gQVqr9t78vo&list=RDv_lgp2onzxk&index=2",
    requirements: "minh-tao-khoa-hoc",
    totalLessons: 0,
    duration: 0,
    createdAt: "2025-07-09T05:10:36.326Z",
    updatedAt: "2025-07-09T05:10:36.326Z",
  });

  const [moduleSelected, setModuleSelected] = useState<IModule>();
  const [lessonSelected, setLessonSelected] = useState<any>();

  return (
    <CreateCourseContext.Provider
      value={{
        courseData,
        setCourseData: (c?: CourseDetail) => {
          setCourseData(c as any);
        },
        moduleSelected,
        setModuleSelected: (m?: IModule) => {
          setModuleSelected(m);
        },
        lessonSelected, // Initialize as needed
        setLessonSelected: (l?: any) => {
          // Adjust type as needed
          setLessonSelected(l)
        },
      }}
    >
      {children}
    </CreateCourseContext.Provider>
  );
}
