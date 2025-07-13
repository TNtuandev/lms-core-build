import {
  TickCircle,
  CloseCircle,
  ArrowRotateLeft,
} from "iconsax-react";
import { useState, useMemo, useEffect } from "react";

interface QuizOption {
  id: string;
  content: string;
  isCorrect: boolean;
  explanation: string;
  questionId: string;
}

interface QuizQuestion {
  id: string;
  lessonId: string;
  content: string;
  type: "MULTIPLE_CHOICE" | "SINGLE_CHOICE" | "SHORT_ANSWER";
  order: number;
  status: string;
  points: number;
  description?: string;
  correctExplanation?: string;
  incorrectHint?: string;
  isRandom: boolean;
  isRequiredAnswer: boolean;
  correctAnswer?: string | null;
  options?: QuizOption[];
  createdAt: string;
  updatedAt: string;
}

interface LessonData {
  id: string;
  moduleId: string;
  title: string;
  duration?: number;
  maxAttempts?: number;
  passingScore?: number;
  maxScore?: number;
  shortAnswerCharLimit?: number;
  questions?: QuizQuestion[];
}

type QuizState = "init" | "submitted";
type AnswerState = {
  selected: string[] | null; // Changed to string[] to handle multiple selections
  text: string;
  isCorrect: boolean | null;
  score: number; // Add score for this question
};

export interface IQuizStepProps {
  changeTab: (tab: string) => void;
  dataCourse: any
  dataLesson: LessonData
}

