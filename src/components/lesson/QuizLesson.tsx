import React, { useState } from "react";
import QuizStep1 from "@/components/lesson/StepQuiz/QuizStep1";
import QuizStep2 from "@/components/lesson/StepQuiz/QuizStep2";

export default function QuizLesson() {
  const [tab, setTab] = useState("quizStep1");

  const tabList = {
    quizStep1: {
      component: QuizStep1,
    },
    quizStep2: {
      component: QuizStep2,
    },
  };


  return(
    <div className="md:mx-20 mx-4 h-[60vh] overflow-auto">
      <div>
        {React.createElement(tabList[tab as keyof typeof tabList].component, {
          changeTab: setTab,
        })}
      </div>
    </div>
  )
}