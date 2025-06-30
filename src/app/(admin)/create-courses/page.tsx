import {CreateCourseProvider} from "@/context/CreateCourseProvider";
import CreateCourse from "@/app/(admin)/create-courses/CreateCourse";

const CreateCoursePage = () => {
  return (
    <CreateCourseProvider>
      <CreateCourse />
    </CreateCourseProvider>
  )
}

export default CreateCoursePage;

