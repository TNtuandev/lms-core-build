import api from "@/api/api";

export const trackingAPI = {
  getQuizTracking: async (courseId: string, lessonId: string): Promise<any> => {
    const { data } = await api.get(`/api/courses/${courseId}/lessons/quizzes/${lessonId}/attempts`);
    return data;
  },
};
