"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { colors } from "@/lib/consts";
import { usePdfs } from "@/providers/PdfsProvider";
import { FaFileUpload } from "react-icons/fa";
import { ChatPdfUploadDialog } from "./ChatPDFUploadDialog";

export const chatPdfGraphic = {
  size: 16,
};

export const ChatPdfPicker = () => {
  const { setSelectedPdf, pdfs, selectedPdf } = usePdfs();

  const onPdfSelect = (value: string) => {
    const pdf = pdfs.find((pdf) => pdf.url === value);

    if (pdf) {
      setSelectedPdf(pdf);
    }
  };

  return (
    <Select
      value={selectedPdf ? selectedPdf.url : ""}
      onValueChange={onPdfSelect}
    >
      <SelectTrigger className="w-full focus-visible:ring-0 text-sm">
        <SelectValue placeholder="Pick a PDF file..." />
      </SelectTrigger>
      <SelectContent className="py-1 text-xs max-h-[400px] overflow-y-scroll">
        <ChatPdfUploadDialog>
          <Button
            className="w-full justify-between font-normal px-2 "
            variant="ghost"
          >
            <span className="text-xs md:text-base">Upload a PDF</span>
            <FaFileUpload color={colors.primary} size={chatPdfGraphic.size} />
          </Button>
        </ChatPdfUploadDialog>
        <div className="h-[1px] my-2 bg-primary/40 px-2" />
        {pdfs.map((pdf) => (
          <SelectItem key={pdf.url} value={pdf.url}>
            {pdf.name}
          </SelectItem>
        ))}
        {pdfs.length <= 0 && (
          <div className="flex w-full justify-center h-[50px]">
            No PDFs detected from user
          </div>
        )}
      </SelectContent>
    </Select>
  );
};
