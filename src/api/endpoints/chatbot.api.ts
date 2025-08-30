import axios from "axios";

export const chatbotAPI = {
  sendMessage: async (mess: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_CHATBOT_API_URL}/math/suggest`,
        new URLSearchParams({ mess }), // axios tự động gửi đúng body
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      return res.data
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.message || "Request failed")
      }
      throw err
    }
  },
}