import { useMutation, useQuery } from "@tanstack/react-query";
import { trackingAPI } from "@/api/endpoints/tracking.api";

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
