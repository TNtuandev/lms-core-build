"use client";

import {CreateCourseProvider} from "@/context/CreateCourseProvider";
import CreateCourse from "@/app/(admin)/create-courses/CreateCourse";
import {useSearchParams} from "next/navigation";

const CreateCoursePage = () => {

  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("slug") ?? "";
  return (
    <CreateCourseProvider>
      <CreateCourse courseSlug={courseSlug} />
    </CreateCourseProvider>
  )
}

export default CreateCoursePage;

