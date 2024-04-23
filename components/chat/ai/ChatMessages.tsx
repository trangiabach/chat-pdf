import { Message } from "ai";
import { FC } from "react";
import { ChatMessage } from "./ChatMessage";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatMessages: FC<ChatMessagesProps> = ({
  messages,
  isLoading,
}) => {
  return (
    <div className="flex-1">
      <div className="scrolling-touch scrolling-gpu h-full w-full relative overflow-auto overscroll-y-aut">
        <div className="h-full divide-y pb-12">
          {messages.map((m, index) => (
            <ChatMessage
              isLast={index === messages.length - 1}
              message={m}
              key={m.id}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
