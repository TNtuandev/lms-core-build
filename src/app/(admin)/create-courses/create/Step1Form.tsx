"use client";

import { useState, useRef } from "react";
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
import { Upload, Info } from "lucide-react";
import Image from "next/image";


// Schema validation for Step 1
const step1Schema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  category: z.string().min(1, "Danh mục không được để trống"),
  teacher: z.string().min(1, "Giáo viên không được để trống"),
  slug: z.string().min(1, "Liên kết cố định không được để trống"),
  description: z.string().min(1, "Giới thiệu không được để trống"),
  thumbnail: z.any().optional(),
});

type Step1FormData = z.infer<typeof step1Schema>;

interface Step1FormProps {
  onNext: (data: Step1FormData) => void;
  initialData?: Partial<Step1FormData>;
}

export default function Step1Form({ onNext, initialData }: Step1FormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      title: initialData?.title || "",
      category: initialData?.category || "",
      teacher: initialData?.teacher || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      ...initialData,
    },
  });

  const onSubmit = (data: Step1FormData) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Tiêu đề
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="VD: Khóa học thiết kế web"
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  maxLength={30}
                  {...field}
                />
              </FormControl>
              <p className="text-xs text-gray-500 flex items-center">
                <Info className="w-3 h-3 mr-1" />
                Tiêu đề đã dài tối đa 30 ký tự
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Danh mục & Giáo viên */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Danh mục */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Danh mục
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Danh mục" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="web">Web</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Giáo viên */}
          <FormField
            control={form.control}
            name="teacher"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Giáo viên
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nguyễn Anh Tuấn"
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Slug Field */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Liên kết cố định
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="khoa-hoc-moi"
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  {...field}
                />
              </FormControl>
              <p className="text-xs text-gray-500">
                Xem trước: {" "}
                <span className="text-blue-600">
                  https://kicaacademy.com/{field.value || "khoa-hoc-moi"}
                </span>
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Giới thiệu
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Giới thiệu"
                  className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Thumbnail Upload */}
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Hình thu nhỏ
              </FormLabel>
              <FormControl>
                <div
                  className="border-2 border-dashed bg-[#919EAB]/8 border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                  onClick={() => inputRef.current?.click()}
                >
                  {!selectedFile ? (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-[#919EAB]/8 rounded-full flex items-center justify-center mb-4">
                        <Image
                          width={64}
                          height={64}
                          alt="image"
                          src="/images/upload.png"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Thả hoặc chọn tệp tin
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Thả tệp tin vào đây hoặc nhấp để {" "}
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          duyệt
                        </span> {" "}
                        từ máy tính
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Image
                        src={URL.createObjectURL(selectedFile)}
                        alt="Thumbnail Preview"
                        width={1000}
                        height={600}
                        className="rounded-lg mb-4"
                      />
                      <p className="text-sm text-gray-500 mb-2">
                        {selectedFile.name}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          field.onChange(null);
                          if (inputRef.current) {
                            inputRef.current.value = "";
                          }
                        }}
                      >
                        Xóa
                      </Button>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedFile(file);
                        field.onChange(file);
                      }
                    }}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                </div>
              </FormControl>
              <p className="text-xs text-gray-500">
                <span className="font-medium">Kích thước:</span> 700x430 pixel, {" "}
                <span className="font-medium">Hỗ trợ tệp:</span> JPG, JPEG, PNG, GIF, WEBP
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            className="px-8 border-[#919EAB52]/32 text-primary-contrastText"
            onClick={() => form.reset()}
          >
            Hủy bỏ
          </Button>
          <Button
            type="submit"
            className="px-8 bg-[#212B36] hover:bg-blue-700 text-white"
          >
            Tiếp tục
          </Button>
        </div>
      </form>
    </Form>
  );
}
