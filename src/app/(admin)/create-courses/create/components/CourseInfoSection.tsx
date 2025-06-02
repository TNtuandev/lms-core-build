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
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      form.setValue("tags", updatedTags);
      setNewTag("");
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
                  <div>
                    <div className="flex gap-2 mb-2">
                      <Input
                        {...field}
                        placeholder="Nhập thẻ..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
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
  );
}
