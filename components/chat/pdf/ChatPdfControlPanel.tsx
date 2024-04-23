import { ChatPdfPicker } from "./ChatPdfPicker";
import { FaFilePdf } from "react-icons/fa";
import { colors } from "@/lib/consts";
import { FaFileUpload } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ChatPdfUploadDialog } from "./ChatPDFUploadDialog";

export const chatPdfControlPanelGraphic = {
  size: 22,
};

export const ChatPdfControlPanel = () => {
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 min-w-0 min-h-0">
      <div className="flex items-center backdrop-blur border-b border-border/40 justify-between py-3 pl-3 pr-2 space-x-1">
        <div className="flex space-x-3 items-center w-full max-w-[300px]">
          <FaFilePdf
            color={colors.primary}
            size={chatPdfControlPanelGraphic.size}
          />
          <ChatPdfPicker />
        </div>
        <ChatPdfUploadDialog>
          <Button variant="ghost" className="space-x-2 flex">
            <span>Upload a PDF</span>
            <FaFileUpload size={chatPdfControlPanelGraphic.size - 8} />
          </Button>
        </ChatPdfUploadDialog>
      </div>
    </div>
  );
};
