"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  User,
  Book,
  Heart,
  Star,
  FileText,
  History,
  Settings,
  LogOut,
} from "lucide-react";

function DashboardPage() {
  return (
    <div className="mb-20">
      {/* Colorful Banner/Header */}
      <div className="bg-[linear-gradient(92.2deg,rgba(47,87,239,0.2)_0%,rgba(255,177,69,0.2)_100.43%)] w-full h-[300px] relative"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-[160px] relative z-10">
        {/* Profile Info Section */}
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dashboard/banner-profile.png"
            alt="djd"
            className="h-full w-max"
          />
          <div className="absolute bottom-10 left-10 text-center">
            <div className="flex items-center gap-4">
              <Image
                src="/images/banner-sign-in.png"
                alt="Chris Hemsworth"
                width={120}
                height={120}
                className="rounded-full border-4 border-white"
              />
              <div>
                <h1 className="text-2xl font-bold mt-4 text-white">
                  Chris Hemsworth
                </h1>
                <div className="flex items-center mt-2 text-white">
                  <Book className="w-4 h-4 mr-1" color="white" />
                  <span className="text-sm text-white">
                    30 Khóa học đã đăng ký
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-sm font-medium uppercase text-gray-500 mb-4">
              CHÀO MỪNG, CHRIS HEMSWORTH
            </div>

            <nav className="space-y-1">
              <a
                href="#"
                className="flex items-center px-3 py-3 text-blue-600 bg-blue-50 rounded-lg"
              >
                <Home className="w-5 h-5 mr-3" />
                <span className="font-medium">Tổng quan</span>
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <User className="w-5 h-5 mr-3" />
                <span>Hồ sơ</span>
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Book className="w-5 h-5 mr-3" />
                <span>Khóa học đã đăng ký</span>
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Heart className="w-5 h-5 mr-3" />
                <span>Yêu thích</span>
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Star className="w-5 h-5 mr-3" />
                <span>Đánh giá</span>
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <FileText className="w-5 h-5 mr-3" />
                <span>Điểm kiểm tra</span>
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <History className="w-5 h-5 mr-3" />
                <span>Lịch sử mua hàng</span>
              </a>
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm font-medium uppercase text-gray-500 mb-4">
                CÀI NHÂN
              </div>

              <nav className="space-y-1">
                <a
                  href="#"
                  className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Settings className="w-5 h-5 mr-3" />
                  <span>Cài đặt</span>
                </a>
                <a
                  href="#"
                  className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span>Đăng xuất</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 bg-white shadow h-max p-4 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6">Tổng quan</h2>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <Card className="bg-blue-50 border-0">
                <CardContent className="flex flex-col items-center pt-6">
                  <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-lg mb-4">
                    <Book className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-5xl font-bold text-blue-500">30</h3>
                  <p className="mt-2 text-sm text-center">
                    Khóa học đã đăng ký
                  </p>
                </CardContent>
              </Card>

              {/* Card 2 */}
              <Card className="bg-amber-50 border-0">
                <CardContent className="flex flex-col items-center pt-6">
                  <div className="w-14 h-14 flex items-center justify-center bg-amber-100 rounded-lg mb-4">
                    <Book className="w-8 h-8 text-amber-500" />
                  </div>
                  <h3 className="text-5xl font-bold text-amber-500">12</h3>
                  <p className="mt-2 text-sm text-center">Khóa học Đang học</p>
                </CardContent>
              </Card>

              {/* Card 3 */}
              <Card className="bg-green-50 border-0">
                <CardContent className="flex flex-col items-center pt-6">
                  <div className="w-14 h-14 flex items-center justify-center bg-green-100 rounded-lg mb-4">
                    <Book className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-5xl font-bold text-green-500">18</h3>
                  <p className="mt-2 text-sm text-center">
                    Khóa học Hoàn thành
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
