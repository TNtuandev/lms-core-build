"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  CourseInfoSection,
  CourseSettingsSection,
  VideoIntroSection,
  CourseBuilderSection,
  CoursePricingSection,
} from "./components";

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
  chapters: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        isExpanded: z.boolean().optional(),
      }),
    )
    .optional(),
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
}: Step2FormProps) {
  const [chapters, setChapters] = useState<Chapter[]>(
    initialData?.chapters?.map((c) => ({
      ...c,
      isExpanded: c.isExpanded || false,
    })) || [
      { id: "1", title: "Chủ đề 1", isExpanded: false },
      { id: "2", title: "Chủ đề 2", isExpanded: false },
    ],
  );

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

  const onSubmit = (data: Step2FormData) => {
    const formDataWithChapters = {
      ...data,
      chapters: chapters.map(({ isExpanded, ...chapter }) => chapter),
    };
    onNext(formDataWithChapters);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* 1. Course Info Section */}
          <CourseInfoSection
            form={form}
            isExpanded={infoExpanded}
            onToggle={() => setInfoExpanded(!infoExpanded)}
          />

          {/* 2. Course Settings Section */}
          <CourseSettingsSection
            form={form}
            isExpanded={courseSettingsExpanded}
            onToggle={() => setCourseSettingsExpanded(!courseSettingsExpanded)}
          />

          {/* 3. Video Introduction Section */}
          <VideoIntroSection
            form={form}
            isExpanded={videoIntroExpanded}
            onToggle={() => setVideoIntroExpanded(!videoIntroExpanded)}
          />

          {/* 4. Course Builder Section */}
          <CourseBuilderSection
            form={form}
            isExpanded={courseBuilderExpanded}
            onToggle={() => setCourseBuilderExpanded(!courseBuilderExpanded)}
            chapters={chapters}
            setChapters={setChapters}
          />

          {/* 5. Course Pricing Section */}
          <CoursePricingSection
            form={form}
            isExpanded={pricingExpanded}
            onToggle={() => setPricingExpanded(!pricingExpanded)}
          />

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
