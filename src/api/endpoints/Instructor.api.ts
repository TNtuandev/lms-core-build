import { FAQ } from "@/api/types/course.type";
import api from "@/api/api";


export const instructorAPI = {
  getInstructorProfile: async (userId: string): Promise<FAQ[]> => {
    const { data } = await api.get(`/instructors/${userId}/profile`);
    return data;
  },

};