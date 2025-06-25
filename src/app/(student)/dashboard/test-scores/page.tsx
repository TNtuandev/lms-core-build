"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {Eye, Trash} from "iconsax-react";

interface TestScore {
  id: number;
  courseName: string;
  testDate: string;
  questions: number;
  totalMarks: number;
  correctAnswers: number;
  result: "Đạt" | "Chưa đạt";
}

function TestScoresPage() {
  // Mock data for test scores
  const testScores: TestScore[] = [
    {
      id: 1,
      courseName: "Write Link short essay on yourself using the 5",
      testDate: "06/04/2025 09:00 am",
      questions: 4,
      totalMarks: 8,
      correctAnswers: 4,
      result: "Đạt",
    },
    {
      id: 2,
      courseName: "Write Link short essay on yourself using the 5",
      testDate: "06/04/2025 09:00 am",
      questions: 4,
      totalMarks: 8,
      correctAnswers: 4,
      result: "Chưa đạt",
    },
    {
      id: 3,
      courseName: "Write Link short essay on yourself using the 5",
      testDate: "06/04/2025 09:00 am",
      questions: 4,
      totalMarks: 8,
      correctAnswers: 4,
      result: "Đạt",
    },
    {
      id: 4,
      courseName: "Write Link short essay on yourself using the 5",
      testDate: "06/04/2025 09:00 am",
      questions: 4,
      totalMarks: 8,
      correctAnswers: 4,
      result: "Đạt",
    },
  ];

  const handleEdit = (testId: number) => {
    console.log("Edit test:", testId);
  };

  const handleDelete = (testId: number) => {
    console.log("Delete test:", testId);
  };

  const renderResultBadge = (result: "Đạt" | "Chưa đạt") => {
    const isPass = result === "Đạt";
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${
          isPass
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-700"
        }`}
      >
        {result}
      </span>
    );
  };

  return (
    <div className="bg-white shadow h-max p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6">Điểm kiểm tra</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-2 text-gray-600 font-medium">
                Khóa học
              </th>
              <th className="text-center py-4 px-2 text-gray-600 font-medium">
                Qus
              </th>
              <th className="text-center py-4 px-2 text-gray-600 font-medium">
                TM
              </th>
              <th className="text-center py-4 px-2 text-gray-600 font-medium">
                CA
              </th>
              <th className="text-center py-4 px-2 text-gray-600 font-medium">
                Result
              </th>
              <th className="text-right py-4 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {testScores.map((test) => (
              <tr key={test.id} className="border-b border-gray-100">
                <td className="py-6 px-2">
                  <div>
                    <div className="text-gray-900 font-medium mb-1">
                      {test.courseName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {test.testDate}
                    </div>
                  </div>
                </td>
                <td className="py-6 px-2 text-center">
                  <span className="text-gray-900 font-medium">
                    {test.questions}
                  </span>
                </td>
                <td className="py-6 px-2 text-center">
                  <span className="text-gray-900 font-medium">
                    {test.totalMarks}
                  </span>
                </td>
                <td className="py-6 px-2 text-center">
                  <span className="text-gray-900 font-medium">
                    {test.correctAnswers}
                  </span>
                </td>
                <td className="py-6 px-2 text-center">
                  {renderResultBadge(test.result)}
                </td>
                <td className="py-6 px-2">
                  <div className="flex items-center justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(test.id)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Eye
                        size="20"
                        color="#2F57EF"
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(test.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash size={20} color="#F44336"/>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {testScores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Chưa có điểm kiểm tra nào.</p>
        </div>
      )}
    </div>
  );
}

export default TestScoresPage;
