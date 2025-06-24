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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CKEditorWrapper from "@/components/courses/editor/CKEditorWrapper";
import ToggleSwitch from "../ToggleSwitch";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "iconsax-react";

const answerSchema = z.object({
  text: z.string().min(1, "Không được để trống"),
  isCorrect: z.boolean().optional(),
});

const questionSchema = z.object({
  question: z.string().min(1, "Không được để trống"),
  type: z.string().min(1, "Chọn loại câu hỏi"),
  score: z.string().min(1, "Nhập điểm cho câu trả lời"),
  random: z.boolean().optional(),
  required: z.boolean().optional(),
  description: z.string().optional(),
  answers: z.array(answerSchema).min(2, "Cần ít nhất 2 đáp án"),
  explanation: z.string().optional(),
  suggestion: z.string().optional(),
});

type QuestionFormData = z.infer<typeof questionSchema>;

interface QuizQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: QuestionFormData) => void;
  defaultValues?: Partial<QuestionFormData>;
}

export default function QuizQuestionModal({ isOpen, onClose, onSubmit, defaultValues }: QuizQuestionModalProps) {
  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: defaultValues || {
      question: "",
      type: "single",
      score: "10",
      random: false,
      required: false,
      description: "",
      answers: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
      ],
      explanation: "",
      suggestion: "",
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "answers",
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-white p-0 rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-6 pb-4 border-b border-[#919EAB52] text-left">
          <DialogTitle className="text-lg text-left font-medium text-gray-900">
            {defaultValues ? "Chỉnh sửa câu hỏi" : "Thêm câu hỏi"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5">
            {/* Nhập câu hỏi */}
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhập câu hỏi</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập câu hỏi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Loại câu hỏi & điểm */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại câu hỏi</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Chọn loại câu hỏi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">1 Đáp án</SelectItem>
                          <SelectItem value="multiple">Nhiều đáp án</SelectItem>
                          <SelectItem value="short">Câu trả lời ngắn</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Điểm cho câu trả lời</FormLabel>
                    <FormControl>
                      <Input placeholder="Ví dụ: 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Switch random & required */}
            <div className="grid grid-cols-2 gap-8 mb-2">
              <FormField
                control={form.control}
                name="random"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <ToggleSwitch
                        value={field.value || false}
                        onChange={field.onChange}
                        color="green"
                      />
                    </FormControl>
                    <FormLabel className="">Ngẫu nhiên</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="required"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <ToggleSwitch
                        value={field.value || false}
                        onChange={field.onChange}
                        color="green"
                      />
                    </FormControl>
                    <FormLabel className="">Câu trả lời bắt buộc</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            {/* Mô tả */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả (Tùy chọn)</FormLabel>
                  <FormControl>
                    <CKEditorWrapper value={field.value || ""} onChange={field.onChange} placeholder="Viết gì đó..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Đáp án */}
            <div>
              <div className="mb-2 font-medium">Đáp án</div>
              <div className="space-y-2">
                {fields.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`answers.${idx}.text` as const}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder={`Đáp án ${String.fromCharCode(65 + idx)}`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Checkbox chọn đúng */}
                    <FormField
                      control={form.control}
                      name={`answers.${idx}.isCorrect` as const}
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-center">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {/* Xóa đáp án */}
                      <Button type="button" variant="ghost" size="icon" onClick={() => remove(idx)}>
                        <Trash size={24} color="#637381"/>
                      </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full mt-3 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100"
                onClick={() => append({ text: "", isCorrect: false })}
              >
                <svg width="18" height="18" fill="none" stroke="#637381" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                Thêm đáp án
              </Button>
            </div>
            {/* Giải thích đáp án đúng */}
            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giải thích đáp án đúng</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Viết gì đó..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Gợi ý đáp án sai */}
            <FormField
              control={form.control}
              name="suggestion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gợi ý đáp án sai</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Viết gì đó..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Footer */}
            <div className="flex justify-between gap-2 mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Quay lại
              </Button>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={onClose} className="text-[#E53935]">
                  Hủy bỏ
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Lưu & Tiếp tục
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 