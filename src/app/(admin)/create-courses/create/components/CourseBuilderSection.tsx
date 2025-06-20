"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Step2FormData } from "../Step2Form";
import {Add, Edit, Import, ImportCurve, Menu, Trash} from "iconsax-react";
import {ChevronDown, Upload} from "lucide-react";
import { useState } from "react";
import AddChapterModal from "./AddChapterModal";

interface Lesson {
  id: string;
  title: string;
}

interface Chapter {
  id: string;
  title: string;
  summary?: string;
  isExpanded: boolean;
  lessons: Lesson[];
}

interface CourseBuilderSectionProps {
  form: UseFormReturn<Step2FormData>;
  isExpanded: boolean;
  onToggle: () => void;
  chapters: Chapter[];
  setChapters: (chapters: Chapter[]) => void;
}

export default function CourseBuilderSection({
  isExpanded,
  onToggle,
  chapters,
  setChapters,
}: CourseBuilderSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleChapter = (chapterId: string) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isExpanded: !chapter.isExpanded }
          : chapter,
      ),
    );
  };

  const addNewChapter = (title: string, summary: string) => {
    const newChapter: Chapter = {
      id: Date.now().toString(),
      title,
      summary,
      isExpanded: true,
      lessons: [],
    };
    setChapters([...chapters, newChapter]);
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

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <div
        className="flex items-center justify-between p-4 cursor-pointer transition-colors"
        onClick={onToggle}
      >
        <h3 className="text-base font-medium text-primary-contrastText">Xây dựng khóa học</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {isExpanded && (
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
                  {chapter.lessons &&
                    chapter.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 border rounded-md bg-white hover:bg-gray-50"
                      >
                        <div className="flex items-center">
                          <Menu size={24} color="#637381" className="h-5 w-5 text-gray-400 mr-3 cursor-move" />
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
                      <Button className="border-primary-main/48" type="button" variant="outline" size="sm">
                        <Add size={20} color="#2F57EF" className="w-4 h-4 mr-1" />
                        Bài học
                      </Button>
                      <Button className="border-primary-main/48" type="button" variant="outline" size="sm">
                        <Add size={20} color="#2F57EF" className="w-4 h-4 mr-1" />
                        Bài kiểm tra
                      </Button>
                      <Button className="border-primary-main/48" type="button" variant="outline" size="sm">
                        <Add size={20} color="#2F57EF" className="w-4 h-4 mr-1" />
                        Bài tập
                      </Button>
                    </div>
                    <Button className="border-primary-main/48" size="sm" type="button" variant="outline">
                      <ImportCurve size={20} color="#2F57EF" className="w-4 h-4 mr-2" />
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
      <AddChapterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddChapter={addNewChapter}
      />
    </Card>
  );
} 