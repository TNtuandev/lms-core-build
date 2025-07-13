import { ArrowRight } from "lucide-react";
import { useQuizStore } from "@/store/slices/lesson.slice";

interface ItemQuizProps {
  changeTab: (tab: string) => void;
  type?: "QUIZ" | "exercise";
  data?: any; // Adjust type as needed
}

export default function ItemQuiz({changeTab, type, data}: ItemQuizProps) {
  const setQuizStarted = useQuizStore((state) => state.setQuizStarted);

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-md border border-gray-100 flex-shrink-0">
      <div className="flex justify-between flex-shrink-0">
        <div>
          <div className="text-lg font-semibold">{data?.title}</div>
          <div className="text-sm font-normal text-secondary">Bạn cần ít nhất {type === "exercise" ? data?.passingScore :((data?.passingScore / data?.maxScore)*100).toFixed(0)}% điểm để vượt qua.</div>
          <div className="flex items-center gap-8 mt-4">
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Điểm tối đa
              </div>
              <div className="text-sm font-normal text-gray-500">{type === "exercise" ? 100 : data?.maxScore} điểm</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Thời gian
              </div>
              <div className="text-sm font-normal text-gray-500">{data?.duration} phút</div>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            setQuizStarted(true);
            if (type === "exercise") {
              changeTab("stepsExercise2");
            } else {
              changeTab("quizStep2");
            }
          }}
          role="presentation"
          className="bg-[#2F57EF] cursor-pointer px-4 py-2 h-max flex-shrink-0 flex rounded-xl text-white text-sm font-semibold"
        >
          Bắt đầu
          <ArrowRight size="20" color="#fff" />
        </div>
      </div>
    </div>
  );
}