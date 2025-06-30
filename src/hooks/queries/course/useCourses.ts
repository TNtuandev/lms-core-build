import { useQuery } from "@tanstack/react-query";
import { courseAPI } from "@/api/endpoints/course.api";
import { CourseFilters } from "@/api/types/course.type";

export const courseKeys = {
  all: ["courses"] as const,
  lists: () => [...courseKeys.all, "list"] as const,
  list: (filters?: CourseFilters) => [...courseKeys.lists(), filters] as const,
  details: () => [...courseKeys.all, "detail"] as const,
  detail: (id: string) => [...courseKeys.details(), id] as const,
  related: (courseId: string) => [...courseKeys.all, "related", courseId] as const,
  faqs: (courseId: string) => [...courseKeys.all, "faqs", courseId] as const,
  modules: (courseId: string) => [...courseKeys.all, "modules", courseId] as const,
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

export const useCourseBySlug = (slug: string) => {
  return useQuery({
    queryKey: courseKeys.detail(slug),
    queryFn: () => courseAPI.getCourseBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRelatedCourses = (courseId: string) => {
  return useQuery({
    queryKey: courseKeys.related(courseId),
    queryFn: () => courseAPI.getRelatedCourses(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFAQs = (courseId: string) => {
  return useQuery({
    queryKey: courseKeys.faqs(courseId),
    queryFn: () => courseAPI.getFAQs(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useModule = (courseId: string) => {
  return useQuery({
    queryKey: courseKeys.modules(courseId),
    queryFn: () => courseAPI.getModule(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};