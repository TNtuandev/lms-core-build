"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Info, Edit, Trash2, Plus, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";


// Schema validation for Step 2
const step2Schema = z.object({
  shortDescription: z.string().min(1, "Mô tả ngắn không được để trống"),
  requirements: z.string().min(1, "Yêu cầu không được để trống"),
  objectives: z.string().min(1, "Đối tượng mục tiêu không được để trống"),
  duration: z.string().min(1, "Tổng thời lượng không được để trống"),
  lessons: z.string().min(1, "Số bài học không được để trống"),
  level: z.string().min(1, "Vui lòng chọn danh mục"),
  instructor: z.string().min(1, "Giáo viên không được để trống"),
  tags: z.array(z.string()).optional(),
  isSale: z.boolean().optional(),
  isNew: z.boolean().optional(),
  isBestseller: z.boolean().optional(),
  // Course Settings
  isPublic: z.boolean().optional(),
  enableQA: z.boolean().optional(),
  enableDrip: z.boolean().optional(),
  // Video Introduction
  videoSource: z.string().optional(),
  videoUrl: z.string().optional(),
  // Course Builder
  chapters: z.array(z.object({
    id: z.string(),
    title: z.string(),
    isExpanded: z.boolean().optional(),
  })).optional(),
  // Pricing
  isFree: z.boolean().optional(),
  originalPrice: z.string().optional(),
  salePrice: z.string().optional(),
  isPublished: z.boolean().optional(),
});

type Step2FormData = z.infer<typeof step2Schema>;

