import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { supabase } from "../data/supabase";

export const embeddings = new OpenAIEmbeddings();

export const vectoreStore = new SupabaseVectorStore(embeddings, {
  client: supabase,
  tableName: "documents",
});

export const retriever = vectoreStore.asRetriever();
