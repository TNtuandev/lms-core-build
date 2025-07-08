import React from "react";
import IconTickGreen from "../../../public/icons/IconTickGreen";

export const CourseOverview: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-100 mb-8">
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
  );
}; 