interface Step2FormProps {
  onNext: (data: Step2FormData) => void;
  onBack: () => void;
  initialData?: Partial<Step2FormData>;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

interface Chapter {
  id: string;
  title: string;
  isExpanded: boolean;
}

export default function Step2Form({
  onNext,
  onBack,
  initialData,
  isExpanded = true,
  onToggleExpand
}: Step2FormProps) {
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>(
    initialData?.chapters?.map(c => ({ ...c, isExpanded: c.isExpanded || false })) || [
      { id: "1", title: "Chủ đề 1", isExpanded: false },
      { id: "2", title: "Chủ đề 2", isExpanded: false }
    ]
  );
  const [studentCount, setStudentCount] = useState(100);

  // Section expand states
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [courseSettingsExpanded, setCourseSettingsExpanded] = useState(true);
  const [videoIntroExpanded, setVideoIntroExpanded] = useState(true);
  const [courseBuilderExpanded, setCourseBuilderExpanded] = useState(true);
  const [pricingExpanded, setPricingExpanded] = useState(true);

  const form = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      shortDescription: initialData?.shortDescription || "",
      requirements: initialData?.requirements || "",
      objectives: initialData?.objectives || "",
      duration: initialData?.duration || "",
      lessons: initialData?.lessons || "",
      level: initialData?.level || "",
      instructor: initialData?.instructor || "",
      tags: initialData?.tags || [],
      isSale: initialData?.isSale || false,
      isNew: initialData?.isNew || false,
      isBestseller: initialData?.isBestseller || false,
      // Course Settings
      isPublic: initialData?.isPublic || true,
      enableQA: initialData?.enableQA || true,
      enableDrip: initialData?.enableDrip || false,
      // Video Introduction
      videoSource: initialData?.videoSource || "youtube",
      videoUrl: initialData?.videoUrl || "",
      // Pricing
      isFree: initialData?.isFree || false,
      originalPrice: initialData?.originalPrice || "0,00",
      salePrice: initialData?.salePrice || "0,00",
      isPublished: initialData?.isPublished || true,
    },
  });

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      form.setValue("tags", updatedTags);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    form.setValue("tags", updatedTags);
  };

  const toggleChapter = (chapterId: string) => {
    setChapters(chapters.map(chapter =>
      chapter.id === chapterId
        ? { ...chapter, isExpanded: !chapter.isExpanded }
        : chapter
    ));
  };

  const addNewChapter = () => {
    const newChapter: Chapter = {
      id: Date.now().toString(),
      title: `Chủ đề ${chapters.length + 1}`,
      isExpanded: false
    };
    setChapters([...chapters, newChapter]);
  };

  const deleteChapter = (chapterId: string) => {
    setChapters(chapters.filter(chapter => chapter.id !== chapterId));
  };

  const editChapterTitle = (chapterId: string, newTitle: string) => {
    setChapters(chapters.map(chapter =>
      chapter.id === chapterId
        ? { ...chapter, title: newTitle }
        : chapter
    ));
  };

  const onSubmit = (data: Step2FormData) => {
    const formDataWithChapters = {
      ...data,
      chapters: chapters.map(({ isExpanded, ...chapter }) => chapter)
    };
    onNext(formDataWithChapters);
  };

  const ToggleSwitch = ({ value, onChange, color = "blue" }: {
    value: boolean;
    onChange: (value: boolean) => void;
    color?: "blue" | "green" | "yellow" | "gray";
  }) => {
    const colorClasses = {
      blue: value ? 'bg-blue-500' : 'bg-gray-300',
      green: value ? 'bg-green-500' : 'bg-gray-300',
      yellow: value ? 'bg-yellow-500' : 'bg-gray-300',
      gray: value ? 'bg-gray-500' : 'bg-gray-300',
    };

    return (
      <div
        className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${colorClasses[color]}`}
        onClick={() => onChange(!value)}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* 1. Thêm thông tin Section */}
          <Card className=" bg-white py-4 shadow-sm border border-gray-200">
            <div
              className="flex items-center justify-between p-4 cursor-pointer transition-colors"
              onClick={() => setInfoExpanded(!infoExpanded)}
            >
              <h3 className="text-base font-medium text-gray-900">
                Thêm thông tin
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                  infoExpanded ? 'rotate-180' : ''
                }`}
              />
            </div>

            {infoExpanded && (
              <div className="p-4 border-t border-t-gray-300 space-y-6">
                {/* Short Description Field */}
                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Mô tả ngắn
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Mô tả ngắn"
                          className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Requirements Field */}
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Yêu cầu
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Yêu cầu"
                          className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Objectives Field */}
                <FormField
                  control={form.control}
                  name="objectives"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Đối tượng mục tiêu
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Đối tượng mục tiêu"
                          className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Info className="w-3 h-3 mr-1" />
                        Xác định đối tượng mục tiêu sẽ được hướng tới nhiều nhất từ khóa học.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Duration and Lessons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Tổng thời lượng
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="00"
                            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <p className="text-xs text-gray-500">Giờ</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lessons"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 opacity-0">
                          Hidden
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="00"
                            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <p className="text-xs text-gray-500">Phút</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Level and Instructor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Danh mục
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                              <SelectValue placeholder="Danh mục" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">Người mới bắt đầu</SelectItem>
                            <SelectItem value="intermediate">Trung cấp</SelectItem>
                            <SelectItem value="advanced">Nâng cao</SelectItem>
                            <SelectItem value="expert">Chuyên gia</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="instructor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Giáo viên
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nguyễn Anh Tuấn"
                            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Tags Field */}
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Thẻ
                      </FormLabel>
                      <FormControl>
                        <div>
                          <div className="flex gap-2 mb-2">
                            <Input
                              placeholder="Nhập thẻ..."
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addTag();
                                }
                              }}
                              className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                            <Button
                              type="button"
                              onClick={addTag}
                              className="px-4 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Thêm
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                              <div
                                key={index}
                                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Toggle Switches */}
                <div className="space-y-4">
                  {/* Sale Toggle */}
                  <FormField
                    control={form.control}
                    name="isSale"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex flex-col">
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Nhãn Sale
                          </FormLabel>
                          <span className="text-xs text-gray-500">SALE</span>
                        </div>
                        <FormControl>
                          <ToggleSwitch
                            value={field.value || false}
                            onChange={field.onChange}
                            color="green"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* New Toggle */}
                  <FormField
                    control={form.control}
                    name="isNew"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex flex-col">
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Nhãn New
                          </FormLabel>
                          <span className="text-xs text-gray-500">NEW</span>
                        </div>
                        <FormControl>
                          <ToggleSwitch
                            value={field.value || false}
                            onChange={field.onChange}
                            color="blue"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Bestseller Toggle */}
                  <FormField
                    control={form.control}
                    name="isBestseller"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex flex-col">
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Nhãn Bestseller
                          </FormLabel>
                          <span className="text-xs text-gray-500">BESTSELLER</span>
                        </div>
                        <FormControl>
                          <ToggleSwitch
                            value={field.value || false}
                            onChange={field.onChange}
                            color="yellow"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </Card>

          {/* 2. Cài đặt khóa học Section */}
          <Card className=" bg-white py-4 shadow-sm border border-gray-200">
            <div
              className="flex items-center justify-between p-4 cursor-pointer transition-colors"
              onClick={() => setCourseSettingsExpanded(!courseSettingsExpanded)}
            >
              <h3 className="text-base font-medium text-gray-900">
                Cài đặt khóa học
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                  courseSettingsExpanded ? 'rotate-180' : ''
                }`}
              />
            </div>

            {courseSettingsExpanded && (
              <div className="p-4 border-t border-t-gray-300 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Difficulty Level */}
                  <div>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">
                      Mức độ khó
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                <SelectValue placeholder="Tất cả cấp độ" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="all">Tất cả cấp độ</SelectItem>
                              <SelectItem value="beginner">Người mới bắt đầu</SelectItem>
                              <SelectItem value="intermediate">Trung cấp</SelectItem>
                              <SelectItem value="advanced">Nâng cao</SelectItem>
                              <SelectItem value="expert">Chuyên gia</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Info className="w-3 h-3 mr-1" />
                      Tiêu đề đài tối đa 30 ký tự
                    </p>
                  </div>

                  {/* Student Count */}
                  <div>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">
                      Số lượng học viên tối đa
                    </FormLabel>
                    <div className="flex items-center space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setStudentCount(Math.max(0, studentCount - 1))}
                        className="h-10 w-10"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 text-center">
                        <span className="text-xl font-semibold">{studentCount}</span>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setStudentCount(studentCount + 1)}
                        className="h-10 w-10"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Info className="w-3 h-3 mr-1" />
                      Đặt 0 để không giới hạn.
                    </p>
                  </div>
                </div>

                {/* Toggle Options */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="isPublic"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between p-3 border rounded-lg">
                        <FormLabel className="text-sm font-medium text-gray-700 cursor-pointer">
                          Công khai khóa học
                        </FormLabel>
                        <FormControl>
                          <ToggleSwitch
                            value={field.value || false}
                            onChange={field.onChange}
                            color="blue"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="enableQA"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between p-3 border rounded-lg">
                        <FormLabel className="text-sm font-medium text-gray-700 cursor-pointer">
                          Hỏi & Đáp
                        </FormLabel>
                        <FormControl>
                          <ToggleSwitch
                            value={field.value || false}
                            onChange={field.onChange}
                            color="blue"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="enableDrip"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between p-3 border rounded-lg">
                        <FormLabel className="text-sm font-medium text-gray-700 cursor-pointer">
                          Nội dung nhỏ giọt
                        </FormLabel>
                        <FormControl>
                          <ToggleSwitch
                            value={field.value || false}
                            onChange={field.onChange}
                            color="gray"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </Card>

          {/* 3. Video giới thiệu Section */}
          <Card className="bg-white py-4 shadow-sm border border-gray-200">
            <div
              className="flex items-center justify-between p-4 cursor-pointer  transition-colors"
              onClick={() => setVideoIntroExpanded(!videoIntroExpanded)}
            >
              <h3 className="text-base font-medium text-gray-900">
                Video giới thiệu
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                  videoIntroExpanded ? 'rotate-180' : ''
                }`}
              />
            </div>

            {videoIntroExpanded && (
              <div className="p-4 border-t border-t-gray-300 space-y-4">
                <FormField
                  control={form.control}
                  name="videoSource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Nguồn video
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                            <SelectValue placeholder="Youtube" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="youtube">Youtube</SelectItem>
                          <SelectItem value="vimeo">Vimeo</SelectItem>
                          <SelectItem value="upload">Upload File</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Thêm URL Video của bạn
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Thêm URL Video của bạn"
                          className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Info className="w-3 h-3 mr-1" />
                        Ví dụ: https://www.youtube.com/watch?v=yourvideoid
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </Card>

          {/* 4. Xây dựng khóa học Section */}
          <Card className="bg-white py-4 shadow-sm border border-gray-200">
            <div
              className="flex items-center justify-between p-4 cursor-pointer transition-colors"
              onClick={() => setCourseBuilderExpanded(!courseBuilderExpanded)}
            >
              <h3 className="text-base font-medium text-gray-900">
                Xây dựng khóa học
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                  courseBuilderExpanded ? 'rotate-180' : ''
                }`}
              />
            </div>

            {courseBuilderExpanded && (
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
                            const newTitle = prompt("Nhập tên chủ đề mới:", chapter.title);
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
                            chapter.isExpanded ? 'rotate-180' : ''
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

          {/* 5. Giá khóa học Section */}
          <Card className="bg-white py-4 shadow-sm border border-gray-200">
            <div
              className="flex items-center justify-between p-4 cursor-pointer transition-colors"
              onClick={() => setPricingExpanded(!pricingExpanded)}
            >
              <h3 className="text-base font-medium text-gray-900">
                Giá khóa học
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                  pricingExpanded ? 'rotate-180' : ''
                }`}
              />
            </div>

            {pricingExpanded && (
              <div className="p-4 border-t border-t-gray-300 space-y-4">
                <FormField
                  control={form.control}
                  name="isFree"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-3 border rounded-lg">
                      <FormLabel className="text-sm font-medium text-gray-700 cursor-pointer">
                        Khóa học miễn phí
                      </FormLabel>
                      <FormControl>
                        <ToggleSwitch
                          value={field.value || false}
                          onChange={field.onChange}
                          color="gray"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="originalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Giá gốc
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                đ
                              </span>
                            <Input
                              placeholder="0,00"
                              className="h-10 pl-8 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Giá bán
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                đ
                              </span>
                            <Input
                              placeholder="0,00"
                              className="h-10 pl-8 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-3 border rounded-lg">
                      <FormLabel className="text-sm font-medium text-gray-700 cursor-pointer">
                        Xuất bản
                      </FormLabel>
                      <FormControl>
                        <ToggleSwitch
                          value={field.value || false}
                          onChange={field.onChange}
                          color="blue"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </Card>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="px-6"
            >
              Quay lại
            </Button>
            <Button
              type="submit"
              className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Tạo khóa học
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
