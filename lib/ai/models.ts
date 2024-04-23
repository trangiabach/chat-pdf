import { Model } from "@/types";

export const defaultModels: Model[] = [
  {
    name: "gpt-4",
    provider: "OpenAI",
    key: "gpt-4-turbo",
  },
  {
    name: "gpt-3.5",
    provider: "OpenAI",
    key: "gpt-3.5-turbo",
  },
  {
    name: "claude-3-opus",
    provider: "Anthropic",
    key: "claude-3-opus-20240229",
  },
  {
    name: "claude-3-sonnet",
    provider: "Anthropic",
    key: "claude-3-sonnet-20240229",
  },
  {
    name: "claude-3-haiku",
    provider: "Anthropic",
    key: "claude-3-haiku-20240307",
  },
];
