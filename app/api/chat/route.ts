import { StreamingTextResponse, LangChainStream } from "ai";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { formatDocumentsAsString } from "langchain/util/document";
import {
  formatMessage,
  generatePdfRetriever,
  generatePrompt,
  getChatModel,
} from "@/lib/ai/helpers";
import { Model, Pdf, Settings } from "@/types";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, pdf, model, settings } = await req.json();

  const { stream, handlers } = LangChainStream();

  const submittedModel = model as Model;

  const submittedSettings = settings as Settings;

  const llm = getChatModel(submittedModel, submittedSettings.model);

  if (!llm) {
    throw new Error(`No valid LLM detected for ${submittedModel.name}`);
  }

  const retriever = generatePdfRetriever(pdf as Pdf);

  const chatHistoryString = messages
    .slice(0, messages.length - 1)
    .map(formatMessage)
    .join("\n");

  const input = messages[messages.length - 1];

  const prompt = generatePrompt(chatHistoryString, pdf);

  const chain = RunnableSequence.from([
    {
      context: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    llm,
    new StringOutputParser(),
  ]);

  chain.invoke(input.content, { callbacks: [handlers] });

  return new StreamingTextResponse(stream);
}
