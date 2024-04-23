import { ChatPdfControlPanel } from "./ChatPdfControlPanel";
import { ChatPdfViewer } from "./ChatPdfViewer";

export const ChatPdfPanel = () => {
  return (
    <div className="h-full w-full overflow-y-scroll">
      <div className="flex flex-col flex-no-wrap h-full overflow-y-auto">
        <ChatPdfControlPanel />
        <ChatPdfViewer />
      </div>
    </div>
  );
};
