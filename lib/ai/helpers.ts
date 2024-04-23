import { Message } from "ai";
import { PromptTemplate } from "@langchain/core/prompts";
import { Model, ModelSettings, Pdf } from "@/types";
import { vectoreStore } from "@/db/vectorstore/store";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { retrieverTopK } from "./retriever";

export const formatMessage = (message: Message) => {
  return `${message.role}: ${message.content}`;
};

export const getChatModel = (model: Model, modelSettings?: ModelSettings) => {
  const modelParams = {
    modelName: model.key,
    streaming: true,
    ...(modelSettings && {
      ...modelSettings,
    }),
  };

  if (model.provider === "OpenAI") {
    return new ChatOpenAI(modelParams);
  }

  if (model.provider === "Anthropic") {
    return new ChatAnthropic(modelParams);
  }
};

export const generatePrompt = (chatHistoryString: string, pdf: Pdf) => {
  return PromptTemplate.fromTemplate(
    `You are ChatPDF. You answer questions related to a PDF file.

        Your responses should be moderately detailed.
        Your responses should focus on the PDF file called ${pdf.name}
        
        Here are some contexts about the PDF file, use it to guide your response: {context}
        
        Here is the chat history so far: ${chatHistoryString}
        
        User's question: {question}`
  );
};

export const generatePdfRetriever = (pdf: Pdf) => {
  return vectoreStore.asRetriever(retrieverTopK, { id: pdf.id });
};
