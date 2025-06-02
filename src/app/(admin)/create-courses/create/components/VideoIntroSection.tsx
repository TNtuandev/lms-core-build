"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ChevronDown, Info } from "lucide-react";
import { Step2FormData } from "@/app/(admin)/create-courses/create/Step2Form";

interface VideoIntroSectionProps {
  form: UseFormReturn<Step2FormData>;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function VideoIntroSection({
  form,
  isExpanded,
  onToggle,
}: VideoIntroSectionProps) {
  return (
    <Card className="bg-white py-4 shadow-sm border border-gray-200">
      <div
        className="flex items-center justify-between p-4 cursor-pointer  transition-colors"
        onClick={onToggle}
      >
        <h3 className="text-base font-medium text-gray-900">Video giới thiệu</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-t-gray-300 space-y-4">
          <FormField
            control={form.control}
            name="videoSource"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Nguồn video
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
  );
}
