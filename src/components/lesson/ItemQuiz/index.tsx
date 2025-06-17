import { ArrowRight } from "lucide-react";
import { IQuizStepProps } from "@/components/lesson/StepQuiz/QuizStep1";

export default function ItemQuiz({changeTab}: IQuizStepProps) {
  return(
    <div className="w-full p-6 bg-white rounded-2xl shadow-md border border-gray-100 flex-shrink-0">
      <div className="flex justify-between flex-shrink-0">
        <div>
          <div className="text-lg font-semibold">Bài tập</div>
          <div className="text-sm font-normal text-secondary">Bài tập</div>
          <div className="flex items-center gap-8 mt-4">
            <div>
              <div className="text-sm font-semibold text-gray-700">Điểm tối đa</div>
              <div className="text-sm font-normal text-gray-500">30 phút</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-700">Thời gian</div>
              <div className="text-sm font-normal text-gray-500">30 phút</div>
            </div>
          </div>
        </div>
        <div onClick={() => changeTab("quizStep2")} role="presentation" className="bg-[#2F57EF] cursor-pointer px-4 py-2 h-max flex-shrink-0 flex rounded-xl text-white text-sm font-semibold">
          Bắt đầu
          <ArrowRight
            size="20"
            color="#fff"
          />
        </div>
      </div>
    </div>
  )
}