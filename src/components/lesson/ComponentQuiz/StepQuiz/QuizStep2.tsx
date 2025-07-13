import {
  TickCircle,
  CloseCircle,
  ArrowRotateLeft,
} from "iconsax-react";
import { useState } from "react";

const quizData = [
  {
    question:
      "Bước đầu tiên để tiếp cận bất kỳ kịch bản phân tích kinh doanh nào là xây dựng bản sắc doanh nghiệp rõ ràng.",
    answers: ["Đúng", "Sai"],
    correct: 0,
    explanation:
      "Đúng! Xác định doanh nghiệp là bước đầu tiên trong phân tích doanh nghiệp, sau đó là xác định các nhu cầu kinh doanh chính.",
  },
  {
    question:
      "Hoàn thành câu sau: nhu cầu kinh doanh cơ bản thường dựa trên....",
    answers: [
      "hoạt động kinh doanh hằng ngày",
      "nhận dạng doanh nghiệp rõ ràng",
      "các dự án thuê ngoài",
      "quyết định quản lý",
    ],
    correct: 1,
    explanation:
      "Đúng! Xác định doanh nghiệp là bước đầu tiên trong phân tích doanh nghiệp, sau đó là xác định các nhu cầu kinh doanh chính.",
  },
  {
    question: "Các tính năng chính của Next.js là gì?",
    answers: [],
    correct: null,
    explanation:
      "Đúng! Xác định doanh nghiệp là bước đầu tiên trong phân tích doanh nghiệp, sau đó là xác định các nhu cầu kinh doanh chính.",
  },
];

const currentAttempt = 1;
const timeLimit = "Không giới hạn";

type QuizState = "init" | "submitted";
type AnswerState = {
  selected: number | null;
  text: string;
  isCorrect: boolean | null;
};

export interface IQuizStepProps {
  changeTab: (tab: string) => void;
  dataCourse: any
  dataLesson: any
}

