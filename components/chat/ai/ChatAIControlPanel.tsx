import { colors } from "@/lib/consts";
import { IoSparklesSharp } from "react-icons/io5";
import { ChatAIPicker } from "./ChatAIPicker";

export const chatAIControlPanelGraphic = {
  size: 22,
};

export const ChatAIControlPanel = () => {
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 min-w-0 min-h-0">
      <div className="flex items-center backdrop-blur border-b border-border/40 justify-between py-3 pl-3 pr-2 space-x-1">
        <div className="flex space-x-3 items-center w-full max-w-[300px]">
          <IoSparklesSharp
            color={colors.primary}
            size={chatAIControlPanelGraphic.size - 4}
          />
          <ChatAIPicker />
        </div>
      </div>
    </div>
  );
};
