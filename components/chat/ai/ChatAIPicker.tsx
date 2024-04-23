"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModels } from "@/providers/ModelsProvider";

export const chatPdfGraphic = {
  size: 16,
};

export const ChatAIPicker = () => {
  const { models, selectedModel, setSelectedModel } = useModels();

  const onModelSelect = (value: string) => {
    const model = models.find((model) => model.name === value);

    if (model) {
      setSelectedModel(model);
    }
  };

  return (
    <Select
      value={selectedModel ? selectedModel.name : undefined}
      onValueChange={onModelSelect}
    >
      <SelectTrigger className="w-full focus-visible:ring-0 text-sm">
        <SelectValue placeholder="Pick a Chat Model..." />
      </SelectTrigger>
      <SelectContent className="py-1 text-xs max-h-[400px] overflow-y-scroll">
        <div className="px-1 text-sm max-w-[90%]">
          Pick a model to start chatting to your PDFs!
        </div>
        <div className="h-[1px] my-2 bg-primary/40 px-2" />
        {models.map((model) => (
          <SelectItem key={model.key} value={model.name}>
            {model.provider}&apos; {model.name.toUpperCase()}
          </SelectItem>
        ))}
        {models.length <= 0 && (
          <div className="flex w-full justify-center h-[50px]">
            No models detected
          </div>
        )}
      </SelectContent>
    </Select>
  );
};
