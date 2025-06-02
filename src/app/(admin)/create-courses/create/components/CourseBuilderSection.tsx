"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, Edit, Trash2, Plus } from "lucide-react";
import { Step2FormData } from "../Step2Form";

interface Chapter {
  id: string;
  title: string;
  isExpanded: boolean;
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
  const toggleChapter = (chapterId: string) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isExpanded: !chapter.isExpanded }
          : chapter,
      ),
    );
  };

  const addNewChapter = () => {
    const newChapter: Chapter = {
      id: Date.now().toString(),
      title: `Chủ đề ${chapters.length + 1}`,
      isExpanded: false,
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
    <Card className="bg-white py-4 shadow-sm border border-gray-200">
      <div
        className="flex items-center justify-between p-4 cursor-pointer transition-colors"
        onClick={onToggle}
      >
        <h3 className="text-base font-medium text-gray-900">Xây dựng khóa học</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-t-gray-300 space-y-3">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="border rounded-lg">
              <div
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleChapter(chapter.id)}
              >
                <h4 className="text-sm font-medium text-gray-900">
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
                    <Edit className="h-4 w-4" />
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
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                      chapter.isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {chapter.isExpanded && (
                <div className="p-3 border-t bg-gray-50">
                  <p className="text-sm text-gray-600">
                    Nội dung của {chapter.title} sẽ được thêm ở đây...
                  </p>
                </div>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addNewChapter}
            className="w-full h-10 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-600 hover:text-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm chủ đề mới
          </Button>
        </div>
      )}
    </Card>
  );
} 