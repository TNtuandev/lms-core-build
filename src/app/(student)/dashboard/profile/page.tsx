"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

function ProfilePage() {
  return (
    <Card className="bg-white border-0 rounded-xl shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Hồ sơ</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            <div className="space-y-2">
              <label className="block text-gray-500">Ngày đăng ký</label>
              <div className="text-gray-800 font-medium">
                25/04/2025 06:00 am
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-500">Tên</label>
              <div className="text-gray-800 font-medium">Chris</div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-500">Họ</label>
              <div className="text-gray-800 font-medium">Hemsworth</div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-500">Tên người dùng</label>
              <div className="text-gray-800 font-medium">chrishemsworth</div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-500">Email</label>
              <div className="text-gray-800 font-medium">
                chrishemsworth@gmail.com
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-500">Số điện thoại</label>
              <div className="text-gray-800 font-medium">+ 84 345226268</div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-500">Kỹ năng/Nghề nghiệp</label>
              <div className="text-gray-800 font-medium">
                Nhà phát triển ứng dụng
              </div>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="block text-gray-500">Giới thiệu</label>
              <div className="text-gray-800">
                I&#39;m the Front-End Developer for #Rainbow IT in Bangladesh, OR. I
                have serious passion for UI effects, animations and creating
                intuitive, dynamic user experiences
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfilePage;
