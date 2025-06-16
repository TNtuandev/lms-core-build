"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/ui/video-player";
import LessonSidebar from "@/components/courses/lesson-sidebar";
import IconWarning from "../../../public/icons/IconWarning";
import IconStar from "../../../public/icons/IconStar";
import IconDownload from "../../../public/icons/lessson/IconDownload";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import { Plus } from "lucide-react";
import IconTrashLesson from "../../../public/icons/lessson/IconTrashLesson";
import IconEditLesson from "../../../public/icons/lessson/IconEditLesson";

interface Lesson {
  id: string;
  title: string;
  active?: boolean;
  type: string;
}

function LessonPage() {
  const [completedLessons, setCompletedLessons] = useState<string[]>(["2.1"]);
  const [showMoreCardProduct, setShowMoreCardProduct] = useState(false);

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
          id: "3.3",
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

  // State cho notes
  const [notes, setNotes] = useState([
    {
      id: 1,
      section: "2. Nghiên cứu người dùng",
      sub: "2.2 Xây dựng chân dung người dùng (Persona)",
      content: "Đoạn này cần lưu lại",
    },
    {
      id: 2,
      section: "2. Nghiên cứu người dùng",
      sub: "2.1 Phương pháp nghiên cứu người dùng",
      content: "Đoạn này cần lưu lại",
    },
  ]);

  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  // Thêm ghi chú mới
  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setNotes([
      {
        id: Date.now(),
        section: currentLesson.title,
        sub: currentLesson.title,
        content: newNote,
      },
      ...notes,
    ]);
    setNewNote("");
  };
  // Xóa ghi chú
  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id));
  };
  // Sửa ghi chú
  const handleEditNote = (id: number, content: string) => {
    setEditingId(id);
    setEditingContent(content);
  };
  const handleSaveEdit = (id: number) => {
    setNotes(
      notes.map((n) => (n.id === id ? { ...n, content: editingContent } : n)),
    );
    setEditingId(null);
    setEditingContent("");
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingContent("");
  };

  const [currentLesson, setCurrentLesson] = useState({
    id: "2.2",
    title: "Xây dựng chân dung người dùng (Persona)",
    videoUrl: "/videos/lesson.mp4",
    type: "video",
  });

  const renderContentTab = (value: string) => {
    switch (value) {
      case "overview":
        return (
          <>
            <p className="text-secondary mb-3">
              Học thiết kế web trong 1 giờ với hơn 25 quy tắc và hướng dẫn dễ sử
              dụng — bao gồm rất nhiều tài nguyên thiết kế web tuyệt vời!
            </p>
            <div className="flex gap-2 items-center mb-3">
              <IconWarning />
              <div className="text-secondary">
                Cập nhật lần cuối: Tháng 5/2025
              </div>
            </div>
            <div className="flex gap-8 pb-6 border-b border-dashed border-b-gray-200 mb-4">
              <div>
                <div className="text-primary font-semibold flex items-center gap-1 text-[#FF9800]">
                  4.8
                  <IconStar />
                </div>
                <div className="text-secondary text-xs">43,673 Đánh giá</div>
              </div>
              <div>
                <div className="text-primary font-semibold">800,664</div>
                <div className="text-secondary text-xs">Học sinh</div>
              </div>
              <div>
                <div className="text-primary font-semibold">2.5 Giờ</div>
                <div className="text-secondary text-xs">Tổng</div>
              </div>
              <div>
                <div className="text-primary font-semibold">10</div>
                <div className="text-secondary text-xs">Bài giảng</div>
              </div>
              <div>
                <div className="text-primary font-semibold">Tất cả</div>
                <div className="text-secondary text-xs">Độ khó</div>
              </div>
            </div>
            <div className="text-primary font-semibold mb-4">Mô tả</div>
            <p className="mb-4">
              Khóa học Thiết kế Giao diện và Trải nghiệm Người dùng (UI/UX) mang
              đến cho bạn một hành trình học tập thực tế từ nền tảng đến nâng
              cao.
            </p>
            <p className="mb-4">
              Bạn sẽ làm chủ quy trình nghiên cứu người dùng, xây dựng tường UX
              hiệu quả, thiết kế giao diện tinh tế với các công cụ phổ biến, và
              hoàn thiện sản phẩm số chất lượng cao.
            </p>
            <p className="mb-4">
              Song song với lý thuyết là những bài tập thực hành thực tế, giúp
              bạn tự tin tạo ra sản phẩm thực tiễn và xây dựng portfolio cá nhân
              chuyên nghiệp.
            </p>
            <p>
              Hoàn thành khóa học, bạn có thể làm việc với các vị trí Designer,
              UX Researcher, UI/UX Specialist tại các công ty công nghệ,
              startup, hoặc phát triển sự nghiệp tự do.
            </p>
            {showMoreCardProduct && (
              <>
                <p className="mb-4">
                  Song song với lý thuyết là những bài tập thực hành thực tế,
                  giúp bạn tự tin tạo ra sản phẩm thực tiễn và xây dựng
                  portfolio cá nhân chuyên nghiệp.
                </p>
                <p>
                  Hoàn thành khóa học, bạn có thể làm việc với các vị trí
                  Designer, UX Researcher, UI/UX Specialist tại các công ty công
                  nghệ, startup, hoặc phát triển sự nghiệp tự do.
                </p>
              </>
            )}
            <button
              onClick={() => setShowMoreCardProduct(!showMoreCardProduct)}
              className="text-[#2F57EF] flex items-center cursor-pointer gap-2 mt-4 font-medium"
            >
              {!showMoreCardProduct ? "Hiển thị thêm" : "Ẩn bớt"}
              {!showMoreCardProduct ? (
                <ArrowDown2 size="20" color="#2F57EF" />
              ) : (
                <ArrowUp2 size="20" color="#2F57EF" />
              )}
            </button>
          </>
        );
      case "notes":
        return (
          <div className="w-full">
            {/* Input tạo ghi chú mới */}
            <div className="flex items-center gap-2 relative mb-6">
              <input
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Tạo mới ghi chú"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddNote();
                }}
              />
              <button
                className="bg-[#637381] cursor-pointer absolute right-2 text-white rounded-lg p-1 flex items-center justify-center"
                onClick={handleAddNote}
                aria-label="Thêm ghi chú"
              >
                <Plus size={20} color="white" />
              </button>
            </div>
            {/* Danh sách ghi chú */}
            <div className="space-y-6">
              {notes.length === 0 && (
                <div className="text-gray-400 text-center py-8">
                  Chưa có ghi chú nào.
                </div>
              )}
              {notes.map((note) => (
                <div key={note.id} className="bg-white rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <div className="font-semibold text-base mr-2">
                        {note.section}
                      </div>
                      <div className="flex-1 text-xs text-gray-500">
                        {note.sub}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditNote(note.id, note.content)}
                        aria-label="Sửa ghi chú"
                      >
                        <IconEditLesson />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        aria-label="Xóa ghi chú"
                      >
                        <IconTrashLesson />
                      </button>
                    </div>
                  </div>
                  {editingId === note.id ? (
                    <div className="mt-2">
                      <textarea
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          onClick={() => handleSaveEdit(note.id)}
                        >
                          Lưu
                        </button>
                        <button
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={handleCancelEdit}
                        >
                          Huỷ
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-lg px-4 py-3 mt-2 text-gray-700">
                      {note.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case "download":
        return (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <IconDownload />
              <div className="text-[#1D7BF5]">File video.mp4</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
        <div className="flex items-center p-4 bg-blue-600 text-white">
          <button className="mr-3" onClick={toggleSidebar}>
            {isMobileView ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#fff"
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
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            )}
          </button>
          <h1 className="text-lg font-medium truncate text-white">
            {currentLesson.title}
          </h1>
          <button className="ml-auto">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#fff"
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
        <div className="p-4 md:p-6 bg-white">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-2">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="notes">Ghi chú</TabsTrigger>
              <TabsTrigger value="download">Tải xuống</TabsTrigger>
            </TabsList>
            <TabsContent
              value="overview"
              className="mt-4 md:mt-6 text-sm md:text-base"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                {courseTitle}
              </h2>
              {renderContentTab("overview")}
            </TabsContent>
            <TabsContent
              value="notes"
              className="mt-4 md:mt-6 text-sm md:text-base"
            >
              {renderContentTab("notes")}
            </TabsContent>
            <TabsContent
              value="download"
              className="mt-4 md:mt-6 text-sm md:text-base"
            >
              {renderContentTab("download")}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default LessonPage;
