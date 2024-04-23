import { Separator } from "@/components/ui/separator";
import { deleteFileFromBucket } from "@/db/storage/helpers";
import { cn } from "@/lib/utils";
import { useChat } from "@/providers/ChatProvider";
import { useModels } from "@/providers/ModelsProvider";
import { usePdfs } from "@/providers/PdfsProvider";
import { useSettings } from "@/providers/SettingsProvider";
import { Pdf } from "@/types";
import { FC, useState } from "react";
import { MdDownloading, MdOutlineDelete } from "react-icons/md";

export interface PdfOptionInterface {
  pdf: Pdf;
}

export const pdfOptionGraphic = {
  size: 15,
};

export const PdfOption: FC<PdfOptionInterface> = ({ pdf }) => {
  const { refreshPdfs, selectedPdf, setSelectedPdf } = usePdfs();

  const { refreshChatId } = useChat();

  const [isDeleting, setIsDeleting] = useState(false);

  const onClickDelete = async () => {
    if (selectedPdf?.id === pdf.id) {
      refreshChatId();
    }
    setIsDeleting(true);
    await deleteFileFromBucket([pdf.name]);
    await refreshPdfs();
    setIsDeleting(false);
  };

  const onClickOption = () => {
    setSelectedPdf(pdf);
  };

  return (
    <>
      <div
        className="text-[0.7rem] flex justify-between items-center hover:cursor-pointer hover:bg-accent p-1 rounded-md"
        onClick={onClickOption}
      >
        <span>{pdf.name}</span>
        <span
          className={cn(
            "text-primary hover:text-red-500 hover:cursor-pointer transition-all",
            isDeleting && "opacity-80 pointer-events-none text-red-500"
          )}
          onClick={onClickDelete}
        >
          {isDeleting ? (
            <MdDownloading
              size={pdfOptionGraphic.size}
              className="animate-spin"
            />
          ) : (
            <MdOutlineDelete size={pdfOptionGraphic.size} />
          )}
        </span>
      </div>
      <Separator className="my-2" />
    </>
  );
};
