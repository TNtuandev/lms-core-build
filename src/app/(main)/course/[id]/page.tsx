"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import IconClock from "../../../../../public/icons/IconClock";
import IconPrize from "../../../../../public/icons/IconPrize";
import IconUser from "../../../../../public/icons/IconUser";
import IconVideo from "../../../../../public/icons/IconVideo";
import CourseCard from "@/components/courses/course-card";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/slices/cart.slice";
import { Routes } from "@/lib/routes/routes";
import {
  ArrowDown2,
  ArrowRight2,
  ArrowUp2,
  Backward5Seconds,
} from "iconsax-react";
import IconTickGreen from "../../../../../public/icons/IconTickGreen";

// interface PageProps {
//   params: {
//     id: string;
//   };
// }

export default function CourseDetailPage() {
  const router = useRouter();
  const { pushToCart } = useCartStore();

  // Add state for active tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "content" | "details" | "instructor" | "reviews"
  >("overview");

  // Add state for description expand/collapse
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Add state for instructor bio expand/collapse
  const [showFullBio, setShowFullBio] = useState(false);

  // Add state for showing more reviews
  const [showMoreReviews, setShowMoreReviews] = useState(false);

  const [showMoreCardProduct, setShowMoreCardProduct] = useState(false);

  // Add refs for each section
  const overviewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const instructorRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Function to scroll to section
  const scrollToSection = (
    section: "overview" | "content" | "details" | "instructor" | "reviews",
  ) => {
    setActiveTab(section);

    let ref;
    switch (section) {
      case "overview":
        ref = overviewRef;
        break;
      case "content":
        ref = contentRef;
        break;
      case "details":
        ref = detailsRef;
        break;
      case "instructor":
        ref = instructorRef;
        break;
      case "reviews":
        ref = reviewsRef;
        break;
    }

    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // In a real application, you would fetch course details using the ID
  const courseData = {
    title: "Thiết kế giao diện người dùng và trải nghiệm (UI/UX)",
    description:
      "Khóa học giúp bạn nắm vững các nguyên tắc thiết kế UI/UX từ cơ bản đến nâng cao với các dự án thực tế. Bạn sẽ học cách phân tích người dùng, tạo wireframe, prototype và thiết kế giao diện đáp ứng nhu cầu người dùng.",
    instructor: "Anh Tuấn, Quang Anh",
    imageUrl: "/images/banner-sign-in.png",
    category: "Khóa học Thiết kế",
    lessonCount: 12,
    studentCount: 768,
    currentPrice: "529,000",
    originalPrice: "1,769,000",
    rating: 4.8,
    ratingCount: 256,
    duration: "24 giờ 30 phút",
    level: "Trung cấp",
    languages: ["Tiếng Việt"],
    topics: [
      "UI Design",
      "UX Research",
      "Wireframing",
      "Prototype",
      "Adobe XD",
      "Figma",
    ],
    updatedAt: "04/2025",
  };

  const handleCourseClick = (courseId: number) => {
    router.push(`/course/${courseId}`);
  };

  const handleCheckoutCourse = (item: typeof courseData) => {
    pushToCart({
      id: "1",
      name: item.title,
      price: 100000,
      salesPrice: 80000,
      originalPrice: 120000,
      imageUrl: "/images/banner-sign-in.png", // Thay bằng đường dẫn hình ảnh thực tế
    });

    router.push(Routes.checkout);
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[linear-gradient(92.2deg,rgba(47,87,239,0.2)_0%,rgba(255,177,69,0.2)_100.43%)] w-full py-12 md:py-20 md:mt-20 h-max">
        <div className="container mx-auto px-4 py-8 h-full flex flex-col justify-end w-full">
          <div className="text-[#2F57EF] mb-2 md:w-[50%] w-full">
            {courseData.category}
          </div>
          <div className="text-4xl font-bold text-[#212B36] mb-4 md:w-[50%] w-full">
            {courseData.title}
          </div>
          <p className="text-gray-600 mb-2 md:w-[60%] w-full">
            {courseData.description}
          </p>
          <div className="my-4 flex flex-wrap items-center gap-4">
            <div className="mt-2 w-max flex items-center gap-2 md:mt-0 font-light text-[#2F57EF] border bg-[#D14EA81F] border-white px-4 py-2 rounded-full">
              <IconPrize /> Bestseller
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-xl md:text-2xl font-medium text-[#FFB145]">
                  {courseData.rating}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4].map((_, index) => (
                    <span
                      key={index}
                      className="text-[#FFB145] text-xl md:text-2xl"
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-[#D9D9D9] text-xl md:text-2xl">★</span>
                </div>
              </div>
              <span className="text-gray-500 bg-[#F4F6F8] text-sm md:text-base px-3 py-1 rounded-md whitespace-nowrap">
                {courseData.ratingCount.toLocaleString()} Đánh giá
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IconUser />
              <span className="text-sm text-gray-500">
                {courseData.studentCount} Người học
              </span>
            </div>
          </div>
          <div className="text-gray-600 text-sm mb-2">
            Giáo viên: {courseData.instructor}
          </div>
          <div className="flex items-center gap-2">
            <IconClock />
            <div className="text-gray-600 text-sm">
              Cập nhật lần cuối {courseData.updatedAt}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:w-1/4 block md:absolute right-[5%] top-[20%] h-full">
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="w-full h-[250px] relative rounded-lg overflow-hidden mb-8">
            <Image
              src={courseData.imageUrl}
              alt={courseData.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="text-[#2F57EF] font-semibold mb-1">
            {courseData.category}
          </div>
          <h2 className="text-xl font-bold mb-4">{courseData.title}</h2>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-gray-700">{courseData.rating}</span>
              <span className="ml-1 text-gray-500">
                ({courseData.ratingCount})
              </span>
            </div>
            <div className="mx-3 text-gray-300">|</div>
            <div className="text-gray-700">
              {courseData.studentCount} học viên
            </div>
          </div>

          <div className="flex items-center mb-6">
            <div className="text-2xl font-bold text-[#2F57EF]">
              {courseData.currentPrice}đ
            </div>
            <div className="ml-2 text-gray-500 line-through text-sm">
              {courseData.originalPrice}đ
            </div>
          </div>

          <button
            onClick={() => handleCheckoutCourse(courseData)}
            className="bg-[#2F57EF] text-white w-full py-3 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer"
          >
            Thêm vào giỏ hàng
          </button>
          <button
            onClick={() => handleCheckoutCourse(courseData)}
            className="bg-white border border-[#919EAB52] mt-2 text-primary w-full py-3 rounded-lg font-bold hover:bg-blue-700 transition cursor-pointer"
          >
            Mua ngay
          </button>
          <div className="flex gap-2 justify-center text-secondary mt-2 text-sm items-center">
            <Backward5Seconds size="24" color="#637381" />
            Đảm bảo hoàn tiền trong 30 ngày
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-2 border-b pb-2 border-dashed border-b-gray-200 mb-4">
              <div className="text-secondary font-semibold">Thời lượng</div>
              <div className="bg-[#919EAB29] px-2 rounded">
                <span className="text-xs text-gray-500 font-semibold">
                  1 giờ 12 phút
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 border-b pb-2 border-dashed border-b-gray-200 mb-4">
              <div className="text-secondary font-semibold">Đã đăng ký</div>
              <div className="bg-[#919EAB29] px-2 rounded">
                <span className="text-xs text-gray-500 font-semibold">100</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 border-b pb-2 border-dashed border-b-gray-200 mb-4">
              <div className="text-secondary font-semibold">Bài giảng</div>
              <div className="bg-[#919EAB29] px-2 rounded">
                <span className="text-xs text-gray-500 font-semibold">50</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 border-b pb-2 border-dashed border-b-gray-200 mb-4">
              <div className="text-secondary font-semibold">Cấp độ</div>
              <div className="bg-[#919EAB29] px-2 rounded">
                <span className="text-xs text-gray-500 font-semibold">
                  Cơ bản
                </span>
              </div>
            </div>

            {showMoreCardProduct && (
              <>
                <div className="flex items-center justify-between gap-2 border-b pb-2 border-dashed border-b-gray-200 mb-4">
                  <div className="text-secondary font-semibold">Ngôn ngữ</div>
                  <div className="bg-[#919EAB29] px-2 rounded">
                    <span className="text-xs text-gray-500 font-semibold">
                      Tiếng Việt
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 border-b pb-2 border-dashed border-b-gray-200 mb-4">
                  <div className="text-secondary font-semibold">
                    Bài kiểm tra
                  </div>
                  <div className="bg-[#919EAB29] px-2 rounded">
                    <span className="text-xs text-gray-500 font-semibold">
                      10
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 border-b pb-2 border-dashed border-b-gray-200 mb-4">
                  <div className="text-secondary font-semibold">Chứng chỉ</div>
                  <div className="bg-[#919EAB29] px-2 rounded">
                    <span className="text-xs text-gray-500 font-semibold">
                      Có
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 border-b pb-2 border-dashed border-b-gray-200 mb-4">
                  <div className="text-secondary font-semibold">Hoàn thành</div>
                  <div className="bg-[#919EAB29] px-2 rounded">
                    <span className="text-xs text-gray-500 font-semibold">
                      95
                    </span>
                  </div>
                </div>
              </>
            )}
            <button
              onClick={() => setShowMoreCardProduct(!showMoreCardProduct)}
              className="text-[#2F57EF] flex items-center gap-2 mt-4 font-medium"
            >
              {!showMoreCardProduct ? "Hiển thị thêm" : "Ẩn bớt"}
              {!showMoreCardProduct ? (
                <ArrowDown2 size="20" color="#2F57EF" />
              ) : (
                <ArrowUp2 size="20" color="#2F57EF" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 bg-white py-4">
              <button
                className={`px-8 py-3 font-medium rounded-full ${activeTab === "overview" ? "bg-[#2F57EF] text-white" : "bg-[#F4F6F8] text-gray-500 hover:bg-gray-200"}`}
                onClick={() => scrollToSection("overview")}
              >
                Tổng quan
              </button>
              <button
                className={`px-8 py-3 font-medium rounded-full ${activeTab === "content" ? "bg-[#2F57EF] text-white" : "bg-[#F4F6F8] text-gray-500 hover:bg-gray-200"}`}
                onClick={() => scrollToSection("content")}
              >
                Nội dung
              </button>
              <button
                className={`px-8 py-3 font-medium rounded-full ${activeTab === "details" ? "bg-[#2F57EF] text-white" : "bg-[#F4F6F8] text-gray-500 hover:bg-gray-200"}`}
                onClick={() => scrollToSection("details")}
              >
                Chi tiết
              </button>
              <button
                className={`px-8 py-3 font-medium rounded-full ${activeTab === "instructor" ? "bg-[#2F57EF] text-white" : "bg-[#F4F6F8] text-gray-500 hover:bg-gray-200"}`}
                onClick={() => scrollToSection("instructor")}
              >
                Người hướng dẫn
              </button>
              <button
                className={`px-8 py-3 font-medium rounded-full ${activeTab === "reviews" ? "bg-[#2F57EF] text-white" : "bg-[#F4F6F8] text-gray-500 hover:bg-gray-200"}`}
                onClick={() => scrollToSection("reviews")}
              >
                Đánh giá
              </button>
            </div>

            {/* Tab Content */}
            <div
              ref={overviewRef}
              className="bg-white p-6 rounded-lg shadow border border-gray-100 mb-8"
            >
              <h3 className="text-xl font-bold mb-6">
                Những gì bạn sẽ học được
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <IconTickGreen />
                  </div>

                  <p>Hiểu rõ sự khác biệt giữa UI và UX.</p>
                </div>

                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <IconTickGreen />
                  </div>
                  <p>
                    Nắm vững các nguyên tắc thiết kế giao diện và trải nghiệm
                    người dùng.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <IconTickGreen />
                  </div>
                  <p>
                    Thiết kế các wireframe, prototype và mockup chuyên nghiệp.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <IconTickGreen />
                  </div>
                  <p>
                    Sử dụng thành thạo các công cụ thiết kế phổ biến như Figma,
                    Adobe XD, Sketch.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <IconTickGreen />
                  </div>
                  <p>
                    Hiểu quy trình nghiên cứu người dùng và thử nghiệm sản phẩm.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <IconTickGreen />
                  </div>
                  <p>
                    Thực hành xây dựng sản phẩm thực tế từ ý tưởng đến sản phẩm
                    hoàn thiện.
                  </p>
                </div>

                <div className="flex items-start gap-2 flex-shink-0">
                  <div className="flex-shrink-0">
                    <IconTickGreen />
                  </div>
                  <p>
                    Biết cách trình bày và giao tiếp ý tưởng thiết kế với đội
                    ngũ phát triển và khách hàng.
                  </p>
                </div>
              </div>
            </div>

            <div
              ref={contentRef}
              className="bg-white p-6 rounded-lg shadow border border-gray-100 mb-8"
            >
              <h3 className="text-xl font-bold mb-6">Nội dung khóa học</h3>
              <div className="space-y-2">
                {[1, 2, 3].map((_, index) => (
                  <div
                    role="presentation"
                    className="p-4 rounded-lg bg-gray-50 cursor-pointer"
                    key={index}
                    onClick={() => router.push("/lesson")}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">Giới thiệu về UI/UX</h4>
                        <div className="bg-[#919EAB29] p-1 rounded">
                          <span className="text-sm text-gray-500 font-semibold">
                            1 giờ 12 phút
                          </span>
                        </div>
                      </div>
                      <ArrowRight2 size="24" color="black" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              ref={detailsRef}
              className="bg-white p-6 rounded-lg border shadow border-gray-100 mb-8"
            >
              <h3 className="text-xl font-bold mb-6">Yêu cầu</h3>
              <div className="space-y-2">
                <div>&#8226; Không yêu cầu kiến thức nền tảng về thiết kế.</div>
                <div>&#8226; Không yêu cầu kiến thức nền tảng về thiết kế.</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow border-gray-100 mb-8">
              <h3 className="text-xl font-bold mb-6">Mô tả</h3>
              <div
                className={`space-y-4 ${!showFullDesc ? "line-clamp-3" : ""}`}
              >
                <p>
                  Khóa học &#34;Thiết kế Giao diện và Trải nghiệm Người dùng
                  (UI/UX)&#34; mang đến cho bạn một hành trình học tập thực tế
                  từ nền tảng đến nâng cao.
                </p>

                <p>
                  Bạn sẽ làm chủ quy trình nghiên cứu người dùng, xây dựng luồng
                  UX hiệu quả, thiết kế giao diện tinh tế với các công cụ phổ
                  biến, và hoàn thiện sản phẩm số chất lượng cao.
                </p>

                <p>
                  Song song với lý thuyết là những bài tập thực hành thực tế,
                  giúp bạn tự tin tạo ra sản phẩm thực tiễn và xây dựng
                  portfolio cá nhân chuyên nghiệp.
                </p>

                <p>
                  Hoàn thành khóa học, bạn có thể làm việc với các vị trí
                  Designer, UX Researcher, UI/UX Specialist tại các công ty công
                  nghệ, startup, hoặc phát triển sự nghiệp tự do.
                </p>
              </div>
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-[#2F57EF] flex items-center gap-2 mt-4 font-medium"
              >
                Hiển thị thêm
                {!showFullDesc ? (
                  <ArrowDown2 size="20" color="#2F57EF" />
                ) : (
                  <ArrowUp2 size="20" color="#2F57EF" />
                )}
              </button>
            </div>

            <div
              ref={instructorRef}
              className="bg-white p-6 rounded-lg border shadow border-gray-100 mb-8"
            >
              <h3 className="text-xl font-bold mb-6">Người hướng dẫn</h3>
              <div className="flex flex-col">
                <div className="flex gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden relative">
                    <Image
                      src="/images/banner-sign-in.png"
                      alt="Nguyễn Anh Tuấn"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Nguyễn Anh Tuấn</h4>
                    <p className="text-gray-600 mb-2">
                      Nhà thiết kế và Giảng viên chính
                    </p>
                    <div className="flex flex-wrap gap-4 items-center mt-2">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-600">
                          215,548 Nhận xét
                        </span>
                      </div>
                      <div className="bg-[#919EAB29] p-1 rounded">
                        <span className="text-sm text-gray-500 font-semibold">
                          4,8 Đánh giá
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <IconUser />
                        <span className="text-sm text-gray-600">
                          768 Người học
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IconVideo />
                        <span className="text-sm text-gray-600">
                          15 Khóa học
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`mt-4 ${!showFullBio ? "line-clamp-3" : ""}`}>
                  <p className="text-gray-600">
                    Tôi là Nguyễn Anh Tuấn, một nhà phát triển với niềm đam mê
                    giảng dạy. Tôi là giảng viên chính tại London App Brewery,
                    trại huấn luyện lập trình hàng đầu London. Tôi đã giúp hàng
                    trăm nghìn học viên học cách viết mã và thay đổi cuộc sống
                    của họ bằng cách trở thành một nhà phát triển. Tôi đã được
                    các công ty như Twitter, Facebook và Google mời đến để dạy
                    cho nhân viên của họ.
                  </p>
                  <p className="text-gray-600">
                    Tôi là Nguyễn Anh Tuấn, một nhà phát triển với niềm đam mê
                    giảng dạy. Tôi là giảng viên chính tại London App Brewery,
                    trại huấn luyện lập trình hàng đầu London. Tôi đã giúp hàng
                    trăm nghìn học viên học cách viết mã và thay đổi cuộc sống
                    của họ bằng cách trở thành một nhà phát triển. Tôi đã được
                    các công ty như Twitter, Facebook và Google mời đến để dạy
                    cho nhân viên của họ.
                  </p>
                </div>

                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="text-[#2F57EF] flex items-center gap-2 mt-4 font-medium"
                >
                  Hiển thị thêm
                  {!showFullBio ? (
                    <ArrowDown2 size="20" color="#2F57EF" />
                  ) : (
                    <ArrowUp2 size="20" color="#2F57EF" />
                  )}
                </button>
              </div>
            </div>

            <div
              ref={reviewsRef}
              className="bg-white p-6 rounded-lg border shadow border-gray-100 mb-8"
            >
              <h3 className="text-xl font-bold mb-6">Đánh giá</h3>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="bg-[#FFF8EE] p-6 rounded-lg text-center min-w-[200px]">
                  <div className="text-6xl font-bold text-[#212B36] mb-2">
                    4.8
                  </div>
                  <div className="text-sm text-gray-500">
                    124.687
                    <br />
                    Lượt đánh giá
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex text-[#FFB145]">★★★★★</div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-[#FFB145] rounded-full"
                        style={{ width: "63%" }}
                      ></div>
                    </div>
                    <div className="w-10 text-sm text-gray-600 text-right">
                      63%
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex text-[#FFB145]">
                      ★★★★
                      <span className="text-gray-300">★</span>
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-[#FFB145] rounded-full"
                        style={{ width: "29%" }}
                      ></div>
                    </div>
                    <div className="w-10 text-sm text-gray-600 text-right">
                      29%
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex text-[#FFB145]">
                      ★★★
                      <span className="text-gray-300">★</span>
                      <span className="text-gray-300">★</span>
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-[#FFB145] rounded-full"
                        style={{ width: "6%" }}
                      ></div>
                    </div>
                    <div className="w-10 text-sm text-gray-600 text-right">
                      6%
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex text-[#FFB145]">
                      ★★
                      <span className="text-gray-300">★</span>
                      <span className="text-gray-300">★</span>
                      <span className="text-gray-300">★</span>
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-[#FFB145] rounded-full"
                        style={{ width: "1%" }}
                      ></div>
                    </div>
                    <div className="w-10 text-sm text-gray-600 text-right">
                      1%
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex text-[#FFB145]">
                      ★<span className="text-gray-300">★</span>
                      <span className="text-gray-300">★</span>
                      <span className="text-gray-300">★</span>
                      <span className="text-gray-300">★</span>
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-[#FFB145] rounded-full"
                        style={{ width: "1%" }}
                      ></div>
                    </div>
                    <div className="w-10 text-sm text-gray-600 text-right">
                      1%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Reviews */}
            <div className="bg-white p-6 rounded-lg border shadow border-gray-100 mb-8">
              <h3 className="text-xl font-bold mb-6">Đánh giá nổi bật</h3>
              <div className="space-y-3">
                {/* Review 1 */}
                <div
                  className={`border-b border-dashed pb-3 ${!showMoreReviews && "border-b-0 pb-0"}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-24 h-24 rounded-lg overflow-hidden relative flex-shrink-0">
                      <Image
                        src="/images/banner-sign-in.png"
                        alt="Linda Wilkinson"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#212B36]">
                        Linda Wilkinson
                      </h4>
                      <div className="flex text-[#FFB145] mt-1">★★★★★</div>
                      <p className="text-gray-600">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour.
                      </p>
                    </div>
                  </div>
                </div>

                {showMoreReviews && (
                  <>
                    {/* Review 2 */}
                    <div className="border-b border-dashed pb-3">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-24 h-24 rounded-lg overflow-hidden relative flex-shrink-0">
                          <Image
                            src="/images/banner-sign-in.png"
                            alt="Randolph Hand"
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#212B36]">
                            Randolph Hand
                          </h4>
                          <div className="flex text-[#FFB145] mt-1">★★★★★</div>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour.
                      </p>
                    </div>

                    {/* Review 3 */}
                    <div>
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-24 h-24 rounded-lg overflow-hidden relative flex-shrink-0">
                          <Image
                            src="/images/banner-sign-in.png"
                            alt="Ella Tromp"
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#212B36]">
                            Ella Tromp
                          </h4>
                          <div className="flex text-[#FFB145] mt-1">★★★★★</div>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour.
                      </p>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setShowMoreReviews(!showMoreReviews)}
                className="text-[#2F57EF] flex items-center gap-2 mt-6 font-medium"
              >
                Hiển thị thêm
                {!showMoreReviews ? (
                  <ArrowDown2 size="20" color="#2F57EF" />
                ) : (
                  <ArrowUp2 size="20" color="#2F57EF" />
                )}
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="md:text-3xl text-sm font-bold text-[#212B36]">
                  Khóa học khác của{" "}
                  <span className="text-[#2F57EF]">
                    {courseData.instructor}
                  </span>
                </div>
                <button
                  type="button"
                  className="font-semibold cursor-pointer text-xs md:text-base border rounded-lg px-2 py-1 border-gray-200"
                >
                  Xem tất cả
                </button>
              </div>

              <div className="md:grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 flex flex-col mt-4">
                {[1, 2].map((courseId, index) => (
                  <div
                    key={index}
                    className="cursor-pointer transition-transform hover:scale-[1.02]"
                    onClick={() => handleCourseClick(courseId)}
                  >
                    <CourseCard
                      gridNUmber={2}
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
      </div>
      <div
        className="bg-[background: linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 232, 210, 0.15) 49.52%, rgba(205, 223, 255, 0.15) 100%);
] w-full px-4 md:px-20 md:py-20 py-14"
      >
        <div className="flex flex-col gap-4">
          <div className="text-3xl font-bold text-[#212B36]">
            Các khóa học liên quan
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
