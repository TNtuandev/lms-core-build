"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/ui/video-player";
import LessonSidebar from "@/components/courses/lesson-sidebar";

function LessonPage() {
  const [completedLessons, setCompletedLessons] = useState<string[]>(["2.1"]);

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
      ],
    },
    {
      id: "3",
      title: "Thiết kế trải nghiệm người dùng (UX Design)",
      expanded: false,
      lessons: [],
      progress: "0/8",
    },
    {
      id: "4",
      title: "Bài kiểm tra",
      expanded: false,
      lessons: [],
      progress: "0/8",
    },
    {
      id: "5",
      title: "Bài tập",
      expanded: false,
      lessons: [],
      progress: "0/3",
    },
  ]);

  const [currentLesson, setCurrentLesson] = useState({
    id: "2.2",
    title: "Xây dựng chân dung người dùng (Persona)",
    videoUrl: "/videos/lesson.mp4",
    content: {
      overview: (
        <>
          <p className="mb-4">
            Khóa học Thiết kế Giao diện và Trải nghiệm Người dùng (UI/UX) mang
            đến cho bạn một hành trình học tập thực tế từ nền tảng đến nâng cao.
          </p>
          <p className="mb-4">
            Bạn sẽ làm chủ quy trình nghiên cứu người dùng, xây dựng tường UX
            hiệu quả, thiết kế giao diện tinh tế với các công cụ phổ biến, và
            hoàn thiện sản phẩm số chất lượng cao.
          </p>
          <p className="mb-4">
            Song song với lý thuyết là những bài tập thực hành thực tế, giúp bạn
            tự tin tạo ra sản phẩm thực tiễn và xây dựng portfolio cá nhân
            chuyên nghiệp.
          </p>
          <p>
            Hoàn thành khóa học, bạn có thể làm việc với các vị trí Designer, UX
            Researcher, UI/UX Specialist tại các công ty công nghệ, startup,
            hoặc phát triển sự nghiệp tự do.
          </p>
        </>
      ),
      notes: <p>Ghi chú của bạn sẽ xuất hiện tại đây.</p>,
    },
  });

  const courseTitle =
    "Thiết kế giao diện người dùng và trải nghiệm người dùng (UI/UX)";
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

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

  const selectLesson = (lesson: any) => {
    // In a real app, this would load the lesson data from an API
    console.log("Selected lesson:", lesson);

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
    });

    // Hide sidebar on mobile after selecting a lesson
    if (isMobileView) {
      setIsSidebarVisible(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] relative mt-20">
      {/* Left Sidebar - conditionally shown based on isSidebarVisible */}
      <div
        className={`
          ${isMobileView ? "absolute z-10 inset-y-0 left-0 transform transition-transform duration-300 ease-in-out" : "relative"}
          ${isSidebarVisible ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} 
          ${isMobileView && isSidebarVisible ? "w-[85%] sm:w-[350px]" : "w-0 lg:w-[350px]"}
        `}
      >
        {isSidebarVisible && (
          <LessonSidebar
            sections={sections}
            completedLessons={completedLessons}
            onToggleCompletion={toggleLessonCompletion}
            onToggleSection={toggleSection}
            onSelectLesson={selectLesson}
          />
        )}
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isMobileView && isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 min-w-0">
        {/* Header with back button */}
        <div className="flex items-center p-4 bg-blue-600 text-white">
          <button
            className="mr-3"
            onClick={isMobileView ? toggleSidebar : undefined}
          >
            {isMobileView ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            )}
          </button>
          <h1 className="text-lg font-medium truncate">{courseTitle}</h1>
          <button className="ml-auto">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Video Player */}
        <VideoPlayer
          src={currentLesson.videoUrl}
          poster="/images/lesson-thumbnail.jpg"
        />

        {/* Lesson Content */}
        <div className="p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
            {currentLesson.title}
          </h2>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-2">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="notes">Ghi chú</TabsTrigger>
            </TabsList>
            <TabsContent
              value="overview"
              className="mt-4 md:mt-6 text-sm md:text-base"
            >
              {currentLesson.content.overview}
            </TabsContent>
            <TabsContent
              value="notes"
              className="mt-4 md:mt-6 text-sm md:text-base"
            >
              {currentLesson.content.notes}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default LessonPage;
