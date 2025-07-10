import { useQuery } from "@tanstack/react-query";
import { studentAPI } from "@/api/endpoints/student.api";

export const useStudent = (studentId: string) => {
  return useQuery({
    queryKey: ["studentId", studentId],
    queryFn: () => studentAPI.getStudentProfile(studentId),
    enabled: !!studentId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useWishList = (studentId: string) => {
  return useQuery({
    queryKey: ["studentId", studentId],
    queryFn: () => studentAPI.getWishList(studentId),
    enabled: !!studentId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useReviewUser = (studentId: string) => {
  return useQuery({
    queryKey: ["studentId", studentId],
    queryFn: () => studentAPI.getReviewUser(studentId),
    enabled: !!studentId,
    staleTime: 5 * 60 * 1000,
  });
};
