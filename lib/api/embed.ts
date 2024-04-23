import { Pdf } from "@/types";
import axios from "axios";
import { clientApiRoutes } from "./routes";

export const embedPdfs = async (pdfs: Pdf[]) => {
  const embeddingStatus = await axios.post(clientApiRoutes.embedPdfs(), {
    pdfs,
  });

  return embeddingStatus;
};
