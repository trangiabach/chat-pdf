"use client";

import { UseChatHelpers, useChat as useVercelChat } from "ai/react";
import { nanoid } from "nanoid";
import {
  createContext,
  PropsWithChildren,
  useContext,
  FC,
  useMemo,
  useState,
} from "react";
import { useModels } from "./ModelsProvider";
import { usePdfs } from "./PdfsProvider";
import { useSettings } from "./SettingsProvider";

interface ChatContextProps extends UseChatHelpers {
  refreshChatId: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used within a ChatsProvider");
  }

  return context;
};

interface ChatProviderProps extends PropsWithChildren {}

export const ChatProvider: FC<ChatProviderProps> = ({ children }) => {
  const { selectedPdf } = usePdfs();
  const { selectedModel } = useModels();
  const { settings } = useSettings();
  const [id, setId] = useState(nanoid());

  const chat = useVercelChat({
    id,
    body: {
      pdf: selectedPdf,
      model: selectedModel,
      settings,
    },
  });

  const refreshChatId = () => {
    setId((prevId) => {
      let newId = nanoid();

      while (newId === prevId) {
        newId = nanoid();
      }

      return newId;
    });
  };

  const value = useMemo(
    () => ({
      ...chat,
      refreshChatId,
    }),
    [chat, refreshChatId]
  );

  return <ChatContext.Provider value={value}> {children}</ChatContext.Provider>;
};
