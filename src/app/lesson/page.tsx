"use client";

import React, { useState, useEffect } from "react";
import VideoPlayer from "@/components/ui/video-player";
import LessonSidebar from "@/components/courses/lesson-sidebar";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import IconToggleSidebar from "../../../public/icons/lessson/IconToggleSidebar";
import IconToggleSidebarActive from "../../../public/icons/lessson/IconToggleSidebarActive";
import DocumentLesson from "@/components/lesson/DocumentLesson";
import QuizLesson from "@/components/lesson/QuizLesson";
import ExerciseLesson from "@/components/lesson/ExerciseLesson";
import { useQuizStore } from "@/store/slices/lesson.slice";
import ContentTab from "@/components/lesson/ContentTab";
import StudyCode from "@/components/lesson/StudyCode";

interface Lesson {
  id: string;
  title: string;
  active?: boolean;
  type: string;
}

function LessonPage() {
  const [completedLessons, setCompletedLessons] = useState<string[]>(["2.1"]);
  const isQuizStarted = useQuizStore((state) => state.isQuizStarted);
  const [quizCode, setQuizCode] = useState<boolean>(true);

  const [sections, setSections] = useState([
    {
      id: "1",
      title: "Giới thiệu về UI/UX",
      expanded: false,
      lessons: [],
    },
    {
      id: "2",
      title: "Nghiên cứu người dùng",
      expanded: true,
      lessons: [
        {
          id: "2.1",
          title: "Phương pháp nghiên cứu người dùng",
          duration: "06:23",
          type: "video",
        },
        {
          id: "2.2",
          title: "Xây dựng chân dung người dùng (Persona)",
          duration: "20:15",
          type: "video",
          active: true,
        },
        {
          id: "2.3",
          title: "Phân tích hành vi và nhu cầu",
          duration: "08:56",
          type: "doc",
        },
        {
          id: "2.4",
          title: "Phân tích hành vi và nhu cầu",
          duration: "08:56",
          type: "quiz",
        },
        {
          id: "2.5",
          title: "Phân tích hành vi và nhu cầu",
          duration: "08:56",
          type: "exercise",
        },
      ],
    },
    {
      id: "3",
      title: "Thiết kế trải nghiệm người dùng (UX Design)",
      expanded: false,
      lessons: [
        {
          id: "3.1",
          title: "Phương pháp nghiên cứu người dùng",
          duration: "06:23",
          type: "video",
        },
        {
          id: "3.2",
          title: "Xây dựng chân dung người dùng (Persona)",
          duration: "20:15",
          type: "video",
          active: true,
        },
        {
          id: "3.3",
          title: "Phân tích hành vi và nhu cầu",
          duration: "08:56",
          type: "doc",
        },
        {
          id: "3.4",
          title: "Phân tích hành vi và nhu cầu",
          duration: "08:56",
          type: "quiz",
        },
      ],
      progress: "0/8",
    },
  ]);

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  const [currentLesson, setCurrentLesson] = useState({
    id: "2.2",
    title: "Xây dựng chân dung người dùng (Persona)",
    videoUrl: "/videos/lesson.mp4",
    type: "video",
  });

  const courseTitle =
    "Thiết kế giao diện người dùng và trải nghiệm người dùng (UI/UX)";

  // Handle responsive sidebar visibility
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobileView(mobile);
      setIsSidebarVisible(!mobile);
    };

    // Initial check
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleLessonCompletion = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter((id) => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, expanded: !section.expanded }
          : section,
      ),
    );
  };

  const selectLesson = (lesson: Lesson) => {
    // Create a new sections array with the active lesson updated
    const newSections = [...sections];

    // Update all lessons to be not active
    newSections.forEach((section) => {
      section.lessons.forEach((l) => {
        l.active = l.id === lesson.id;
      });
    });

    // Set the updated sections
    setSections(newSections);

    // Update current lesson with new data (simplified for demo)
    setCurrentLesson({
      ...currentLesson,
      id: lesson.id,
      title: lesson.title,
      type: lesson.type,
    });

    // Hide sidebar on mobile after selecting a lesson
    if (isMobileView) {
      setIsSidebarVisible(false);
    }
  };

  const toggleSidebar = () => {
    console.log("Toggle sidebar visibility");
    setIsSidebarVisible(!isSidebarVisible);
  };

  const renderLessonBody = (type: string) => {
    switch (type) {
      case "video":
        return (
          <VideoPlayer
            src={currentLesson.videoUrl}
            poster="/images/lesson-thumbnail.jpg"
          />
        );
      case "doc":
        return <DocumentLesson />;
      case "quiz":
        return <QuizLesson />;
      case "exercise":
        return <ExerciseLesson />;
      default:
        return null;
    }
  };

  return (
    <div className="flex relative">
      {/* Left Sidebar - luôn hiện ở desktop, toggle ở mobile */}
      {isSidebarVisible && (
        <div
          className={`
          ${isMobileView ? "fixed z-20 top-0 left-0 h-full transition-transform duration-300 ease-in-out" : "relative z-10"}
          ${isSidebarVisible ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isMobileView ? "w-max sm:w-[350px] bg-white shadow-xl" : "w-0 lg:w-[350px] bg-white"}
        `}
          style={{ minHeight: "100vh" }}
        >
          <LessonSidebar
            sections={sections}
            completedLessons={completedLessons}
            onToggleCompletion={toggleLessonCompletion}
            onToggleSection={toggleSection}
            onSelectLesson={selectLesson}
          />
        </div>
      )}
      {/* Overlay cho mobile khi sidebar mở */}
      {isMobileView && isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-white min-w-0">
        {/* Header with back button */}
        <div className="items-center justify-between md:flex p-4 bg-white text-primary">
          <div className="flex items-center gap-3">
            <button
              className="mr-3 bg-[#919EAB14] h-[36px] w-[36px] flex items-center justify-center rounded"
              onClick={toggleSidebar}
            >
              {isSidebarVisible ? (
                <IconToggleSidebar />
              ) : (
                <IconToggleSidebarActive />
              )}
            </button>
            <h1 className="text-lg font-medium truncate">{courseTitle}</h1>
          </div>
          <div className="flex items-center gap-6 mt-2 md:mt-0">
            <div className="font-bold cursor-pointer flex items-center gap-1">
              <ArrowLeft2 size="20" color="#212B36" />
              Trước
            </div>
            <div className="font-bold cursor-pointer flex items-center gap-1">
              Tiếp theo
              <ArrowRight2 size="20" color="#212B36" />
            </div>
          </div>
        </div>

        {quizCode ? (
          <StudyCode />
        ) : (
          <>
            {renderLessonBody(currentLesson.type)}

            {!isQuizStarted && (
              <ContentTab
                courseTitle={courseTitle}
                currentLesson={currentLesson}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default LessonPage;
