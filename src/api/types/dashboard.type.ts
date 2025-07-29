export interface ILessonAttempt {
  id: string;
  userId: string;
  lessonId: string;
  score: number;
  startedAt: string; // ISO date string, e.g., "2025-07-22T15:20:31.258Z"
  attemptAt: string; // ISO date string
  isPassed: boolean;
  passedAt: string; // ISO date string
  totalAnswer: number;
  courseTitle: string;
  correctAnswer: number;
}

export interface ILessonAttemptResponsive {
  data: ILessonAttempt[]
}

export interface ILessonSubmission {
  id: string;
  userId: string;
  lessonId: string;
  submittedAt: string; // ISO date string, e.g., "2025-07-15T10:20:40.930Z"
  isPassed: boolean;
  passedAt: string | null; // null nếu chưa qua bài
  score: number;
  lessonName: string;
  courseName: string;
}

export interface ILessonSubmissionResponsive {
  data: ILessonSubmission[]
}