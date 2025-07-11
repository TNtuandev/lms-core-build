"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Loader2, Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

type TabType = "profile" | "security";

// Schema validation for Profile
const profileSchema = z.object({
  firstName: z.string().min(1, "Tên không được để trống"),
  lastName: z.string().min(1, "Họ không được để trống"),
  username: z.string().min(1, "Tên người dùng không được để trống"),
  phone: z.string().min(1, "Số điện thoại không được để trống"),
  skills: z.string().min(1, "Kỹ năng không được để trống"),
  bio: z.string().optional(),
});

// Schema validation for Security
const securitySchema = z.object({
  currentPassword: z.string().min(1, "Mật khẩu cũ không được để trống"),
  newPassword: z
    .string()
    .min(1, "Mật khẩu mới không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: z.string().min(1, "Xác nhận mật khẩu không được để trống"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type SecurityFormData = z.infer<typeof securitySchema>;

function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);

  // Profile form setup
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "Chris",
      lastName: "Hemsworth",
      username: "chrishemsworth",
      phone: "+84 345226268",
      skills: "Application Developer",
      bio: "I'm the Front-End Developer for #Rainbow IT in Bangladesh, OR. I have serious passion for UI effects, animations and creating intuitive, dynamic user experiences."
    },
  });

  // Security form setup
  const securityForm = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
  });

  const onProfileSubmit = async (data: ProfileFormData) => {
    setIsProfileSaving(true);
    try {
      console.log("Save profile:", data);
      // Handle profile save logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsProfileSaving(false);
    }
  };

  const onSecuritySubmit = async (data: SecurityFormData) => {
    setIsPasswordUpdating(true);
    try {
      console.log("Update password:", data);
      // Handle password update logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      securityForm.reset(); // Reset form after successful update
    } catch (error) {
      console.error("Error updating password:", error);
    } finally {
      setIsPasswordUpdating(false);
    }
  };

  return (
    <div className="bg-white shadow h-max p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6">Setting</h2>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          <button
            className={`pb-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === "profile"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Hồ sơ
          </button>
          <button
            className={`pb-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === "security"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("security")}
          >
            Bảo mật
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          {/* Profile Banner */}
          <Card className="overflow-hidden">
            <div className="relative h-40 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
              <div className="absolute inset-0" style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundBlendMode: "overlay"
              }}>
                <div className="absolute inset-0" style={{
                  background: "url('/images/abstract-bg.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.3
                }}></div>
              </div>

              <div className="absolute bottom-4 left-4 flex items-center gap-4">
                <div className="relative">
                  <img
                    src="/images/banner-sign-in.png"
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-4 border-white object-cover"
                  />
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                    <Camera className="w-3 h-3 text-gray-600" />
                  </button>
                </div>
              </div>

              <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
                Sửa ảnh bìa
              </button>
            </div>
          </Card>

          {/* Profile Form */}
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <FormField
                  control={profileForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-sm font-medium text-gray-700">Tên</label>
                      <FormControl>
                        <Input
                          placeholder="Chris"
                          className="border border-gray-200"
                          disabled={isProfileSaving}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={profileForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-sm font-medium text-gray-700">Họ</label>
                      <FormControl>
                        <Input
                          placeholder="Hemsworth"
                          className="border border-gray-200"
                          disabled={isProfileSaving}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Username */}
                <FormField
                  control={profileForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-sm font-medium text-gray-700">Tên người dùng</label>
                      <FormControl>
                        <Input
                          placeholder="chrishemsworth"
                          className="border border-gray-200"
                          disabled={isProfileSaving}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={profileForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                      <FormControl>
                        <Input
                          placeholder="+84 345226268"
                          className="border border-gray-200"
                          disabled={isProfileSaving}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Skills */}
                <FormField
                  control={profileForm.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Kỹ năng/Nghề nghiệp</label>
                      <FormControl>
                        <Input
                          placeholder="Application Developer"
                          className="border border-gray-200"
                          disabled={isProfileSaving}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bio */}
              <FormField
                control={profileForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <label className="block text-sm font-medium text-gray-700">Giới thiệu</label>
                    <FormControl>
                      <Textarea
                        className="border border-gray-200"
                        placeholder="Nhập giới thiệu về bản thân..."
                        rows={4}
                        disabled={isProfileSaving}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isProfileSaving}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6"
                >
                  {isProfileSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    "Lưu thay đổi"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {activeTab === "security" && (
        <div className="space-y-6">
          <Form {...securityForm}>
            <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
              {/* Current Password */}
              <FormField
                control={securityForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <label className="block text-sm font-medium text-gray-700">Mật khẩu cũ</label>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Mật khẩu cũ"
                          className="border border-gray-200 pr-12"
                          disabled={isPasswordUpdating}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          disabled={isPasswordUpdating}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={securityForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Mật khẩu mới"
                          className="border border-gray-200 pr-12"
                          disabled={isPasswordUpdating}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          disabled={isPasswordUpdating}
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={securityForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <label className="block text-sm font-medium text-gray-700">Nhập lại mật khẩu mới</label>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Nhập lại mật khẩu mới"
                          className="border border-gray-200 pr-12"
                          disabled={isPasswordUpdating}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          disabled={isPasswordUpdating}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isPasswordUpdating}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6"
                >
                  {isPasswordUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang cập nhật...
                    </>
                  ) : (
                    "Cập nhật mật khẩu"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
