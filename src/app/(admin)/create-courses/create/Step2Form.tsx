"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  CourseBuilderSection,
  CourseInfoSection,
  CoursePricingSection,
  CourseSettingsSection,
  VideoIntroSection,
} from "./components";
import ToggleSwitch from "./components/ToggleSwitch";
import CourseFAQ from "@/app/(admin)/create-courses/create/components/CourseFAQ";
import {Step2FormData, step2Schema,
} from "./schemas";
import { z } from "zod";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isExpanded: boolean;
}

interface Step2FormProps {
  onNext: (data: Step2FormData) => void;
  onBack: () => void;
  initialData?: Partial<Step2FormData>;
  schema?: z.ZodSchema<Step2FormData>;
}

export default function Step2Form({
  onNext,
  onBack,
  initialData,
  schema,
}: Step2FormProps) {
  const [isPending] = useState(false);
  const [chapters, setChapters] = useState(
    initialData?.chapters?.map((c) => ({
      ...c,
      isExpanded: c.isExpanded || false,
      lessons: (c as any).lessons || [],
    })) || [
      { id: "1", title: "Chủ đề 1", isExpanded: false, lessons: [] },
      { id: "2", title: "Chủ đề 2", isExpanded: false, lessons: [] },
    ],
  );
  const [faqs, setFaqs] = useState<FAQ[]>(
    (initialData as any)?.faqs || [
      {
        id: "1",
        question: "Question 1",
        answer:
          "Curabitur nisi. Phasellus blandit leo ut odio. Donec posuere vulputate arcu. Donec mi odio, faucibus at, scelerisque quis, convallis in,",
        isExpanded: true,
      },
      {
        id: "2",
        question: "Question 2",
        answer:
          "Curabitur nisi. Phasellus blandit leo ut odio. Donec posuere vulputate arcu. Donec mi odio, faucibus at, scelerisque quis, convallis in,",
        isExpanded: false,
      },
    ],
  );

  // Section expand states
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [courseSettingsExpanded, setCourseSettingsExpanded] = useState(true);
  const [videoIntroExpanded, setVideoIntroExpanded] = useState(true);
  const [courseBuilderExpanded, setCourseBuilderExpanded] = useState(true);
  const [faqExpanded, setFaqExpanded] = useState(true);
  const [pricingExpanded, setPricingExpanded] = useState(true);

  const form = useForm<Step2FormData>({
    resolver: zodResolver(schema || step2Schema),
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
    // Call onNext to pass data back to parent component
    console.log("Step 2 form data:", data);
    onNext(data);
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

          {/*/!* 3. Video Introduction Section *!/*/}
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

          <CourseFAQ
            form={form}
            isExpanded={faqExpanded}
            onToggle={() => setFaqExpanded(!faqExpanded)}
            faqs={faqs}
            setFaqs={setFaqs}
          />

          {/* 5. Course Pricing Section */}
          <CoursePricingSection
            form={form}
            isExpanded={pricingExpanded}
            onToggle={() => setPricingExpanded(!pricingExpanded)}
          />

          {/* Form Actions */}
          <div className="flex justify-between items-center border-t border-gray-200">
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 p-3 rounded-lg">
                  <FormControl className="flex items-center">
                    <ToggleSwitch
                      value={field.value || false}
                      onChange={field.onChange}
                      color="gray"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium text-gray-700 cursor-pointer">
                    Xuất bản
                  </FormLabel>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="px-6 text-primary-contrastText"
                disabled={isPending}
              >
                Quay lại
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="px-6 text-primary-contrastText"
                disabled={isPending}
              >
                Huỷ bỏ
              </Button>
              <Button
                type="submit"
                className="px-8 bg-[#212B36] hover:bg-blue-700 text-white"
              >
                {isPending ? "Đang tạo khóa học..." : "Tạo khóa học"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
