import api from "@/api/api";

export const trackingAPI = {
  getQuizTracking: async (courseId: string, lessonId: string): Promise<any> => {
    const { data } = await api.get(`/api/courses/${courseId}/lessons/quizzes/${lessonId}/attempts`);
    return data;
  },

  getPracticeTracking: async (courseId: string, lessonId: string): Promise<any> => {
    const { data } = await api.get(`/courses/${courseId}/lessons/practice-submissions/${lessonId}`);
    return data;
  },

  submitPracticeFile: async (courseId: string, lessonId: string, formData: FormData): Promise<any> => {
    const { data } = await api.post(`/courses/${courseId}/lessons/practice-submissions/${lessonId}/file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },

  submitPracticeCode: async (courseId: string, lessonId: string, data: any): Promise<any> => {
    const { data: res } = await api.post(`/courses/${courseId}/lessons/practice-submissions/${lessonId}/code`, data);
    return res;
  },

  submitPracticeWriting: async (courseId: string, lessonId: string, data: any): Promise<any> => {
    const { data: res } = await api.post(`/courses/${courseId}/lessons/practice-submissions/${lessonId}/wrting`, data);
    return res;
  },

  createQuizAttempts: async (courseId: string, lessonId: string): Promise<any> => {
    const { data: res } = await api.post(`/api/courses/${courseId}/lessons/quizzes/${lessonId}/attempts`);
    return res;
  },

  submitQuizAttempts: async (courseId: string, lessonId: string, attemptId: string, data: any): Promise<any> => {
    const { data: res } = await api.post(`/api/courses/${courseId}/lessons/quizzes/${lessonId}/attempts/${attemptId}/submit`, data);
    return res;
  },
};
