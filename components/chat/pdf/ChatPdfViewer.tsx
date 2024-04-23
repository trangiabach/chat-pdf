"use client";

import { usePdfs } from "@/providers/PdfsProvider";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { ChatPdfEmptyViewer } from "./ChatPdfEmptyViewer";

export const ChatPdfViewer = () => {
  const { selectedPdf } = usePdfs();

  return (
    <>
      {selectedPdf ? (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div className="w-full h-[calc(100%-65px)]">
            <Viewer fileUrl={selectedPdf.url} />
          </div>
        </Worker>
      ) : (
        <ChatPdfEmptyViewer />
      )}
    </>
  );
};
