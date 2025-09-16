import React from "react";

interface CourseDetailsProps {
  courseDetail: {
    requirements?: string;
    description: string;
    learningOutcomes?: string;
  };
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({
  courseDetail,
}) => {
  return (
    <>
      {/* Requirements Section */}
      <div className="bg-white p-6 rounded-lg border shadow border-gray-100 mb-8">
        <h3 className="text-xl font-bold mb-6">Yêu cầu</h3>
        <div className="space-y-2">
          <div>
            &#8226; {courseDetail.requirements || "Không có yêu cầu đặc biệt"}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white p-6 rounded-lg border shadow border-gray-100 mb-8">
        <h3 className="text-xl font-bold mb-6">Mô tả</h3>
        <div className={`space-y-4`}>
          <p>{courseDetail.description}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border shadow border-gray-100 mb-8">
        {courseDetail.learningOutcomes && (
          <div>
            <h4 className="text-xl font-bold mb-6">Kết quả học tập:</h4>
            <p>{courseDetail.learningOutcomes}</p>
          </div>
        )}
      </div>
    </>
  );
};
