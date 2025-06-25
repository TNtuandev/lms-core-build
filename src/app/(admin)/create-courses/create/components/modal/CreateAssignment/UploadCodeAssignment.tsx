import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import CKEditorWrapper from "@/components/courses/editor/CKEditorWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { InfoCircle } from "iconsax-react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";

const uploadAssignmentSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  type: z.enum(["coding"]),
  content: z.string().min(1, "Nội dung không được để trống"),
  inputData: z.any().optional(),
  outputData: z.any().optional(),
  suggestion: z.string().optional(),
  sampleData: z.string().optional(),
  answer: z.string().optional(),
});
type UploadAssignmentFormData = z.infer<typeof uploadAssignmentSchema>;

interface UploadCodeAssignmentProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UploadAssignmentFormData) => void;
}

export const UploadCodeAssignment = ({
  isOpen,
  onClose,
  onSubmit,
}: UploadCodeAssignmentProps) => {
  const [inputDataFile, setInputDataFile] = useState<File | null>(null);
  const [outputDataFile, setOutputDataFile] = useState<File | null>(null);
  const inputDataInputRef = useRef<HTMLInputElement>(null);
  const outputDataInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UploadAssignmentFormData>({
    resolver: zodResolver(uploadAssignmentSchema),
    defaultValues: {
      title: "",
      type: "coding",
      content: "",
      inputData: undefined,
      outputData: undefined,
      suggestion: "",
      sampleData: "",
      answer: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = (data: UploadAssignmentFormData) => {
    onSubmit(data);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-white p-0 rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-6 pb-4 border-b border-[#919EAB52] text-left">
          <DialogTitle className="text-lg text-left font-medium text-gray-900">
            Thêm bài tập
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="p-6 space-y-5"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {/* Tiêu đề */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Tiêu đề" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Loại bài tập */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại bài tập</FormLabel>
                  <FormControl>
                    <Select value={field.value} disabled>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Coding" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coding">Coding</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Nội dung */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung</FormLabel>
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
            {/* Dữ liệu đầu vào */}
            <FormField
              control={form.control}
              name="inputData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Dữ liệu đầu vào
                  </FormLabel>
                  <FormControl>
                    <div
                      className="border-2 border-dashed bg-[#919EAB]/8 border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                      onClick={() => inputDataInputRef.current?.click()}
                    >
                      {!inputDataFile ? (
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-[#919EAB]/8 rounded-full flex items-center justify-center mb-4">
                            <Image
                              width={64}
                              height={64}
                              alt="file"
                              src="/images/upload.png"
                            />
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
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <p className="text-sm text-gray-500 mb-2">
                            {inputDataFile.name}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              setInputDataFile(null);
                              field.onChange(null);
                              if (inputDataInputRef.current) {
                                inputDataInputRef.current.value = "";
                              }
                            }}
                          >
                            Xóa
                          </Button>
                        </div>
                      )}
                      <input
                        type="file"
                        accept=".txt,.json"
                        ref={inputDataInputRef}
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setInputDataFile(file);
                            field.onChange(file);
                          }
                        }}
                        className="hidden"
                        id="input-data-upload"
                      />
                    </div>
                  </FormControl>
                  <p className="text-xs text-gray-500 gap-1 mt-2 flex items-center">
                    <InfoCircle variant="Bold" size={16} color="#637381" />
                    <span className="font-medium">Kích thước:</span> 10Mb. {" "}
                    <span className="font-medium">Hỗ trợ tệp:</span> TXT, JSON
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Dữ liệu đầu ra */}
            <FormField
              control={form.control}
              name="outputData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Dữ liệu đầu ra
                  </FormLabel>
                  <FormControl>
                    <div
                      className="border-2 border-dashed bg-[#919EAB]/8 border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                      onClick={() => outputDataInputRef.current?.click()}
                    >
                      {!outputDataFile ? (
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-[#919EAB]/8 rounded-full flex items-center justify-center mb-4">
                            <Image
                              width={64}
                              height={64}
                              alt="file"
                              src="/images/upload.png"
                            />
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
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <p className="text-sm text-gray-500 mb-2">
                            {outputDataFile.name}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              setOutputDataFile(null);
                              field.onChange(null);
                              if (outputDataInputRef.current) {
                                outputDataInputRef.current.value = "";
                              }
                            }}
                          >
                            Xóa
                          </Button>
                        </div>
                      )}
                      <input
                        type="file"
                        accept=".txt,.json"
                        ref={outputDataInputRef}
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setOutputDataFile(file);
                            field.onChange(file);
                          }
                        }}
                        className="hidden"
                        id="output-data-upload"
                      />
                    </div>
                  </FormControl>
                  <p className="text-xs text-gray-500 gap-1 mt-2 flex items-center">
                    <InfoCircle variant="Bold" size={16} color="#637381" />
                    <span className="font-medium">Kích thước:</span> 10Mb. {" "}
                    <span className="font-medium">Hỗ trợ tệp:</span> TXT, JSON
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Gợi ý */}
            <FormField
              control={form.control}
              name="suggestion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gợi ý</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Gợi ý" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Dữ liệu mẫu */}
            <FormField
              control={form.control}
              name="sampleData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dữ liệu mẫu (Tuỳ chọn)</FormLabel>
                  <FormControl>
                    <CodeMirror
                      value={field.value}
                      height="200px"
                      extensions={[cpp()]}
                      theme="light"
                      readOnly
                      basicSetup={{ lineNumbers: true }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Đáp án */}
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đáp án</FormLabel>
                  <FormControl>
                    <CodeMirror
                      value={field.value}
                      height="200px"
                      extensions={[cpp()]}
                      theme="light"
                      readOnly
                      basicSetup={{ lineNumbers: true }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end space-x-3 pt-4 border-t border-[#919EAB52]">
              <Button
                type="button"
                size="sm"
                className="bg-[#FFF1F1] hover:bg-[#FEE2E2] text-[#E53935]"
                onClick={handleClose}
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Thêm bài tập
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
