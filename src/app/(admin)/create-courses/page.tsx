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
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ChevronRight, Upload, Info, Check } from "lucide-react";

// Schema validation
const courseSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  slug: z.string().min(1, "Liên kết cố định không được để trống"),
  description: z.string().min(1, "Giới thiệu không được để trống"),
  content: z.string().min(1, "Nội dung không được để trống"),
  category: z.string().min(1, "Vui lòng chọn danh mục"),
  thumbnail: z.any().optional(),
});

type CourseFormData = z.infer<typeof courseSchema>;

const steps = [
  { id: 1, title: "Tạo khóa học", description: "Tạo khóa học" },
  { id: 2, title: "Thêm thông tin", description: "Thêm thông tin" },
];

function CreateCourse() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      content: "",
      category: "",
    },
  });

  const onSubmit = (data: CourseFormData) => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      console.log("Form submitted:", data);
      // Handle form submission
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 md:mt-20 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between flex-col md:flex-row items-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-8 md:w-[30%]">
            Khóa học mới
          </h1>
          <div className="flex items-center justify-center mb-4 w-[70%] relative">
            {/* Connecting Line Background */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full md:max-w-[150px] max-w-[120px] h-[2px] bg-gray-300 z-0" />
            <div
              className={`absolute top-4 left-1/2 transform -translate-x-1/2 h-[2px] bg-blue-600 z-0 transition-all duration-300 ${
                currentStep > 1 ? "w-full max-w-[300px]" : "w-0"
              }`}
            />

            <div className="flex items-center justify-between w-full max-w-[300px] relative z-10">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-col gap-1">
                  <div
                    className={`flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-full border-2 ${
                      currentStep >= step.id
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-400 bg-gray-400 text-white"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" color="white" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="mt-2">
                    <p
                      className={`text-sm font-medium ${
                        currentStep >= step.id ? "" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-white shadow-sm border border-gray-200">
              <nav className="space-y-2">
                {[
                  { label: "Tạo khóa học", active: currentStep === 1 },
                  { label: "Thêm thông tin", active: false },
                  { label: "Cài đặt khóa học", active: false },
                  { label: "Video giới thiệu", active: false },
                  { label: "Xây dựng khóa học", active: false },
                  { label: "Gia khóa học", active: false },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      item.active
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Form Card */}
            <Card className="p-8 bg-white shadow-sm border border-gray-200">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Chi tiết
                </h2>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {currentStep === 1 && (
                    <>
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
                                https://kiteacademy.com/khoa-hoc-moi
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

                      {/* Category Field */}
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Nhập
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                  <SelectValue placeholder="Loại tập tin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="web-development">
                                  Phát triển Web
                                </SelectItem>
                                <SelectItem value="mobile-development">
                                  Phát triển Mobile
                                </SelectItem>
                                <SelectItem value="design">Thiết kế</SelectItem>
                                <SelectItem value="marketing">
                                  Marketing
                                </SelectItem>
                                <SelectItem value="business">
                                  Kinh doanh
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-500">
                              Chọn{" "}
                              <span className="text-blue-600 cursor-pointer hover:underline">
                                Chọn tập tin
                              </span>
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

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
                              <div className="border border-gray-300 rounded-lg">
                                {/* Rich Text Editor Toolbar */}
                                <div className="flex items-center space-x-2 p-3 border-b border-gray-200 bg-gray-50">
                                  <select className="text-sm border-none bg-transparent">
                                    <option>Font</option>
                                  </select>
                                  <div className="flex items-center space-x-1">
                                    <button
                                      type="button"
                                      className="p-1 hover:bg-gray-200 rounded"
                                    >
                                      <strong>B</strong>
                                    </button>
                                    <button
                                      type="button"
                                      className="p-1 hover:bg-gray-200 rounded"
                                    >
                                      <em>I</em>
                                    </button>
                                    <button
                                      type="button"
                                      className="p-1 hover:bg-gray-200 rounded"
                                    >
                                      <u>U</u>
                                    </button>
                                    <button
                                      type="button"
                                      className="p-1 hover:bg-gray-200 rounded"
                                    >
                                      S
                                    </button>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <button
                                      type="button"
                                      className="p-1 hover:bg-gray-200 rounded"
                                    >
                                      •
                                    </button>
                                    <button
                                      type="button"
                                      className="p-1 hover:bg-gray-200 rounded"
                                    >
                                      1.
                                    </button>
                                  </div>
                                </div>
                                <Textarea
                                  placeholder="Viết gì đó..."
                                  className="min-h-[200px] border-none focus:ring-0 resize-none"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      {/* Thumbnail Upload */}
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Hình thu nhỏ
                        </FormLabel>
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
                              onChange={handleFileChange}
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
                      </FormItem>
                    </>
                  )}

                  {/* Form Actions */}
                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="px-6"
                      >
                        Quay lại
                      </Button>
                    )}
                    <Button
                      type="submit"
                      className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {currentStep === steps.length ? "Hoàn thành" : "Tiếp tục"}
                    </Button>
                  </div>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
