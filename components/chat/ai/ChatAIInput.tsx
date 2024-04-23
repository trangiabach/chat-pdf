import { Button } from "@/components/ui/button";
import { ChatRequestOptions, CreateMessage, Message } from "ai";
import React, { FC } from "react";
import { TbSend } from "react-icons/tb";
import { AiOutlineLoading } from "react-icons/ai";
import { FaRegStopCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";

interface ChatAIInputProps {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  input: string;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  setInput: (input: string) => void;
  isLoading: boolean;
  stop: () => void;
  error?: Error;
}

const chatAIInputGraphic = {
  size: 15,
};

export const ChatAIInput: FC<ChatAIInputProps> = ({
  handleSubmit,
  input,
  handleInputChange,
  append,
  setInput,
  isLoading,
  error,
}) => {
  const onKeyPress = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && input.length === 0) {
      event.preventDefault();
      return;
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setInput("");
      await append({
        content: input,
        role: "user",
      });
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.length > 0) {
      handleSubmit(event);
    }
  };

  const onClickStop = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    stop();
  };

  const isDisabled = isLoading || input.length === 0;

  return (
    <div className="sticky bottom-0 left-0 flex-shrink-0 min-w-0 min-h-0 w-full">
      <div className="p-3 pr-2.5">
        <form
          className="relative flex items-center max-w-2xl mx-auto flex-col"
          onSubmit={onSubmit}
        >
          {isLoading && (
            <div className="flex bg-primary space-x-2 text-xs px-3 py-2 rounded-md text-white">
              <span>Generating</span>
              <AiOutlineLoading
                className="animate-spin"
                size={chatAIInputGraphic.size}
              />
            </div>
          )}
          {error && (
            <div className="flex bg-red-500 space-x-2 text-xs px-3 py-2 rounded-md text-white">
              <MdOutlineError
                className="animate-pulse"
                size={chatAIInputGraphic.size}
              />
              <span>
                Error: {error?.message}, {error.name}
              </span>
            </div>
          )}
          <textarea
            className="rounded-lg w-full bg-slate-100 dark:bg-background border-2 border-border/40 flex-1 sm:text-sm text-base resize-none scroll-m-2 min-h-[100px] focus:ring-0 focus:outline-none p-4 mt-3.5 transition-shadow shadow-none hover:shadow-md focus:shadow-md"
            value={input}
            onChange={handleInputChange}
            placeholder="Talk to your ChatPDF!"
            onKeyDown={onKeyPress}
            required
          />
          <div className="absolute right-2 bottom-2 inline-flex gap-1 sm:gap-2 items-center justify-end">
            {isLoading && (
              <Button
                onClick={onClickStop}
                variant="outline"
                className="rounded-lg text-xs py-0 max-h-8 flex space-x-2"
              >
                <span>Stop</span>
                <FaRegStopCircle size={chatAIInputGraphic.size} />
              </Button>
            )}
            <Button
              disabled={isDisabled}
              className="rounded-lg text-xs py-0 max-h-8 flex space-x-2"
            >
              <span>Send</span>
              {isLoading ? (
                <AiOutlineLoading
                  className="animate-spin"
                  size={chatAIInputGraphic.size}
                />
              ) : (
                <TbSend size={chatAIInputGraphic.size} />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
