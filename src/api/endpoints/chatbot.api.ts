import axios from "axios";

export const chatbotAPI = {
  sendMessageSuggest: async (form: FormData) => {
    try {
      const res = await axios.post('/api/chatbot/suggest', form, {
        timeout: 30000,
      });

      return res.data.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.message || "Request failed")
      }
      throw err
    }
  },

  sendMessageBasic: async (formData: FormData) => {
    try {
      const res = await axios.post('/api/chatbot/basic', formData, {
        timeout: 30000,
      });

      return res.data.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.message || "Request failed")
      }
      throw err
    }
  },
}