export default function QuizStep2({dataLesson}: IQuizStepProps) {
  const [quizState, setQuizState] = useState<QuizState>("init");
  const [answers, setAnswers] = useState<AnswerState[]>(
    quizData.map(() => ({ selected: null, text: "", isCorrect: null })),
  );

  // Tính điểm
  const score = answers.filter(
    (a, idx) =>
      quizData[idx].answers.length > 0 && a.selected === quizData[idx].correct,
  ).length;
  const total = quizData.filter((q) => q.answers.length > 0).length;
  const passed = score / total >= 0.8;

  // Xử lý chọn đáp án
  const handleSelect = (qIdx: number, aIdx: number) => {
    if (quizState === "submitted") return;
    setAnswers((prev) =>
      prev.map((a, idx) =>
        idx === qIdx
          ? { ...a, selected: aIdx, isCorrect: aIdx === quizData[qIdx].correct }
          : a,
      ),
    );
  };

  // Xử lý nhập tự luận
  const handleText = (qIdx: number, value: string) => {
    if (quizState === "submitted") return;
    setAnswers((prev) =>
      prev.map((a, idx) => (idx === qIdx ? { ...a, text: value } : a)),
    );
  };

  // Nộp bài
  const handleSubmit = () => {
    setQuizState("submitted");
  };

  // Làm lại
  const handleRetry = () => {
    setAnswers(
      quizData.map(() => ({ selected: null, text: "", isCorrect: null })),
    );
    setQuizState("init");
  };

  // Màu trạng thái điểm
  const scoreColor =
    quizState === "submitted" ? (passed ? "green" : "red") : "gray";
  const scoreBg =
    scoreColor === "green"
      ? "bg-green-50"
      : scoreColor === "red"
        ? "bg-red-50"
        : "bg-gray-50";
  const scoreText =
    scoreColor === "green"
      ? "text-green-600"
      : scoreColor === "red"
        ? "text-red-600"
        : "text-gray-600";
  const scoreBorder =
    scoreColor === "green"
      ? "border-green-200"
      : scoreColor === "red"
        ? "border-red-200"
        : "border-gray-200";

  return (
    <div className="flex flex-col items-center py-10 overflow-hidden">
      <div className="w-full max-w-2xl">
        {/* Header info */}
        <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-gray-200 border-dashed bg-white rounded-t-2xl">
          <div className="flex gap-6 text-sm text-gray-700">
            <span>
              Số câu hỏi:{" "}
              <span className="font-semibold text-black">{dataLesson?.questions?.length}</span>
            </span>
            <span>
              Số lần thử:{" "}
              <span className="font-semibold text-black">
                {currentAttempt}/{dataLesson?.maxAttempts}
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

        {/* Card lớn */}
        <div className="bg-white rounded-b-2xl shadow-xl px-8 py-8">
          {/* Kết quả */}
          {quizState === "submitted" && (
            <div
              className={`flex items-center justify-between px-6 py-4 mb-8 rounded-xl border ${scoreBorder} ${scoreBg} shadow-sm`}
            >
              <div>
                <div className={`font-semibold text-lg`}>
                  Điểm của bạn:{" "}
                  <span className={`font-bold text-2xl ${scoreText}`}>
                    {score}/{total}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Bạn cần ít nhất 80% điểm để vượt qua
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

          {/* Danh sách câu hỏi */}
          <div className="space-y-8">
            {quizData.map((q, idx) => (
              <div key={idx} className="">
                {/* Câu hỏi */}
                <div className="flex items-start gap-2 mb-2">
                  <span className="font-semibold text-base text-gray-900 select-none">
                    {idx + 1}.
                  </span>
                  <span className="font-medium text-base text-gray-900">
                    {q.question}
                  </span>
                </div>
                {/* Đáp án trắc nghiệm */}
                {q.answers.length > 0 && (
                  <div className="flex flex-col gap-2 mt-2">
                    {q.answers.map((ans, aIdx) => {
                      const isSelected = answers[idx].selected === aIdx;
                      const isCorrect =
                        quizState === "submitted" && q.correct === aIdx;
                      const isWrong =
                        quizState === "submitted" && isSelected && !isCorrect;
                      return (
                        <label
                          key={aIdx}
                          className={`flex items-center gap-3 px-4 py-2 rounded-lg border cursor-pointer transition-all
                            ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}
                            ${isCorrect ? "border-green-500 bg-green-50" : ""}
                            ${isWrong ? "border-red-500 bg-red-50" : ""}
                            hover:border-blue-400
                            ${quizState === "submitted" ? "cursor-default" : ""}
                          `}
                        >
                          <input
                            type="radio"
                            name={`q${idx}`}
                            checked={isSelected}
                            disabled={quizState === "submitted"}
                            onChange={() => handleSelect(idx, aIdx)}
                            className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="font-medium text-gray-900 flex-1">
                            {ans}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
                {/* Đáp án tự luận */}
                {q.answers.length === 0 && (
                  <div className="mt-2">
                    <textarea
                      className="w-full min-h-[48px] rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none"
                      placeholder="Nhập câu trả lời"
                      value={answers[idx].text}
                      disabled={quizState === "submitted"}
                      onChange={(e) => handleText(idx, e.target.value)}
                    />
                  </div>
                )}
                {/* Giải thích */}
                {quizState === "submitted" && (
                  <div
                    className={`mt-2 flex items-start gap-2 text-sm ${q.answers.length > 0 ? (answers[idx].isCorrect ? "text-green-700" : "text-red-700") : "text-gray-700"}`}
                  >
                    {q.answers.length > 0 &&
                      (answers[idx].isCorrect ? (
                        <TickCircle
                          size={18}
                          className="mt-0.5 text-green-500"
                        />
                      ) : (
                        <CloseCircle
                          size={18}
                          className="mt-0.5 text-red-500"
                        />
                      ))}
                    <span>{q.explanation}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {quizState === "init" && (
          <div className="flex justify-end mt-10">
            <button
              onClick={handleSubmit}
              disabled={
                answers.some(
                  (a, idx) =>
                    quizData[idx].answers.length > 0 && a.selected === null,
                ) ||
                answers.some(
                  (a, idx) =>
                    quizData[idx].answers.length === 0 && !a.text.trim(),
                )
              }
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
