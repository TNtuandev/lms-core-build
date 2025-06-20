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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, Info, Plus, Minus } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";
import { Step2FormData } from "@/app/(admin)/create-courses/create/Step2Form";
import { InfoCircle } from "iconsax-react";

interface CourseSettingsSectionProps {
  form: UseFormReturn<Step2FormData>;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function CourseSettingsSection({
  form,
  isExpanded,
  onToggle,
}: CourseSettingsSectionProps) {
  const [studentCount, setStudentCount] = useState(100);

  return (
    <Card className=" bg-white py-4 shadow-sm border border-gray-200">
      <div
        className="flex items-center justify-between p-4 cursor-pointer transition-colors"
        onClick={onToggle}
      >
        <h3 className="text-base font-medium text-gray-900">Cài đặt khóa học</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-t-gray-300 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Difficulty Level */}
            <div className="col-span-1 md:col-span-2">
              <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">
                Mức độ khó
              </FormLabel>
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-lg border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-500">
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
                <InfoCircle variant="Bold" size={16} color="#637381"/>
                <span className="ml-1">Tiêu đề để dài tối đa 30 ký tự</span>
              </p>
            </div>

            {/* Student Count */}
            <div>
              <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">
                Số lượng học viên tối đa
              </FormLabel>
              <div className="flex items-center justify-between h-11 w-full rounded-lg bg-gray-100 px-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setStudentCount(Math.max(0, studentCount - 1))}
                  className="h-8 w-8 text-gray-500 hover:bg-gray-200"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-base font-medium text-gray-900">
                  {studentCount}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setStudentCount(studentCount + 1)}
                  className="h-8 w-8 text-gray-500 hover:bg-gray-200"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 flex items-center mt-1">
              <InfoCircle variant="Bold" size={16} color="#637381"/>
              <span className="ml-1">Đặt 0 để không giới hạn.</span>
              </p>
            </div>
          </div>
          <hr className="border-dashed border-[#919EAB]/24" />

          {/* Toggle Options */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
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
                <FormItem className="flex items-center justify-between">
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
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="text-sm font-medium text-gray-700 cursor-pointer">
                    Nội dung nhỏ giọt
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
        </div>
      )}
    </Card>
  );
}
