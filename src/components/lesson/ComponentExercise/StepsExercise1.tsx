import ItemQuiz from "@/components/lesson/ComponentQuiz/ItemQuiz";
import ItemResult from "@/components/lesson/ComponentQuiz/ItemResult";

export interface IQuizStepProps {
  changeTab: (tab: string) => void;
  dataCourse: any
  dataLesson: any
}

export default function StepsExercise1({changeTab, dataCourse, dataLesson}: IQuizStepProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{dataCourse?.title}</h1>
      <ItemQuiz changeTab={changeTab} type="PRACTICE" data={dataLesson} />
      <ItemResult />
    </div>
  )
}