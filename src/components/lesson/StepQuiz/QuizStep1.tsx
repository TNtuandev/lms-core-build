import ItemQuiz from "@/components/lesson/ItemQuiz";
import ItemResult from "@/components/lesson/ItemResult";

export interface IQuizStepProps {
  changeTab: (tab: string) => void;
}

export default function QuizStep1({changeTab}: IQuizStepProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bài tập 1</h1>
      <ItemQuiz changeTab={changeTab} />
      <ItemResult />
    </div>
  )
}