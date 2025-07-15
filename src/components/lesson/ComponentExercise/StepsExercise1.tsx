import ItemQuiz from "@/components/lesson/ComponentQuiz/ItemQuiz";
import ItemResultTracking from "@/components/lesson/ComponentQuiz/ItemResultTracking";
import { useEffect } from "react";
import { useQuizStore } from "@/store/slices/lesson.slice";

export interface IQuizStepProps {
  changeTab: (tab: string) => void;
  dataCourse: any
  dataLesson: any
  dataTracking: any
  tab: any
}

export default function StepsExercise1({changeTab, dataCourse, dataLesson, dataTracking, tab}: IQuizStepProps) {
  const setQuizStarted = useQuizStore((state) => state.setQuizStarted);

  useEffect(() => {
    if (tab === "stepsExercise1") {
      setQuizStarted(false)
    }
  }, [tab]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{dataCourse?.title}</h1>
      <ItemQuiz changeTab={changeTab} type="PRACTICE" data={dataLesson} dataCourse={dataCourse} />
      <ItemResultTracking dataTracking={dataTracking} dataLesson={dataLesson} />
    </div>
  )
}