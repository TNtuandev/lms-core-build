"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface PurchaseOrder {
  id: string;
  courseName: string;
  purchaseDate: string;
  price: string;
  status: "Thành công" | "Đang xử lý" | "Đang chờ" | "Đã hủy";
}

function PurchaseHistoryPage() {
  // Mock data for purchase history
  const purchaseOrders: PurchaseOrder[] = [
    {
      id: "#5478",
      courseName: "App Development",
      purchaseDate: "06/04/2025 09:41 am",
      price: "529,000đ",
      status: "Thành công",
    },
    {
      id: "#5477",
      courseName: "App Development",
      purchaseDate: "06/04/2025 09:41 am",
      price: "529,000đ",
      status: "Đang xử lý",
    },
    {
      id: "#5476",
      courseName: "App Development",
      purchaseDate: "06/04/2025 09:41 am",
      price: "529,000đ",
      status: "Đang chờ",
    },
    {
      id: "#5475",
      courseName: "App Development",
      purchaseDate: "06/04/2025 09:41 am",
      price: "529,000đ",
      status: "Đã hủy",
    },
  ];

  const handleEdit = (orderId: string) => {
    console.log("Edit order:", orderId);
  };

  const handleDelete = (orderId: string) => {
    console.log("Delete order:", orderId);
  };

  const renderStatusBadge = (status: PurchaseOrder["status"]) => {
    const statusConfig = {
      "Thành công": "bg-green-100 text-green-800",
      "Đang xử lý": "bg-blue-100 text-blue-800",
      "Đang chờ": "bg-yellow-100 text-yellow-800",
      "Đã hủy": "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white shadow h-max p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6">Lịch sử mua hàng</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-2 text-gray-600 font-medium">
                ID
              </th>
              <th className="text-left py-4 px-2 text-gray-600 font-medium">
                Khóa học
              </th>
              <th className="text-left py-4 px-2 text-gray-600 font-medium">
                Ngày
              </th>
              <th className="text-left py-4 px-2 text-gray-600 font-medium">
                Giá
              </th>
              <th className="text-center py-4 px-2 text-gray-600 font-medium">
                Trạng thái
              </th>
              <th className="text-right py-4 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100">
                <td className="py-6 px-2">
                  <span className="text-gray-900 font-medium">
                    {order.id}
                  </span>
                </td>
                <td className="py-6 px-2">
                  <span className="text-gray-900 font-medium">
                    {order.courseName}
                  </span>
                </td>
                <td className="py-6 px-2">
                  <div>
                    <div className="text-gray-900">
                      {order.purchaseDate.split(' ')[0]}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.purchaseDate.split(' ').slice(1).join(' ')}
                    </div>
                  </div>
                </td>
                <td className="py-6 px-2">
                  <span className="text-gray-900 font-medium">
                    {order.price}
                  </span>
                </td>
                <td className="py-6 px-2 text-center">
                  {renderStatusBadge(order.status)}
                </td>
                <td className="py-6 px-2">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(order.id)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(order.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {purchaseOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Chưa có lịch sử mua hàng nào.</p>
        </div>
      )}
    </div>
  );
}

export default PurchaseHistoryPage; 