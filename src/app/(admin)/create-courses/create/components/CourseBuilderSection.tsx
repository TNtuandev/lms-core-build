"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {Add, Edit, HambergerMenu, ImportCurve, Menu, Trash} from "iconsax-react";
import { ChevronDown, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import AddChapterModal from "./modal/AddChapterModal";
import { CreateLessonModal } from "@/app/(admin)/create-courses/create/components/modal/CreateLessonModal";
import { CreateQuizModal } from "@/app/(admin)/create-courses/create/components/modal/CreateQuizModal";
import { UploadArticleAssignment } from "@/app/(admin)/create-courses/create/components/modal/CreateAssignment/UploadArticleAssignment";
import { UploadCodeAssignment } from "./modal/CreateAssignment/UploadCodeAssignment";
import {
  fullCourseFormData,
  ModuleCourseFormData,
  VideoIntroFormData,
} from "@/app/(admin)/create-courses/create/schemas";
import { useCreateCourseContext } from "@/context/CreateCourseProvider";
import {
  useCreateModule,
  useModules,
} from "@/hooks/queries/course/useModuleCourse";

interface Lesson {
  id: string;
  title: string;
}

interface Chapter {
  id: string;
  title: string;
  summary?: string;
  isExpanded: boolean;
  lessons?: Lesson[];
}

interface CourseBuilderSectionProps {
  onNext: (data: VideoIntroFormData) => void;
  onBack: () => void;
  initialData?: Partial<fullCourseFormData>;
}

export default function CourseBuilderSection({
  onNext,
  onBack,
  initialData,
}: CourseBuilderSectionProps) {
  const [isExpandedChapters, setIsExpandedChapters] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModalCreateLesson, setIsOpenModalCreateLesson] = useState(false);
  const [isOpenModalCreateQuiz, setIsOpenModalCreateQuiz] = useState(false);
  const [isOpenModalCreateAssignment, setIsOpenModalCreateAssignment] =
    useState(false);
  const [isOpenModalCreateAssignmentCode, setIsOpenModalCreateAssignmentCode] =
    useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const { courseData } = useCreateCourseContext();

  const { data: initialChapters, refetch: refetchChapters } = useModules(
    courseData?.id as string,
  );

  const createModule = useCreateModule(courseData?.id as string);

  useEffect(() => {
    if (initialChapters) {
      setChapters(
        initialChapters.map((c) => ({
          id: c.id,
          title: c.title,
          summary: c.shortDescription,
          isExpanded: false,
          lessons: [{ id: '1', title: "Bài học 1" }],
        }))
      );
    }
  }, [initialChapters]);

  const toggleChapter = (chapterId: string) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isExpanded: !chapter.isExpanded }
          : chapter,
      ),
    );
  };

  console.log("initialChapters---", initialChapters);

  const addNewChapter = (value: ModuleCourseFormData) => {
    createModule.mutate(value, {
      onSuccess: () => {
        refetchChapters();
      },
      onError: (error) => {
        console.error("Error creating chapter:", error);
      },
    });
  };

  const deleteChapter = (chapterId: string) => {
    setChapters(chapters.filter((chapter) => chapter.id !== chapterId));
  };

  const editChapterTitle = (chapterId: string, newTitle: string) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId ? { ...chapter, title: newTitle } : chapter,
      ),
    );
  };

  const handleSubmitCreateAssignmentCode = (data: any) => {
    console.log("Submitted assignment data code:", data);
  };

  const handleSubmitCreateAssignment = (data: any) => {
    console.log("Submitted assignment data:", data);
  };

  const handleSubmitCreateLesson = (data: any) => {
    console.log("Submitted lesson data:", data);
  };

  // const handleSubmitCreateQuiz = (data: any) => {
  //   console.log("Submitted quiz data:", data);
  // }

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <div
        className="flex items-center justify-between p-4 cursor-pointer transition-colors"
        onClick={() => setIsExpandedChapters(!isExpandedChapters)}
      >
        <h3 className="text-base font-medium text-primary-contrastText">
          Xây dựng khóa học
        </h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
            isExpandedChapters ? "rotate-180" : ""
          }`}
        />
      </div>

      {isExpandedChapters && (
        <div className="p-4 space-y-3">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="bg-white rounded-lg">
              <div
                className="flex items-center justify-between p-3 cursor-pointer bg-gray-50 rounded-t-lg"
                onClick={() => toggleChapter(chapter.id)}
              >
                <h4 className="text-xl font-medium text-primary-contrastText">
                  {chapter.title}
                </h4>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newTitle = prompt(
                        "Nhập tên chủ đề mới:",
                        chapter.title,
                      );
                      if (newTitle) editChapterTitle(chapter.id, newTitle);
                    }}
                    className="h-8 w-8"
                  >
                    <Edit size={16} color="#637381" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChapter(chapter.id);
                    }}
                    className="h-8 w-8 text-red-600 hover:text-red-700"
                  >
                    <Trash size={16} color="#637381" />
                  </Button>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                      chapter.isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {chapter.isExpanded && (
                <div className="p-4 space-y-3">
                  {chapter?.lessons &&
                    chapter?.lessons?.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 border border-[#919EAB52] rounded-md bg-white hover:bg-gray-50"
                      >
                        <div className="flex items-center">
                          <HambergerMenu size={24} color="#637381" className="h-5 w-5 text-gray-400 mr-3 cursor-move" />
                          <p className="text-sm font-medium">{lesson.title}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Upload size={16} color="#637381" className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700"
                          >
                            <Trash size={16} color="#637381" className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => setIsOpenModalCreateLesson(true)}
                        className="border-primary-main/48"
                        type="button"
                        variant="outline"
                        size="sm"
                      >
                        <Add
                          size={20}
                          color="#2F57EF"
                          className="w-4 h-4 mr-1"
                        />
                        Bài học
                      </Button>
                      <Button
                        onClick={() => setIsOpenModalCreateQuiz(true)}
                        className="border-primary-main/48"
                        type="button"
                        variant="outline"
                        size="sm"
                      >
                        <Add
                          size={20}
                          color="#2F57EF"
                          className="w-4 h-4 mr-1"
                        />
                        Bài kiểm tra
                      </Button>
                      <Button
                        onClick={() => setIsOpenModalCreateAssignmentCode(true)}
                        className="border-primary-main/48"
                        type="button"
                        variant="outline"
                        size="sm"
                      >
                        <Add
                          size={20}
                          color="#2F57EF"
                          className="w-4 h-4 mr-1"
                        />
                        Bài tập
                      </Button>
                    </div>
                    <Button
                      onClick={() => setIsOpenModalCreateAssignment(true)}
                      className="border-primary-main/48"
                      size="sm"
                      type="button"
                      variant="outline"
                    >
                      <ImportCurve
                        size={20}
                        color="#2F57EF"
                        className="w-4 h-4 mr-2"
                      />
                      Nhập bài kiểm tra
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(true)}
              className="w-full h-11 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg"
            >
              <Add size={30} color="#212B36" className="w-4 h-4 mr-0.5" />
              Thêm chủ đề mới
            </Button>
          </div>
        </div>
      )}
      <UploadCodeAssignment
        isOpen={isOpenModalCreateAssignmentCode}
        onClose={() => setIsOpenModalCreateAssignmentCode(false)}
        onSubmit={handleSubmitCreateAssignmentCode}
      />
      <UploadArticleAssignment
        isOpen={isOpenModalCreateAssignment}
        onClose={() => setIsOpenModalCreateAssignment(false)}
        onSubmit={handleSubmitCreateAssignment}
      />
      <CreateLessonModal
        isOpen={isOpenModalCreateLesson}
        onClose={() => setIsOpenModalCreateLesson(false)}
        onSubmit={handleSubmitCreateLesson}
      />
      <AddChapterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddChapter={addNewChapter}
      />
      <CreateQuizModal
        isOpen={isOpenModalCreateQuiz}
        onClose={() => setIsOpenModalCreateQuiz(false)}
      />
    </Card>
  );
}
