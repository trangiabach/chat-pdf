"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FC, PropsWithChildren } from "react";
import { ChatPdfUploadZone } from "./ChatPdfUploadZone";

export const ChatPdfUploadDialog: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          e.stopPropagation();
        }}
        forceMount
      >
        <DialogHeader>
          <DialogTitle>
            Upload a PDF as knowledge base for your chat model!
          </DialogTitle>
          <DialogDescription>
            The PDF will be parsed into context for the LLM.
          </DialogDescription>
        </DialogHeader>
        <ChatPdfUploadZone setDialogOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};
