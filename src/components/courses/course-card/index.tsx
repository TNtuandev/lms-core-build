import React from "react";
import IconBook from "../../../../public/icons/IconBook";
import IconUser from "../../../../public/icons/IconUser";

interface CourseCardProps {
  badge?: "NEW" | "BESTSELLER" | "SALE";
  title: string;
  imageUrl: string;
  category: string;
  courseName: string;
  instructor: string;
  lessonCount: number;
  studentCount: number;
  currentPrice: string;
  originalPrice: string;
  gridNUmber?: number;
}

function CourseCard({
  badge,
  title,
  imageUrl,
  category,
  courseName,
  instructor,
  lessonCount,
  studentCount,
  currentPrice,
  originalPrice,
  gridNUmber = 3,
}: CourseCardProps) {
  const getBadgeColor = () => {
    switch (badge) {
      case "NEW":
        return "bg-cyan-400";
      case "BESTSELLER":
        return "bg-green-500";
      case "SALE":
        return "bg-red-500";
      default:
        return "bg-cyan-400";
    }
  };

  return (
    <div className="p-2 bg-white flex flex-col rounded-lg overflow-hidden shadow-md">
      {/* Card Title with Image */}
      <div className="relative rounded-lg overflow-hidden">
        {/* Course image */}
        <img
          src={imageUrl}
          alt={title}
          className={`object-cover w-full ${gridNUmber === 3 ? "h-64" : "h-48"}`}
          style={{ aspectRatio: "16/9" }}
        />

        {/* Badge */}
        {badge && (
          <div
            className={`absolute top-4 right-4 ${getBadgeColor()} text-white text-xs font-bold px-2 py-1 rounded`}
          >
            {badge}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 bg-white">
        <div className="text-blue-600 text-sm mb-2">{category}</div>
        <h4 className="font-semibold text-lg mb-2">{courseName}</h4>
        <div className="text-gray-600 text-sm mb-2">{instructor}</div>

        <div className="flex items-center gap-4 text-sm mb-3">
          <div className="flex items-center text-gray-500">
            <span className="mr-1">
              <IconBook />
            </span>{" "}
            {lessonCount} Bài học
          </div>
          <div className="flex items-center text-gray-500">
            <span className="mr-1">
              <IconUser />
            </span>{" "}
            {studentCount} Người học
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-lg font-medium mr-2">{currentPrice}₫</span>
          <span className="text-gray-400 line-through text-sm">
            {originalPrice}₫
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
