"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronRight, Check } from "lucide-react";
import Step1Form from "@/app/(admin)/create-courses/create/Step1Form";
import Step2Form from "@/app/(admin)/create-courses/create/Step2Form";

const steps = [
  { id: 1, title: "Tạo khóa học", description: "Tạo khóa học" },
  { id: 2, title: "Thêm thông tin", description: "Thêm thông tin" },
];

// Combined form data types
type Step1Data = {
  title: string;
  slug: string;
  description: string;
  content: string;
  fileType: string;
  category?: string;
  thumbnail?: any;
};

type Step2Data = {
  shortDescription: string;
  requirements: string;
  objectives: string;
  duration: string;
  lessons: string;
  level: string;
  instructor: string;
  tags?: string[];
  isSale?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
};

type CourseFormData = Step1Data & Step2Data;

function CreateCourse() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CourseFormData>>({});

  const handleStep1Complete = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: Step2Data) => {
    const finalData = { ...formData, ...data };
    console.log("Final form data:", finalData);
    // Handle final form submission here
    alert("Tạo khóa học thành công!");
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-white shadow-sm border border-gray-200">
              <nav className="space-y-2">
                {[
                  { label: "Tạo khóa học", active: currentStep === 1 },
                  { label: "Thêm thông tin", active: currentStep === 2 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      item.active
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
            {currentStep === 1 && (
              <Card className="p-8 bg-white shadow-sm border border-gray-200">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Chi tiết
                  </h2>
                </div>

                {/* Step 1 Form */}

                <Step1Form
                  onNext={handleStep1Complete}
                  initialData={formData}
                />

                {/* Step 2 Form */}
              </Card>
            )}
            {currentStep >= 2 && (
              <Step2Form
                onNext={handleStep2Complete}
                onBack={handleStep2Back}
                initialData={formData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