export default function QuizStep2({dataLesson}: IQuizStepProps) {
  // Sort questions by order
  const sortedQuestions = useMemo(() => {
    if (!dataLesson?.questions) return [];
    return [...dataLesson.questions].sort((a, b) => a.order - b.order);
  }, [dataLesson?.questions]);

  const [quizState, setQuizState] = useState<QuizState>("init");
  const [answers, setAnswers] = useState<AnswerState[]>([]);

  // Initialize answers when questions change
  useEffect(() => {
    setAnswers(
      sortedQuestions.map(() => ({ 
        selected: null, 
        text: "", 
        isCorrect: null,
        score: 0
      }))
    );
  }, [sortedQuestions]);

  const currentAttempt = 1;
  const timeLimit = dataLesson?.duration ? `${dataLesson.duration} phút` : "Không giới hạn";

  // Calculate score
  const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
  const maxPossibleScore = sortedQuestions.reduce((sum, question) => sum + (question.points || 0), 0);
  const passed = (totalScore / maxPossibleScore) * 100 >= (dataLesson?.passingScore || 80);

  // Handle answer selection for multiple choice and single choice
  const handleSelect = (qIdx: number, optionId: string) => {
    if (quizState === "submitted") return;
    
    const question = sortedQuestions[qIdx];
    
    setAnswers((prev) =>
      prev.map((a, idx) => {
        if (idx !== qIdx) return a;
        
        let newSelected: string[];
        
        if (question.type === "MULTIPLE_CHOICE") {
          // For multiple choice, toggle selection
          const currentSelected = a.selected || [];
          if (currentSelected.includes(optionId)) {
            newSelected = currentSelected.filter((id: string) => id !== optionId);
          } else {
            newSelected = [...currentSelected, optionId];
          }
        } else {
          // For single choice, replace selection
          newSelected = [optionId];
        }
        
        return {
          ...a,
          selected: newSelected,
          // Don't calculate score until submit
          isCorrect: null,
          score: 0
        };
      }),
    );
  };

  // Handle text input for short answer
  const handleText = (qIdx: number, value: string) => {
    if (quizState === "submitted") return;
    setAnswers((prev) =>
      prev.map((a, idx) => (idx === qIdx ? { ...a, text: value } : a)),
    );
  };

  // Calculate score for a question
  const calculateQuestionScore = (question: QuizQuestion, answer: AnswerState): number => {
    if (question.type === "MULTIPLE_CHOICE") {
      const correctOptions = question.options?.filter((opt: QuizOption) => opt.isCorrect) || [];
      const correctOptionIds = correctOptions.map((opt: QuizOption) => opt.id);
      const selected = answer.selected || [];
      
      // For multiple choice: all correct answers must be selected, no incorrect answers
      const allCorrectSelected = correctOptionIds.every((id: string) => selected.includes(id));
      const noIncorrectSelected = selected.every((id: string) => correctOptionIds.includes(id));
      
      return allCorrectSelected && noIncorrectSelected && correctOptionIds.length > 0 ? question.points : 0;
    } 
    else if (question.type === "SINGLE_CHOICE") {
      const correctOptions = question.options?.filter((opt: QuizOption) => opt.isCorrect) || [];
      const correctOptionIds = correctOptions.map((opt: QuizOption) => opt.id);
      const selected = answer.selected || [];
      
      // For single choice: exactly one correct answer
      return selected.length === 1 && correctOptionIds.includes(selected[0]) ? question.points : 0;
    }
    else if (question.type === "SHORT_ANSWER") {
      const userAnswer = answer.text.trim().toLowerCase();
      if (!userAnswer) return 0;
      
      // Check if answer matches any of the correct options
      const correctOptions = question.options?.filter((opt: QuizOption) => opt.isCorrect) || [];
      if (correctOptions.length === 0) {
        // If no correct options defined, give full points for any non-empty answer
        return question.points;
      }
      
      // Check if user answer matches any correct option (case-insensitive)
      const isCorrect = correctOptions.some((opt: QuizOption) => 
        opt.content.toLowerCase().trim() === userAnswer
      );
      
      return isCorrect ? question.points : 0;
    }
    
    return 0;
  };

  // Submit quiz
  const handleSubmit = () => {
    // Calculate scores for all questions
    setAnswers((prev) =>
      prev.map((answer, idx) => {
        const question = sortedQuestions[idx];
        const score = calculateQuestionScore(question, answer);
        return {
          ...answer,
          score,
          isCorrect: score > 0
        };
      })
    );
    setQuizState("submitted");
  };

  // Retry quiz
  const handleRetry = () => {
    setAnswers(
      sortedQuestions.map(() => ({ 
        selected: null, 
        text: "", 
        isCorrect: null,
        score: 0
      })),
    );
    setQuizState("init");
  };

  // Check if quiz can be submitted
  const canSubmit = sortedQuestions.every((question, idx) => {
    const answer = answers[idx];
    if (!answer) return false;
    if (!question.isRequiredAnswer) return true;
    
    if (question.type === "SHORT_ANSWER") {
      return answer.text.trim() !== "";
    } else {
      return answer.selected && answer.selected.length > 0;
    }
  });

  // Prevent errors when answers array is not ready
  if (answers.length !== sortedQuestions.length) {
    return <div>Loading...</div>;
  }

  // Score styling
  const scoreColor = quizState === "submitted" ? (passed ? "green" : "red") : "gray";
  const scoreBg = scoreColor === "green" ? "bg-green-50" : scoreColor === "red" ? "bg-red-50" : "bg-gray-50";
  const scoreText = scoreColor === "green" ? "text-green-600" : scoreColor === "red" ? "text-red-600" : "text-gray-600";
  const scoreBorder = scoreColor === "green" ? "border-green-200" : scoreColor === "red" ? "border-red-200" : "border-gray-200";

  return (
    <div className="flex flex-col items-center py-10 overflow-hidden">
      <div className="w-full max-w-2xl">
        {/* Header info */}
        <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-gray-200 border-dashed bg-white rounded-t-2xl">
          <div className="flex gap-6 text-sm text-gray-700">
            <span>
              Số câu hỏi:{" "}
              <span className="font-semibold text-black">{sortedQuestions.length}</span>
            </span>
            <span>
              Số lần thử:{" "}
              <span className="font-semibold text-black">
                {currentAttempt}/{dataLesson?.maxAttempts || 1}
              </span>
            </span>
          </div>
          <div className="text-sm text-gray-700 flex items-center gap-1">
            Thời gian:{" "}
            <span className="bg-[#03A9F429] text-[#0288D1] px-2 py-0.5 rounded font-medium ml-1">
              {timeLimit}
            </span>
          </div>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-b-2xl shadow-xl px-8 py-8">
          {/* Results */}
          {quizState === "submitted" && (
            <div
              className={`flex items-center justify-between px-6 py-4 mb-8 rounded-xl border ${scoreBorder} ${scoreBg} shadow-sm`}
            >
              <div>
                <div className={`font-semibold text-lg`}>
                  Điểm của bạn:{" "}
                  <span className={`font-bold text-2xl ${scoreText}`}>
                    {totalScore}/{maxPossibleScore}
                  </span>
                  <span className={`text-sm ml-2 ${scoreText}`}>
                    ({maxPossibleScore > 0 ? ((totalScore / maxPossibleScore) * 100).toFixed(1) : 0}%)
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Bạn cần ít nhất {dataLesson?.passingScore || 80}% điểm để vượt qua
                </div>
              </div>
              <div className="flex items-center gap-2">
                {scoreColor === "green" ? (
                  <TickCircle
                    size={36}
                    className="text-green-500"
                    variant="Bold"
                  />
                ) : (
                  <CloseCircle
                    size={36}
                    className="text-red-500"
                    variant="Bold"
                  />
                )}
                <button
                  onClick={handleRetry}
                  className="ml-4 flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer border border-gray-200 bg-[#2F57EF] text-white font-semibold transition"
                >
                  <ArrowRotateLeft size="20" color="white" />
                  Thử lại
                </button>
              </div>
            </div>
          )}

          {/* Questions list */}
          <div className="space-y-8">
            {sortedQuestions.map((question, idx) => (
              <div key={question.id} className="">
                {/* Question */}
                <div className="flex items-start gap-2 mb-2">
                  <span className="font-semibold text-base text-gray-900 select-none">
                    {idx + 1}.
                  </span>
                  <span className="font-medium text-base text-gray-900">
                    {question.content}
                  </span>
                  <span className="text-sm text-gray-500 ml-auto">
                    ({question.points} điểm)
                  </span>
                </div>
                
                {/* Description */}
                {question.description && (
                  <div className="text-sm text-gray-600 ml-6 mb-3">
                    {question.description}
                  </div>
                )}

                {/* Multiple choice / Single choice answers */}
                {(question.type === "MULTIPLE_CHOICE" || question.type === "SINGLE_CHOICE") && (
                  <div className="flex flex-col gap-2 mt-2">
                    {question.options?.map((option: QuizOption) => {
                      const isSelected = answers[idx].selected?.includes(option.id) || false;
                      const isCorrect = quizState === "submitted" && option.isCorrect;
                      const isWrong = quizState === "submitted" && isSelected && !option.isCorrect;
                      
                      return (
                        <label
                          key={option.id}
                          className={`flex items-center gap-3 px-4 py-2 rounded-lg border cursor-pointer transition-all
                            ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}
                            ${isCorrect ? "border-green-500 bg-green-50" : ""}
                            ${isWrong ? "border-red-500 bg-red-50" : ""}
                            hover:border-blue-400
                            ${quizState === "submitted" ? "cursor-default" : ""}
                          `}
                        >
                          <input
                            type={question.type === "MULTIPLE_CHOICE" ? "checkbox" : "radio"}
                            name={`q${idx}`}
                            checked={isSelected}
                            disabled={quizState === "submitted"}
                            onChange={() => handleSelect(idx, option.id)}
                            className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="font-medium text-gray-900 flex-1">
                            {option.content}
                          </span>
                          {quizState === "submitted" && isCorrect && (
                            <TickCircle size={20} className="text-green-500" />
                          )}
                          {quizState === "submitted" && isWrong && (
                            <CloseCircle size={20} className="text-red-500" />
                          )}
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* Short answer */}
                {question.type === "SHORT_ANSWER" && (
                  <div className="mt-2">
                    <textarea
                      className="w-full min-h-[48px] rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none"
                      placeholder="Nhập câu trả lời"
                      value={answers[idx].text}
                      disabled={quizState === "submitted"}
                      onChange={(e) => handleText(idx, e.target.value)}
                      maxLength={dataLesson?.shortAnswerCharLimit || 100}
                    />
                    {dataLesson?.shortAnswerCharLimit && (
                      <div className="text-xs text-gray-500 mt-1">
                        {answers[idx].text.length}/{dataLesson.shortAnswerCharLimit} ký tự
                      </div>
                    )}
                  </div>
                )}

                {/* Explanation */}
                {quizState === "submitted" && (
                  <div className="mt-2 flex items-start gap-2 text-sm">
                    {answers[idx].isCorrect ? (
                      <TickCircle size={18} className="mt-0.5 text-green-500" />
                    ) : (
                      <CloseCircle size={18} className="mt-0.5 text-red-500" />
                    )}
                    <span className={answers[idx].isCorrect ? "text-green-700" : "text-red-700"}>
                      {answers[idx].isCorrect ? question.correctExplanation : question.incorrectHint}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Submit button */}
        {quizState === "init" && (
          <div className="flex justify-end mt-10">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gray-900 text-white font-semibold shadow hover:bg-gray-800 transition disabled:opacity-60"
            >
              Nộp bài
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
