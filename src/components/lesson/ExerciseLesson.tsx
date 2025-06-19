import React, { useState } from "react";
import { useQuizStore } from "@/store/slices/lesson.slice";
import StepsExercise1 from "@/components/lesson/ComponentExercise/StepsExercise1";
import StepsExercise2 from "@/components/lesson/ComponentExercise/StepsExercise2";

export default function ExerciseLesson() {
  const [tab, setTab] = useState("stepsExercise1");
  const isQuizStarted = useQuizStore((state) => state.isQuizStarted);

  const tabList = {
    stepsExercise1: {
      component: StepsExercise1,
    },
    stepsExercise2: {
      component: StepsExercise2,
    },
  };

  return(
    <div className={`md:mx-20 mx-4 ${isQuizStarted ? 'h-full' : 'h-[60vh] overflow-auto'}`}>
      <div>
        {React.createElement(tabList[tab as keyof typeof tabList].component, {
          changeTab: setTab,
        })}
      </div>
    </div>
  )
}