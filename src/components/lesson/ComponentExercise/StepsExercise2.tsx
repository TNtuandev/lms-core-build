import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import IconDownload from "../../../../public/icons/lessson/IconDownload";
import IconUpload from "../../../../public/icons/lessson/IconUpload";
import IconNoti from "../../../../public/icons/lessson/IconNoti";
import CKEditorWrapper from "@/components/courses/editor/CKEditorWrapper";
import { useSubmitPracticeFile, useSubmitPracticeWriting } from "@/hooks/queries/tracking/useTracking";

export interface IStepsExercise2Props {
  changeTab: (tab: string) => void;
  dataCourse: any;
  dataLesson: any;
  dataTracking: any;
}

export default function StepsExercise2({ dataLesson, dataCourse}: IStepsExercise2Props) {
  const submitPracticeWriting = useSubmitPracticeWriting(dataCourse?.id as string, dataLesson?.id as string);
  const submitPracticeFile = useSubmitPracticeFile(dataCourse?.id as string, dataLesson?.id as string);

  console.log(dataLesson, "---dataLesson");


  const renderContentTab = (value: string) => {
    switch (value) {
      case "content":
        return (
          <div className="w-full">
            <div>
              <div className="font-semibold mb-2">{dataLesson?.title}</div>
              <p className="text-gray-700">
                {dataLesson?.description}
              </p>
            </div>
          </div>
        );
      case "download":
        return (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <IconDownload />
              <div className="text-[#1D7BF5]">File video.mp4</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center py-10 overflow-hidden">
      <div className="w-full max-w-2xl">
        {/* Header info */}
        <div className="text-xl font-bold">{dataLesson?.title}</div>
        <div className="flex gap-3">
          <div className="text-sm text-[#637381]">
            Bạn cần ít nhất {dataLesson?.passingScore}% điểm để vượt qua.
          </div>
        </div>
        <div className="p-4 md:p-6 bg-white border border-gray-200 rounded-2xl mt-10">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="mb-2">
              <TabsTrigger value="content">Nội dung</TabsTrigger>
              <TabsTrigger value="download">Tải xuống</TabsTrigger>
            </TabsList>
            <TabsContent
              value="content"
              className="mt-4 md:mt-6 text-sm md:text-base"
            >
              {renderContentTab("content")}
            </TabsContent>
            <TabsContent
              value="download"
              className="mt-4 md:mt-6 text-sm md:text-base"
            >
              {renderContentTab("download")}
            </TabsContent>
          </Tabs>
        </div>
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl">
          <div className="p-6 border-b border-b-gray-200 text-lg font-semibold">
            Nộp bài tập
          </div>
          <div className="p-6">
            <div className="font-semibold text-sm">
              Nhập câu trả lời của bạn
            </div>
            {dataLesson?.practiceType === "upload_file" ? (
              <>
                <div className="bg-[#919EAB14] border border-dashed border-[#919EAB52] p-10 rounded-xl mt-3 flex flex-col items-center">
                  <IconUpload />
                  <div className="mt-6 font-semibold mb-2">
                    Thả hoặc chọn tệp tin
                  </div>
                  <span>
                    Thả tệp tin vào đây hoặc nhấp để{" "}
                    <span className="underline text-blue-600 cursor-pointer">
                      duyệt
                    </span>{" "}
                    từ máy tính
                  </span>
                </div>
                <span className="flex items-center gap-2 text-[#637381] mt-3">
                  <IconNoti />
                  <span className="font-semibold text-primary">
                    Kích thước:
                  </span>
                  10 MB,{" "}
                  <span className="font-semibold text-primary">
                    Hỗ trợ tệp:
                  </span>{" "}
                  PDF, ZIP, RAR
                </span>
              </>
            ) : (
              <div className="mt-6">
                <CKEditorWrapper
                  placeholder="Viết gì đó..."
                  value={""}
                  onChange={function (data: string): void {
                    console.log("Editor content changed:", data);
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-10">
          <button className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gray-900 text-white font-semibold shadow hover:bg-gray-800 transition disabled:opacity-60">
            Nộp bài
          </button>
        </div>
      </div>
    </div>
  );
}
