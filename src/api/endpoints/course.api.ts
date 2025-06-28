import { CourseFilters, CoursesResponse } from "@/api/types/course.type";
import api from "@/api/api";

export const courseAPI = {
  getCourses: async (filters?: CourseFilters): Promise<CoursesResponse> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(item => params.append(key, item.toString()));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }
    
    const { data } = await api.get(`/courses?${params.toString()}`);
    return data;
  },

  getCourseById: async (id: string): Promise<any> => {
    const { data } = await api.get(`/courses/${id}`);
    return data;
  },
}; 