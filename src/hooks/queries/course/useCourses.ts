import { useQuery } from "@tanstack/react-query";
import { courseAPI } from "@/api/endpoints/course.api";
import { CourseFilters } from "@/api/types/course.type";

export const courseKeys = {
  all: ["courses"] as const,
  lists: () => [...courseKeys.all, "list"] as const,
  list: (filters?: CourseFilters) => [...courseKeys.lists(), filters] as const,
  details: () => [...courseKeys.all, "detail"] as const,
  detail: (id: string) => [...courseKeys.details(), id] as const,
};

export const useCourses = (filters?: CourseFilters) => {
  return useQuery({
    queryKey: courseKeys.list(filters),
    queryFn: () => courseAPI.getCourses(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCourseById = (id: string) => {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: () => courseAPI.getCourseById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}; 