import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TokenTextSplitter } from "langchain/text_splitter";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const tokenSplitter = new TokenTextSplitter({
  encodingName: "cl100k_base",
  chunkSize: 4000,
  chunkOverlap: 100,
});
