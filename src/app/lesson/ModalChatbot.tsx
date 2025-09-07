import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Send2 } from "iconsax-react";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { useSendMessageChatbot } from "@/hooks/queries/chatbot/useChatbot";

// Drop-in component
// Usage: <AIHelperModal /> anywhere in your app
export default function AIHelperModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [value, setValue] = React.useState("");
  const [typeMessage, setTypeMessage] = useState("");
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const { sendMessageBasic, sendMessageSuggest } = useSendMessageChatbot();
  const [listMessage, setListMessage] = useState<any>([]);

  const questions = [
    {
      label: "Gợi ý, giải đáp câu hỏi toán học",
      value: "basic",
    },
    {
      label: "Gợi ý bài tập toán học",
      value: "suggest",
    },
  ];

  function handleAsk(q?: string) {
    const text = q ?? value;
    if (!text.trim()) return;
    setListMessage((prev: any) => {
      return [
        ...prev,
        {
          message: text,
          isMe: true,
        },
      ];
    });
    // TODO: send to your API
    const formData = new FormData();
    formData.append("mess", text);
    if (typeMessage === "suggest") {
      sendMessageSuggest.mutate(formData as any, {
        onSuccess: (data) => {
          console.log("AI response:", data);
          // Scroll to bottom
          setListMessage((prev: any) => {
            return [
              ...prev,
              {
                message: data,
                isMe: false,
              }
            ]
          });
          if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop =
              messageContainerRef.current.scrollHeight;
          }
        },
      });
    } else {
      sendMessageBasic.mutate(formData as any, {
        onSuccess: (data) => {
          console.log("AI response:", data);
          setListMessage((prev: any) => {
            return [
              ...prev,
              {
                message: data,
                isMe: false,
              }
            ]
          });
          // Scroll to bottom
          if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop =
              messageContainerRef.current.scrollHeight;
          }
        },
      });
    }

    setValue("");
  }

  const renderSpinner = () => {
    return (
      <div className="flex justify-center items-center bg-white">
        <div className="w-9 h-9 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 gap-0 max-w-lg rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <DialogTitle className="text-base text-left py-6 border-b-[1px] border-[#919EAB3D]">
              Trợ lý AI
            </DialogTitle>
            <DialogDescription className="mt-4">
              <div className="text-left font-bold">
                Bạn có thắc mắc gì về khóa học này không?
              </div>
              <div className="text-left text-sm text-[#637381]">
                Trợ lý AI của chúng tôi có thể mách lối.
              </div>
            </DialogDescription>
          </div>
        </div>

        {/*<Separator />*/}

        {/* Suggested questions */}
        <div
          ref={messageContainerRef}
          className="px-5 py-4 space-y-3 h-[400px] overflow-y-auto"
        >
          {!typeMessage &&
            questions.map((q) => (
              <Button
                key={q.value}
                variant="outline"
                className="w-full justify-start h-11 rounded-xl text-left"
                onClick={() => setTypeMessage(q.value)}
              >
                {q.label}
              </Button>
            ))}
          {
            listMessage.map((item: any, index: number) => (
              <div key={index}>
                <div
                  key={index}
                  className={`${
                    item.isMe ? "justify-end" : "justify-start"
                  } flex`}
                >
                  <div
                    className={`${
                      item.isMe
                        ? "bg-[#4A76FE] text-white"
                        : "bg-[#F3F4F6] text-black"
                    } max-w-[70%] p-3 rounded-xl whitespace-pre-wrap break-words`}
                  >
                    {item.message}
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {/* Footer input */}
        <div className="px-5 pb-5 pt-2">
          {typeMessage && (
            <div className="relative">
              <Textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Đặt một câu hỏi"
                className="h-[100px] rounded-xl pr-16 resize-none flex items-start"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // e.preventDefault();
                    handleAsk();
                  }
                }}
              />
              <Button
                type="button"
                size="icon"
                className="absolute right-4 bottom-4 h-9 w-9 rounded-xl "
                onClick={() => handleAsk()}
              >
                {sendMessageBasic.isPending || sendMessageSuggest.isPending ? (
                  renderSpinner()
                ) : (
                  <Send2 color="white" size={20} />
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
