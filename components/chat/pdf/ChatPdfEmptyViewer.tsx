import { colors } from "@/lib/consts";
import { VscEmptyWindow } from "react-icons/vsc";

export const chatPdfEmptyViewerGraphic = {
  size: 60,
};

export const ChatPdfEmptyViewer = () => {
  return (
    <div className="h-full w-full items-center justify-center flex">
      <div className="flex flex-col items-center">
        <VscEmptyWindow
          color={colors.primary}
          size={chatPdfEmptyViewerGraphic.size}
        />
        <span className="mt-6 text-xl">Wow, so empty</span>
        <span className="mt-3 text-sm bg-primary px-2 py-1 rounded-md">
          Pick or upload a PDF to get started!
        </span>
      </div>
    </div>
  );
};
