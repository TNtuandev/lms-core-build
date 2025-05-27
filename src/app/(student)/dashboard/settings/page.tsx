"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera } from "lucide-react";

type TabType = "profile" | "security";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: "Chris",
    lastName: "Hemsworth",
    username: "chrishemsworth",
    phone: "+84 345226268",
    skills: "Application Developer",
    displayName: "Chris Hemsworth",
    bio: "I'm the Front-End Developer for #Rainbow IT in Bangladesh, OR. I have serious passion for UI effects, animations and creating intuitive, dynamic user experiences."
  });

  // Security form state
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSecurityChange = (field: string, value: string) => {
    setSecurityData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfileSave = () => {
    console.log("Save profile:", profileData);
    // Handle profile save logic here
  };

  const handlePasswordUpdate = () => {
    console.log("Update password:", securityData);
    // Handle password update logic here
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Tên</label>
              <Input
                value={profileData.firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProfileChange("firstName", e.target.value)}
                placeholder="Chris"
                className="border border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Họ</label>
              <Input
                value={profileData.lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProfileChange("lastName", e.target.value)}
                placeholder="Hemsworth"
                className="border border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Tên người dùng</label>
              <Input
                value={profileData.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProfileChange("username", e.target.value)}
                placeholder="chrishemsworth"
                className="border border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
              <Input
                value={profileData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProfileChange("phone", e.target.value)}
                placeholder="+84 345226268"
                className="border border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Kỹ năng/Nghề nghiệp</label>
              <Input
                value={profileData.skills}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProfileChange("skills", e.target.value)}
                placeholder="Application Developer"
                className="border border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Hiển thị tên công khai</label>
              <Select value={profileData.displayName} onValueChange={(value) => handleProfileChange("displayName", value)}>
                <SelectTrigger className="border border-gray-200 h-12">
                  <SelectValue placeholder="Chọn tên hiển thị" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem value="Chris Hemsworth">Chris Hemsworth</SelectItem>
                  <SelectItem value="Chris">Chris</SelectItem>
                  <SelectItem value="Hemsworth">Hemsworth</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Giới thiệu</label>
            <Textarea
              className="border border-gray-200"
              value={profileData.bio}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleProfileChange("bio", e.target.value)}
              placeholder="Nhập giới thiệu về bản thân..."
              rows={4}
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleProfileSave}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6"
            >
              Lưu thay đổi
            </Button>
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Mật khẩu cũ</label>
            <Input
              type="password"
              value={securityData.currentPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSecurityChange("currentPassword", e.target.value)}
              placeholder="Mật khẩu cũ"
              className="border border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
            <Input
              type="password"
              value={securityData.newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSecurityChange("newPassword", e.target.value)}
              placeholder="Mật khẩu mới"
              className="border border-gray-200"

            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nhập lại mật khẩu mới</label>
            <Input
              type="password"
              value={securityData.confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSecurityChange("confirmPassword", e.target.value)}
              placeholder="Nhập lại mật khẩu mới"
              className="border border-gray-200"
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handlePasswordUpdate}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6"
            >
              Cập nhật mật khẩu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
