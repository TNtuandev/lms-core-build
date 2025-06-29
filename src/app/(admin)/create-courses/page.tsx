"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Check, ChevronRight } from "lucide-react";
import Step1Form from "@/app/(admin)/create-courses/create/Step1Form";
import { fullCourseFormData } from "@/app/(admin)/create-courses/create/schemas";
import CourseInfoSection from "./create/components/CourseInfoSection";
import {
  CoursePricingSection,
  CourseSettingsSection,
  VideoIntroSection,
} from "@/app/(admin)/create-courses/create/components";
import { useCreateCourse } from "@/hooks/queries/course";
import { Trash } from "iconsax-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListStatusCourse } from "@/contants/course";
import {EStatusCourse, useStatusCourse} from "@/hooks/queries/course/useStatusCourse";
import {Course} from "@/api/types/course.type";

const steps = [
  { id: 1, title: "Tạo khóa học", description: "Tạo khóa học" },
  { id: 2, title: "Thêm thông tin", description: "Thêm thông tin" },
];

function CreateCourse() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<fullCourseFormData>>({});
  const [courseData, setCourseData] = useState<Course | null>(null);
  const handleStepNext = (data: any) => {
    const finalData = { ...formData, ...data };
    setFormData((prev: any) => ({ ...prev, ...finalData }));
    if (currentStep === stepsList.length) {
      handleFinalSubmit(finalData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleSetCourseData = (data: Course) => {
    setCourseData(data)
  }

  const { createCourse } = useCreateCourse(handleSetCourseData);
  const { archiveCourse, draftCourse, publishCourse } = useStatusCourse(handleSetCourseData);


  const handleStepBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const handleFinalSubmit = (data: fullCourseFormData) => {
    const request = {
      title: data.title,
      description: data.description,
      requirements: data.requirements,
      slug: data.slug,
      label: data.label,
      thumbnail: data.thumbnail,
      shortDescription: data.shortDescription,
      categoryId: data.categoryId,
      learningOutcomes: data.learningOutcomes,
      previewVideo: data.previewVideo,
      previewImg: data.previewImg,
      difficulty: data.difficulty,
      regularPrice: data.regularPrice,
      discountedPrice: data.discountedPrice,
    };

    createCourse.mutate(request);
  };

  const handleOnChangeStatus = (value: string) => {
    switch (value) {
      case EStatusCourse.ARCHIVED:
        archiveCourse.mutate(courseData?.id || "");
        break;
      case EStatusCourse.DRAFT:
        draftCourse.mutate(courseData?.id || "");
        break;
      case EStatusCourse.PUBLIC:
        publishCourse.mutate(courseData?.id || "");
        break;
    }
  }

  const stepsList = [
    {
      label: "Tạo khóa học",
      stepIndex: 1,
      component: <Step1Form onNext={handleStepNext} initialData={formData} />,
    },
    {
      label: "Thêm thông tin",
      stepIndex: 2,
      component: (
        <CourseInfoSection
          onNext={handleStepNext}
          onBack={handleStepBack}
          initialData={formData}
        />
      ),
    },
    {
      label: "Cài đặt khoá học",
      stepIndex: 3,
      component: (
        <CourseSettingsSection
          onNext={handleStepNext}
          onBack={handleStepBack}
          initialData={formData}
        />
      ),
    },
    {
      label: "Video giới thiệu",
      stepIndex: 4,
      component: (
        <VideoIntroSection
          onNext={handleStepNext}
          onBack={handleStepBack}
          initialData={formData}
        />
      ),
    },
    {
      label: "Giá khoá học",
      stepIndex: 5,
      component: (
        <CoursePricingSection
          onNext={handleStepNext}
          onBack={handleStepBack}
          initialData={formData}
        />
      ),
    },

    // { label: "Xây dựng khoá học", stepIndex: 5},
  ];

  const renderStepScreen = () => {
    const currentStepData = stepsList.find(
      (item) => item.stepIndex === currentStep,
    );
    if (currentStepData) {
      return currentStepData.component;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 md:mt-20 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between flex-col md:flex-row items-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-8 md:w-[30%]">
            Khóa học mới
          </h1>
          <div className="flex items-center justify-center mb-4 w-[70%] relative">
            {/* Connecting Line Background */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full md:max-w-[150px] max-w-[120px] h-[2px] bg-gray-300 z-0" />
            <div
              className={`absolute top-4 left-1/2 transform -translate-x-1/2 h-[2px] bg-blue-600 z-0 transition-all duration-300 w-0`}
            />

            <div className="flex items-center justify-between w-full max-w-[300px] relative z-10">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center flex-col gap-1">
                  <div
                    className={`flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-full border-2 ${
                      currentStep >= step.id
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-400 bg-gray-400 text-white"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" color="white" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="mt-2">
                    <p
                      className={`text-sm font-medium ${
                        currentStep >= step.id ? "" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {courseData && (
            <div className="flex items-end justify-end gap-2">
              <div className="p-2">
                <Trash />
              </div>
              <div>
                <Select
                  onValueChange={(value) => handleOnChangeStatus(value)}
                  value={courseData.status}
                >
                  <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Youtube" />
                  </SelectTrigger>
                  <SelectContent>
                    {ListStatusCourse.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-white shadow-sm border border-gray-200">
              <nav className="space-y-2">
                {stepsList.map((item, index) => (
                  <div
                    onClick={() => setCurrentStep(item.stepIndex)}
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      item.stepIndex === currentStep
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Form Card */}
            {renderStepScreen()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
