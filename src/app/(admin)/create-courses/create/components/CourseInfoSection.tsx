"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, Info } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";
import { Step2FormData } from "@/app/(admin)/create-courses/create/Step2Form";
import {InfoCircle} from "iconsax-react";

interface CourseInfoSectionProps {
  form: UseFormReturn<Step2FormData>;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function CourseInfoSection({
  form,
  isExpanded,
  onToggle,
}: CourseInfoSectionProps) {
  const [tags, setTags] = useState<string[]>([]);

  // TODO: Replace with your actual predefined tags
  const predefinedTags = [
    "Thiết kế web",
    "Lập trình mobile",
    "UI/UX",
    "Marketing",
    "Data Science",
    "AI",
    "Blockchain",
  ];

  const addTag = (tagToAdd: string) => {
    if (tagToAdd && !tags.includes(tagToAdd)) {
      const updatedTags = [...tags, tagToAdd];
      setTags(updatedTags);
      form.setValue("tags", updatedTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    form.setValue("tags", updatedTags);
  };

  return (
    <Card className=" bg-white py-4 shadow-sm border border-gray-200">
      <div
        className="flex items-center justify-between p-4 cursor-pointer transition-colors"
        onClick={onToggle}
      >
        <h3 className="text-base font-medium text-gray-900">Thêm thông tin</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-t-gray-300 space-y-6">
          {/* Description Field */}
          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Mô tả
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Viết gì đó..."
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

          {/* Objectives Field (now is Kết quả đạt được) */}
          <FormField
            control={form.control}
            name="objectives"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Kết quả đạt được
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Kết quả đạt được"
                    className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <InfoCircle variant="Bold" size={16} color="#637381"/>
                  <span className="ml-1">Kết quả người dùng sẽ đạt được sau khi kết thúc khóa học</span>
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Duration: giờ và phút */}
          <div className="grid grid-cols-2 gap-4">
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
                  <p className="text-xs text-gray-500 flex items-center">
                    <InfoCircle variant="Bold" size={16} color="#637381"/>
                    <span className="ml-1">Giờ</span>
                  </p>
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
                    Ẩn
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00"
                      className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500 flex items-center">
                    <InfoCircle variant="Bold" size={16} color="#637381"/>
                    <span className="ml-1">Phút</span>
                  </p>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  <div className="flex flex-wrap items-center gap-2 p-2 min-h-[40px] border border-gray-300 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="bg-[#DDEBFF] text-[#0C53B7] px-2.5 py-1 rounded-md text-sm flex items-center gap-1.5"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="font-bold text-[#0C53B7] hover:text-blue-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <Select onValueChange={(value) => addTag(value)} value="">
                      <SelectTrigger className="flex-1 h-8 p-0 bg-transparent border-0 shadow-none focus-visible:ring-0 focus:ring-offset-0 data-[placeholder]:text-gray-500">
                        <SelectValue placeholder="Chọn thẻ để thêm..." />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {predefinedTags.map((tag) => (
                          <SelectItem
                            key={tag}
                            value={tag}
                            disabled={tags.includes(tag)}
                          >
                            {tag}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Toggle Switches */}
          <div className="space-y-4 pt-4">
            {/* Sale Toggle */}
            <FormField
              control={form.control}
              name="isSale"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Nhãn Sale
                  </FormLabel>
                  <div className="flex items-center gap-4 mt-1">
                    <FormControl>
                      <ToggleSwitch
                        value={field.value || false}
                        onChange={field.onChange}
                        color="green"
                      />
                    </FormControl>
                    <div className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50/70">
                      SALE
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* New Toggle */}
            <FormField
              control={form.control}
              name="isNew"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Nhãn New
                  </FormLabel>
                  <div className="flex items-center gap-4 mt-1">
                    <FormControl>
                      <ToggleSwitch
                        value={field.value || false}
                        onChange={field.onChange}
                        color="blue"
                      />
                    </FormControl>
                    <div className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50/70">
                      NEW
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Bestseller Toggle */}
            <FormField
              control={form.control}
              name="isBestseller"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Nhãn Bestseller
                  </FormLabel>
                  <div className="flex items-center gap-4 mt-1">
                    <FormControl>
                      <ToggleSwitch
                        value={field.value || false}
                        onChange={field.onChange}
                        color="yellow"
                      />
                    </FormControl>
                    <div className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50/70">
                      BESTSELLER
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
