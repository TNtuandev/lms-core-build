import { z } from "zod";

// Schema validation for Step 1
export const step1Schema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  categoryId: z.string().min(1, "Danh mục không được để trống"),
  teacher: z.string().min(1, "Giáo viên không được để trống"),
  slug: z.string().min(1, "Liên kết cố định không được để trống"),
  shortDescription: z.string().min(1, "Giới thiệu không được để trống"),
  thumbnail: z.any().optional(),
});

export const infoCourseSchema = z.object({
  description: z.string().min(10, "Mô tả chi tiết không được để trống"),
  requirements: z.string().min(10, "Yêu cầu không được để trống"),
  learningOutcomes: z.string().min(1, "Kết quả học tập không được để trống"),
  hour: z.any().optional(),
  minute: z.any().optional(),
  label: z.string().optional(),
});

export const settingCourseSchema = z.object({
  difficulty: z.string().min(1, "Vui lòng chọn cấp độ"),
  isPublic: z.boolean().optional(),
  enableQA: z.boolean().optional(),
  enableDrip: z.boolean().optional(),
})

export const videoIntroSchema = z.object({
  previewVideo: z.any().optional(),
  previewImg: z.any().optional(),
})

export const pricingCourseSchema = z.object({
  regularPrice: z.number().min(0, "Giá gốc không được âm"),
  discountedPrice: z.number().optional(),
  isFree: z.boolean().optional()
})
export const fullCourseSchema = step1Schema.merge(infoCourseSchema).merge(settingCourseSchema).merge(videoIntroSchema).merge(pricingCourseSchema)

export const moduleCourseSchema = z.object({
  title: z.string().min(1, "Tiêu đề module không được để trống"),
  shortDescription: z.string().min(1, "Giới thiệu module không được để trống"),
  order: z.number().optional()
})

export const lessonSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().min(1, "Tóm tắt không được để trống"),
  notes: z.any().optional(),
  videoUrl: z.string().url("URL video không hợp lệ").optional(),
  duration: z.string().optional(),
  attachmentUrl: z.any().optional(),
  isPreviewable: z.boolean().optional(),
  htmlContent: z.any().optional(),
  thumbnail: z.any().optional(),
  type: z.string().optional()
});

// Type definitions
export type Step1FormData = z.infer<typeof step1Schema>;
export type InfoFormData = z.infer<typeof infoCourseSchema>;
export type SettingCourseFormData = z.infer<typeof settingCourseSchema>;
export type VideoIntroFormData = z.infer<typeof videoIntroSchema>;
export type PricingCourseFormData = z.infer<typeof pricingCourseSchema>;
export type fullCourseFormData = z.infer<typeof fullCourseSchema>
export type ModuleCourseFormData = z.infer<typeof moduleCourseSchema>;
export type LessonFormData = z.infer<typeof lessonSchema>;
