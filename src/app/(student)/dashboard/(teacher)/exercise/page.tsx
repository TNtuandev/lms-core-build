"use client";

import React from "react";
import {Edit2} from "iconsax-react";
import {Trash2} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Table} from "antd";


const dataSource = [
  {
    key: '1',
    date: '06/04/2025 09:00 am',
    title: 'Write Link short essay on yourself using the 5',
    student: 'John Due',
    totalScore: 80,
    result: 'Đạt',
  },
];

const columns = [
  {
    title: 'Bài kiểm tra',
    dataIndex: 'title',
    key: 'title',
    render: (_: any, record: any) => (
      <div>
        <div className="text-[#212B36] text-[14px]">{record.title}</div>
        <div className="text-xs text-secondary mt-1">Học viên: <span className="font-medium text-[#222]">{record.student}</span></div>
      </div>
    ),
  },
  {
    title: 'Tổng điểm',
    dataIndex: 'totalScore',
    key: 'totalScore',
    align: 'center' as const,
    width: 80,
    render: (ca: any) => (
      <div style={{
        textAlign: 'center',
      }}>{ca}</div>
    ),
  },
  {
    title: 'Kết quả',
    dataIndex: 'result',
    key: 'result',
    align: 'center' as const,
    width: 100,
    render: (result: any) => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <span className="bg-[#E9FCD4] text-[#229A16] rounded px-3 py-1 text-xs font-semibold">{result}</span>
      </div>
    ),
  },
  {
    title: '',
    key: 'action',
    width: 100,
    align: 'center' as const,
    render: () => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
      }}>
        <button className="p-2 hover:bg-[#F4F6F8] rounded" title="Sửa">
          <Edit2 size={20} color="#2F57EF"/>
        </button>
        <button className="p-2 hover:bg-[#F4F6F8] rounded" title="Xóa">
          <Trash2 size={20} color="#F44336"/>
        </button>
      </div>
    ),
  },
];

function ExcercisePage() {
  return (
    <div className="p-6  rounded-2xl box-shadow-page">
      <div className="max-w-5xl mx-auto">
        <div className="font-bold text-[20px] mb-6 text-[#222]">Bài tập</div>

        {/* Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-2">
          <div className="flex-1">
            <div className="text-sm font-semibold pb-2">Khoá học</div>
            <Select>
              <SelectTrigger className="w-full h-[48px] border-[#E7E9ED] bg-white text-[#222] text-[15px]">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="web">Thiết kế web</SelectItem>
                <SelectItem value="app">App Development</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold pb-2">Sắp xếp</div>
            <Select>
              <SelectTrigger className="w-full h-[48px] border-[#E7E9ED] bg-white text-[#222] text-[15px]">
                <SelectValue placeholder="Mặc định" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Mặc định</SelectItem>
                <SelectItem value="date">Ngày tạo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold pb-2">Giấy phép</div>
            <Select>
              <SelectTrigger className="w-full h-[48px] border-[#E7E9ED] bg-white text-[#222] text-[14px]">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="granted">Đã cấp phép</SelectItem>
                <SelectItem value="not-granted">Chưa cấp phép</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Table */}
        <div className="bg-white rounded-xl overflow-hidden border border-[#E7E9ED] mt-8">
          <Table
            dataSource={Array(5).fill(dataSource[0])}
            columns={columns}
            pagination={false}
            rowClassName={() => "!bg-white hover:!bg-[#F4F6F8] border-b border-[#F4F6F8]"}
            className="custom-ant-table"
          />
        </div>
      </div>
    </div>
  );

}

export default ExcercisePage;
