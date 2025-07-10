import api from "@/api/api";
import { LearnerProfile } from "@/api/types/intructor.type";

export const studentAPI = {
  getStudentProfile: async (userId: string): Promise<LearnerProfile> => {
    const { data } = await api.get(`/learners/${userId}/profile`);
    return data;
  },

  getWishList: async (userId: string): Promise<any> => {
    const { data } = await api.get(`/wishlists`, {
      params: {
        userId: userId,
      },
    });
    return data;
  },

  getReviewUser: async (userId: string): Promise<any> => {
    const { data } = await api.get(`/users/${userId}/reviews`);
    return data;
  },
};
