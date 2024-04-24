"use client";

import { useModels } from "@/providers/ModelsProvider";
import { usePdfs } from "@/providers/PdfsProvider";
import { ChatAIInput } from "./ChatAIInput";
import { ChatAIInvalidChatPlaceholder } from "./ChatAIInvalidChatPlaceholder";
import { ChatMessages } from "./ChatMessages";
import { PiShootingStarThin } from "react-icons/pi";
import { colors } from "@/lib/consts";
import { useSettings } from "@/providers/SettingsProvider";
import { useChat } from "@/providers/ChatProvider";

export const chatAIWindowGraphic = {
  size: 40,
};

export const ChatAIWindow = () => {
  const { selectedPdf } = usePdfs();
  const { selectedModel } = useModels();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    setInput,
    isLoading,
    stop,
    error,
    refreshChatId,
  } = useChat();

  const isInvalidChat = !selectedPdf || !selectedModel;

  if (isInvalidChat) {
    return (
      <ChatAIInvalidChatPlaceholder
        isMissingModel={!selectedModel}
        isMissingPdf={!selectedPdf}
      />
    );
  }

  return (
    <div className="w-full h-[calc(100%-65px)] relative flex flex-col overflow-auto">
      {messages.length > 0 ? (
        <ChatMessages isLoading={isLoading} messages={messages} />
      ) : (
        <div className="flex-1 w-full h-full items-center justify-center flex flex-col space-y-4">
          <PiShootingStarThin
            color={colors.primary}
            size={chatAIWindowGraphic.size}
          />
          <span className="text-sm">Send a message and start chatting!</span>
        </div>
      )}
      <ChatAIInput
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        input={input}
        append={append}
        setInput={setInput}
        isLoading={isLoading}
        stop={stop}
        error={error}
        resetChat={refreshChatId}
      />
    </div>
  );
};
