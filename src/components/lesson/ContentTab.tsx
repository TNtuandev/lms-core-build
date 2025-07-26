import IconWarning from "../../../public/icons/IconWarning";
import IconStar from "../../../public/icons/IconStar";
import { Plus } from "lucide-react";
import IconEditLesson from "../../../public/icons/lessson/IconEditLesson";
import IconTrashLesson from "../../../public/icons/lessson/IconTrashLesson";
import IconDownload from "../../../public/icons/lessson/IconDownload";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatToHourUnit, formatToVietnameseMonthYear } from "@/until";
import { useNote } from "@/hooks/queries/course/useCourses";

export interface ContentTabProps {
  courseTitle: string;
  currentLesson: any;
  lessonId?: string;
  courseId?: string
}

export default function ContentTab(props: ContentTabProps) {
  const { courseTitle, currentLesson, lessonId, courseId } = props;
  const [newNote, setNewNote] = useState("");
  // const [showMoreCardProduct, setShowMoreCardProduct] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const { data: noteData } = useNote(courseId as string, lessonId as string);

  console.log(noteData, "---noteData");

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

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

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

  const renderContentTab = (value: string) => {
    switch (value) {
      case "overview":
        return (
          <>
            <p className="text-secondary mb-3">
              {currentLesson?.shortDescription}
            </p>
            <div className="flex gap-2 items-center mb-3">
              <IconWarning />
              <div className="text-secondary">
                Cập nhật lần cuối: {currentLesson?.updatedAt ? formatToVietnameseMonthYear(currentLesson?.updatedAt) : "Chưa cập nhật"}
              </div>
            </div>
            <div className="flex gap-8 pb-6 border-b border-dashed border-b-gray-200 mb-4">
              <div>
                <div className="text-primary font-semibold flex items-center gap-1 text-[#FF9800]">
                  {currentLesson?.ratingAvg}
                  <IconStar />
                </div>
                <div className="text-secondary text-xs">{currentLesson?.ratingCnt} Đánh giá</div>
              </div>
              <div>
                <div className="text-primary font-semibold">800,664</div>
                <div className="text-secondary text-xs">Học sinh</div>
              </div>
              <div>
                <div className="text-primary font-semibold">{currentLesson?.duration ? formatToHourUnit(currentLesson.duration) : "0"}</div>
                <div className="text-secondary text-xs">Tổng</div>
              </div>
              <div>
                <div className="text-primary font-semibold">{currentLesson?.totalLessons}</div>
                <div className="text-secondary text-xs">Bài giảng</div>
              </div>
              <div>
                <div className="text-primary font-semibold">Tất cả</div>
                <div className="text-secondary text-xs">Độ khó</div>
              </div>
            </div>
            <div className="text-primary font-semibold mb-4">Mô tả</div>
            <p className="mb-4">
              {currentLesson?.description}
            </p>

            {/*<button*/}
            {/*  onClick={() => setShowMoreCardProduct(!showMoreCardProduct)}*/}
            {/*  className="text-[#2F57EF] flex items-center cursor-pointer gap-2 mt-4 font-medium"*/}
            {/*>*/}
            {/*  {!showMoreCardProduct ? "Hiển thị thêm" : "Ẩn bớt"}*/}
            {/*  {!showMoreCardProduct ? (*/}
            {/*    <ArrowDown2 size="20" color="#2F57EF" />*/}
            {/*  ) : (*/}
            {/*    <ArrowUp2 size="20" color="#2F57EF" />*/}
            {/*  )}*/}
            {/*</button>*/}
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

  return (
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
  );
}
