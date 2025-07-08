import api from "@/api/api";
import { IntructorResponsive } from "@/api/types/intructor.type";


export const studentAPI = {
  getStudentProfile: async (userId: string): Promise<IntructorResponsive> => {
    const { data } = await api.get(`/learners/${userId}/profile`);
    return data;
  },
};