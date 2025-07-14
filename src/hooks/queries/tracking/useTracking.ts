import { useMutation, useQuery } from "@tanstack/react-query";
import { trackingAPI } from "@/api/endpoints/tracking.api";
import toast from "react-hot-toast";

export const useTrackingQuiz = (courseId: string, lessonId: string) => {
  return useQuery({
    queryKey: ["courseId", courseId, lessonId],
    queryFn: () => trackingAPI.getQuizTracking(courseId, lessonId),
    enabled: !!courseId && !!lessonId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateAttemptsQuiz = (courseId: string, lessonId: string) => {
  return useMutation({
    mutationFn: () => trackingAPI.createQuizAttempts(courseId, lessonId),
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export const useSubmitQuiz = (courseId: string, lessonId: string, attemptId: string) => {
  return useMutation({
    mutationFn: (data: any) => trackingAPI.submitQuizAttempts(courseId, lessonId, attemptId, data),
    onSuccess: () => {
      toast.success("Submit quiz thành công!");
    },
  });
};
