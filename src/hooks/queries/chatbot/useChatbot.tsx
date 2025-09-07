import { useMutation, useQuery } from "@tanstack/react-query";
import { courseAPI } from "@/api/endpoints/course.api";
import { courseKeys } from "@/hooks/queries/course/useCourses";
import { chatbotAPI } from "@/api/endpoints/chatbot.api";

export const useGetMessageChatbot = (courseId: string) => {
  return useQuery({
    queryKey: courseKeys.modulesForUser(courseId),
    queryFn: () => courseAPI.getModuleForUser(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSendMessageChatbot = () => {
  const sendMessageSuggest = useMutation({
    mutationFn: (mess: string) => chatbotAPI.sendMessageSuggest(mess)
  })

  const sendMessageBasic = useMutation({
    mutationFn: (mess: string) => chatbotAPI.sendMessageBasic(mess)
  })

  return { sendMessageSuggest, sendMessageBasic }
}
