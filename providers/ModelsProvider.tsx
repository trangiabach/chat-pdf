"use client";

import { defaultModels } from "@/lib/ai/models";
import { Model } from "@/types";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

interface ModelsContextProps {
  models: Model[];
  selectedModel?: Model;
  setSelectedModel: (model: Model) => void;
}

const ModelsContext = createContext<ModelsContextProps | undefined>(undefined);

export const useModels = () => {
  const context = useContext(ModelsContext);

  if (!context) {
    throw new Error("useModels must be used within a ModelsProvider");
  }

  return context;
};

interface ModelsProviderProps extends PropsWithChildren {}

export const ModelsProvider: FC<ModelsProviderProps> = ({ children }) => {
  const [models, setModels] = useState<Model[]>(defaultModels);
  const [selectedModel, setSelectedModel] = useState<Model | undefined>(
    undefined
  );

  const value = useMemo(
    () => ({
      models,
      selectedModel,
      setSelectedModel,
    }),
    [models, setModels, selectedModel, setSelectedModel]
  );

  return (
    <ModelsContext.Provider value={value}> {children}</ModelsContext.Provider>
  );
};
