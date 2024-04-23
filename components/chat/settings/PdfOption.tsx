import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { deleteFileFromBucket } from "@/db/storage/helpers";
import { cn } from "@/lib/utils";
import { useChat } from "@/providers/ChatProvider";
import { useModels } from "@/providers/ModelsProvider";
import { usePdfs } from "@/providers/PdfsProvider";
import { useSettings } from "@/providers/SettingsProvider";
import { Pdf } from "@/types";
import React, { FC, useState } from "react";
import { MdDownloading, MdOutlineDelete } from "react-icons/md";
import { toast } from "@/components/ui/sonner";

export interface PdfOptionInterface {
  pdf: Pdf;
}

export const pdfOptionGraphic = {
  size: 18,
};

export const PdfOption: FC<PdfOptionInterface> = ({ pdf }) => {
  const { refreshPdfs, selectedPdf, setSelectedPdf } = usePdfs();

  const { refreshChatId } = useChat();

  const [isDeleting, setIsDeleting] = useState(false);

  const onClickDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (selectedPdf?.id === pdf.id) {
      refreshChatId();
    }
    setIsDeleting(true);
    await deleteFileFromBucket([pdf.name]);
    await refreshPdfs();
    setIsDeleting(false);
    toast(`Deleted file`, {
      description: `Deleted ${pdf.name}`,
    });
  };

  const onClickOption = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setSelectedPdf(pdf);
  };

  return (
    <>
      <div
        className="text-[0.7rem] flex justify-between space-x-1 items-center hover:cursor-pointer hover:bg-accent p-1 rounded-md"
        onClick={onClickOption}
      >
        <span>{pdf.name}</span>
        <Button
          className={cn(
            "text-primary w-5 hover:text-red-500 hover:cursor-pointer transition-all z-10",
            isDeleting && "opacity-80 pointer-events-none text-red-500"
          )}
          onClick={onClickDelete}
          variant="ghost"
          size="icon"
        >
          {isDeleting ? (
            <MdDownloading
              size={pdfOptionGraphic.size}
              className="animate-spin"
            />
          ) : (
            <MdOutlineDelete size={pdfOptionGraphic.size} />
          )}
        </Button>
      </div>
      <Separator className="my-2" />
    </>
  );
};
