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
import { Upload, Info } from "lucide-react";
import CKEditorWrapper from "@/components/courses/editor/CKEditorWrapper";

// Schema validation for Step 1
const step1Schema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  slug: z.string().min(1, "Liên kết cố định không được để trống"),
  description: z.string().min(1, "Giới thiệu không được để trống"),
  content: z.string().min(1, "Nội dung không được để trống"),
  fileType: z.string().min(1, "Vui lòng chọn loại tập tin"),
  category: z.string().optional(),
  thumbnail: z.any().optional(),
});

type Step1FormData = z.infer<typeof step1Schema>;

interface Step1FormProps {
  onNext: (data: Step1FormData) => void;
  initialData?: Partial<Step1FormData>;
}

export default function Step1Form({ onNext, initialData }: Step1FormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      content: initialData?.content || "",
      fileType: initialData?.fileType || "",
      category: initialData?.category || "",
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
                  {...field}
                />
              </FormControl>
              <p className="text-xs text-gray-500 flex items-center">
                <Info className="w-3 h-3 mr-1" />
                Tiêu đề dài tối đa 30 ký tự
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

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
                Xem trước:{" "}
                <span className="text-blue-600">
                  https://amerianstudy.com/khoa-hoc-moi
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

        {/* Input Fields */}
        <div>
          <FormLabel className="text-sm font-medium text-gray-700 mb-4 block">
            Nhập
          </FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* File Type Field */}
            <FormField
              control={form.control}
              name="fileType"
              render={({ field }) => (
                <FormItem className="bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Loại tập tin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="document">Tài liệu</SelectItem>
                      <SelectItem value="image">Hình ảnh</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Upload Field */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Chọn tập tin"
                        className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-24 text-gray-500"
                        value={selectedFile?.name || ""}
                        readOnly
                      />
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setSelectedFile(file);
                            field.onChange(file.name);
                          }
                        }}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      >
                        <div className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1.5 rounded text-sm font-medium transition-colors">
                          Chọn
                        </div>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Content Field */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Nội dung
              </FormLabel>
              <FormControl>
                <CKEditorWrapper
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Viết gì đó..."
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
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Thả hoặc chọn tệp tin
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Thả tệp tin vào đây hoặc nhấp để{" "}
                      <span className="text-blue-600 hover:underline cursor-pointer">
                        duyệt
                      </span>{" "}
                      từ máy tính
                    </p>
                    <input
                      type="file"
                      accept="image/*"
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
                    <label
                      htmlFor="thumbnail-upload"
                      className="cursor-pointer inline-block"
                    >
                      <Button
                        type="button"
                        variant="outline"
                        className="mb-2"
                      >
                        Chọn tệp tin
                      </Button>
                    </label>
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">Kích thước:</span>{" "}
                      700x430 pixel,{" "}
                      <span className="font-medium">Hỗ trợ tệp:</span>{" "}
                      JPG, JPEG, PNG, GIF, WEBP
                    </p>
                    {selectedFile && (
                      <p className="text-sm text-green-600 mt-2">
                        Đã chọn: {selectedFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button
            type="submit"
            className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Tiếp tục
          </Button>
        </div>
      </form>
    </Form>
  );
}
