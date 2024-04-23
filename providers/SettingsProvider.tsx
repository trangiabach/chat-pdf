"use client";

import { Settings } from "@/types";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const localStorageChatHisoryExpanded = "chat-history-is-expanded";

interface SettingsContext {
  isExpanded: boolean;
  settings: Settings;
  toggleSettings: () => void;
  updateModelTemparature: (temparature: number) => void;
}

const ChatHisoryContext = createContext<SettingsContext | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(ChatHisoryContext);

  if (!context) {
    throw new Error("useChatHisory must be used within a ChatHistoryProvider");
  }

  return context;
};

interface SettingsProviderProps extends PropsWithChildren {}

export const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const [settings, setSettings] = useState<Settings>({
    model: {
      temparature: 1.0,
    },
  });

  useEffect(() => {
    const cachedIsExpanded = localStorage.getItem(
      localStorageChatHisoryExpanded
    );

    if (cachedIsExpanded) {
      setIsExpanded(JSON.parse(cachedIsExpanded));
    }
  }, []);

  const toggleSettings = () => {
    setIsExpanded((previousIsExpanded) => {
      const newIsExpanded = !previousIsExpanded;
      localStorage.setItem(
        localStorageChatHisoryExpanded,
        JSON.stringify(newIsExpanded)
      );
      return newIsExpanded;
    });
  };

  const updateModelTemparature = (temparature: number) => {
    setSettings((prevSettings) => {
      const newSettings = { ...prevSettings };

      newSettings.model.temparature = temparature;

      return newSettings;
    });
  };

  const value = useMemo(
    () => ({
      isExpanded,
      toggleSettings,
      settings,
      updateModelTemparature,
    }),
    [isExpanded, toggleSettings, setSettings, settings, updateModelTemparature]
  );

  return (
    <ChatHisoryContext.Provider value={value}>
      {children}
    </ChatHisoryContext.Provider>
  );
};
