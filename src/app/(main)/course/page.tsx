"use client";
import React, { useState, useEffect, useRef } from "react";
import CourseCard from "@/components/courses/course-card";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { CourseTab } from "@/components/courses/course-tab";


function CoursePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Nổi bật");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdowns when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsFilterOpen(false);
      setIsSortOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to handle course card click
  const handleCourseClick = (courseId: number) => {
    router.push(`/course/${courseId}`);
  };

  return (
    <div>
      {/*header*/}
      <div className="bg-[linear-gradient(92.2deg,rgba(47,87,239,0.2)_0%,rgba(255,177,69,0.2)_100.43%)] h-[300px] w-full">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col md:flex-row items-center md:gap-8">
            <div className="text-5xl font-bold text-[#212B36]">
              Khóa học thiết kế
            </div>
            <div className="mt-2 md:mt-0 font-light text-[#2F57EF] border bg-[#D14EA81F] border-white px-4 py-2 rounded-full">
              🎉 12 Khoá học
            </div>
          </div>
          <p className="text-[#212B36] mt-2">
            Trang chủ {">"}{" "}
            <span className="text-gray-400">Khóa học thiết kế</span>
          </p>
        </div>
      </div>
      {/*course Start*/}
      <div className="bg-white w-full px-4 md:px-20 md:py-20 py-14">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="text-3xl font-bold text-[#212B36]">
            Các khóa học giúp bạn bắt đầu
          </div>
          <div className="text-[#637381] mt-1">
            Khám phá các khóa học từ các chuyên gia giàu kinh nghiệm thực tế.
          </div>
          <CourseTab />
        </div>
      </div>
      <div
        className="bg-[background: linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 232, 210, 0.15) 49.52%, rgba(205, 223, 255, 0.15) 100%);
] w-full px-4 md:px-20 md:py-20 py-14"
      >
        <div className="flex flex-col gap-4">
          <div className="text-3xl font-bold text-[#212B36]">
            Tất cả khóa học Thiết kế
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mt-2 w-full">
            {/* Search Box */}
            <div className="relative w-full sm:max-w-[320px]">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#2F57EF] focus:border-[#2F57EF]"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>

            {/* Filter and Sort */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Filter Dropdown */}
              <div className="relative w-1/2 sm:w-auto" ref={filterRef}>
                <button
                  onClick={() => {
                    setIsFilterOpen(!isFilterOpen);
                    setIsSortOpen(false);
                  }}
                  className="flex items-center justify-between gap-2 bg-white px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 w-full"
                >
                  <span>Lọc</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M8 10.6667L4 6.66675H12L8 10.6667Z"
                      fill="#637381"
                    />
                  </svg>
                </button>
                {isFilterOpen && (
                  <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-1 bg-white shadow-lg rounded-lg py-2 w-full sm:w-48 z-20">
                    <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                      Tất cả
                    </div>
                    <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                      Miễn phí
                    </div>
                    <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                      Trả phí
                    </div>
                  </div>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative w-1/2 sm:w-auto" ref={sortRef}>
                <button
                  onClick={() => {
                    setIsSortOpen(!isSortOpen);
                    setIsFilterOpen(false);
                  }}
                  className="flex items-center justify-between gap-2 bg-white px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 w-full whitespace-nowrap"
                >
                  <span className="truncate">Sắp xếp: {sortOption}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M8 10.6667L4 6.66675H12L8 10.6667Z"
                      fill="#637381"
                    />
                  </svg>
                </button>
                {isSortOpen && (
                  <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-1 bg-white shadow-lg rounded-lg py-2 w-full sm:w-52 z-20">
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSortOption("Nổi bật");
                        setIsSortOpen(false);
                      }}
                    >
                      Nổi bật
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSortOption("Mới nhất");
                        setIsSortOpen(false);
                      }}
                    >
                      Mới nhất
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSortOption("Giá thấp đến cao");
                        setIsSortOpen(false);
                      }}
                    >
                      Giá thấp đến cao
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSortOption("Giá cao đến thấp");
                        setIsSortOpen(false);
                      }}
                    >
                      Giá cao đến thấp
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 flex flex-col mt-4">
            {[1, 2, 3, 4].map((courseId, index) => (
              <div
                key={index}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => handleCourseClick(courseId)}
              >
                <CourseCard
                  gridNUmber={4}
                  title="Difficult Things About Education."
                  imageUrl="/images/banner-sign-in.png"
                  category="Khóa học Thiết kế"
                  courseName="Thiết kế giao diện người dùng và trải nghiệm (UI/UX)"
                  instructor="Anh Tuấn, Quang Anh"
                  lessonCount={12}
                  studentCount={768}
                  currentPrice="529,000"
                  originalPrice="1,769,000"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
