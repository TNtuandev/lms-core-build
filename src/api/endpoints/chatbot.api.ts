import axios from "axios";

export const chatbotAPI = {
  sendMessageSuggest: async (mess: string) => {
    try {
      const form = new FormData();
      form.append('mess', mess);

      const res = await axios.post('/api/chatbot/suggest', form, {
        timeout: 30000,
      });

      return res.data.response;
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

      return res.data.response;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.message || "Request failed")
      }
      throw err
    }
  },
}