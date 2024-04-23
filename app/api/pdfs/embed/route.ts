import { vectoreStore } from "@/db/vectorstore/store";
import { tokenSplitter } from "@/lib/utils";
import { Pdf } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import * as pdfjsLib from "pdfjs-dist";
import { Document } from "langchain/document";
import { sanitizeText } from "@/lib/pdf/helpers";

pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.cwd()}/app/api/pdfs/embed/pdf.worker.min.js`;

export const maxDuration = 300;

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const pdfs: Pdf[] = body.pdfs;

  const pdfTextRequests = pdfs.map(async (pdf) => {
    const document = await pdfjsLib.getDocument(pdf.url).promise;
    const totalPages = document.numPages;

    const pages = Array.from(Array(totalPages).keys());

    const textExtractions = pages.map(async (pageIndex) => {
      const pageNumber = pageIndex + 1;

      const page = await document.getPage(pageNumber);

      const textContext = await page.getTextContent();

      const text = textContext.items.map((item) => item.str).join(" ");

      return text;
    });

    const texts = await Promise.all(textExtractions);

    const pdfText = texts.join(" ");

    const textDocuments = await tokenSplitter.createDocuments([pdfText]);

    const documents: Document[] = textDocuments.map((document) => ({
      pageContent: sanitizeText(document.pageContent),
      metadata: pdf,
    }));

    return documents;
  });

  const documents = (await Promise.all(pdfTextRequests)).flat();

  const embeddingStatus = await vectoreStore.addDocuments(documents);

  return NextResponse.json({ message: embeddingStatus });
};
