import { Markdown } from "@/components/common/Markdown";
import { cn } from "@/lib/utils";
import { Message } from "ai";
import { FC } from "react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { FaRegUserCircle } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";
import { colors } from "@/lib/consts";

interface ChatMessageProps {
  message: Message;
  isLoading: boolean;
  isLast: boolean;
}

export const chatMessageGraphic = {
  size: 20,
};

export const ChatMessage: FC<ChatMessageProps> = ({
  message,
  isLoading,
  isLast,
}) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "px-3 md:py-4 py-2.5 group transition-opacity message",
        isUser && "bg-primary/5"
      )}
    >
      <div className="flex items-start max-w-2xl mx-auto space-x-3">
        {isUser ? (
          <FaRegUserCircle
            color={colors.primary}
            size={chatMessageGraphic.size}
          />
        ) : (
          <LuSparkles
            size={chatMessageGraphic.size}
            color={colors.primary}
            className={isLoading && isLast ? "animate-spin" : undefined}
          />
        )}
        <div className="w-full min-w-0 text-sm sm:text-base">
          <Markdown
            remarkPlugins={[remarkGfm, remarkMath]}
            className={cn(
              "prose prose-stone prose-sm sm:prose-base prose-pre:rounded-md prose-p:whitespace-pre-wrap prose-p:break-words w-full flex-1 leading-6 prose-p:leading-7 prose-pre:bg-[#282c34] max-w-full"
            )}
            components={{
              p({ children }) {
                return <p className="mb-2 last:mb-0">{children}</p>;
              },
            }}
          >
            {message.content}
          </Markdown>
        </div>
      </div>
    </div>
  );
};
