"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Book } from "lucide-react";

function DashboardPage() {
  return (
    <div className="bg-white shadow h-max p-4 rounded-2xl">
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
  );
}

export default DashboardPage;
