"use client";

import React from "react";
import IconVideo from "../../../public/icons/IconVideo";
import IconClock from "../../../public/icons/IconClock";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: string;
  active?: boolean;
}

interface Section {
  id: string;
  title: string;
  expanded: boolean;
  lessons: Lesson[];
  progress?: string;
}

interface LessonSidebarProps {
  sections: Section[];
  completedLessons: string[];
  onToggleCompletion: (lessonId: string) => void;
  onToggleSection: (sectionId: string) => void;
  onSelectLesson: (lesson: Lesson) => void;
}

const LessonSidebar: React.FC<LessonSidebarProps> = ({
  sections,
  completedLessons,
  onToggleCompletion,
  onToggleSection,
  onSelectLesson,
}) => {
  return (
    <div className="w-[350px] bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-3 top-2.5">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          {sections.map((section) => (
            <div key={section.id} className="border border-gray-100 rounded-lg overflow-hidden">
              <div
                className={`flex justify-between items-center p-3 cursor-pointer ${
                  section.expanded ? "bg-blue-50" : "bg-white"
                }`}
                onClick={() => onToggleSection(section.id)}
              >
                <div className="flex items-center">
                  <span className="text-sm font-semibold">
                    {section.id}. {section.title}
                  </span>
                  {section.progress && (
                    <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                      {section.progress}
                    </span>
                  )}
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    section.expanded ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {section.expanded && (
                <div className="bg-white">
                  {section.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex p-3 border-t border-gray-100 cursor-pointer ${
                        lesson.active ? "bg-blue-50" : ""
                      }`}
                      onClick={() => onSelectLesson(lesson)}
                    >
                      <div className="mr-3 flex-shrink-0">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer ${
                            completedLessons.includes(lesson.id)
                              ? "bg-green-500 border-green-500"
                              : "border-gray-300"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleCompletion(lesson.id);
                          }}
                        >
                          {completedLessons.includes(lesson.id) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{lesson.id}</span>
                          {lesson.type === "video" ? (
                            <IconVideo className="w-4 h-4" />
                          ) : (
                            <svg
                              className="w-4 h-4 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm mt-1">{lesson.title}</p>
                        <div className="flex items-center mt-1">
                          <IconClock className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500 ml-1">{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonSidebar; 