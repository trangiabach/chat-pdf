import { ChatAIControlPanel } from "./ChatAIControlPanel";
import { ChatAIWindow } from "./ChatAIWindow";

export const ChatAIPanel = () => {
  return (
    <div className="h-full w-full overflow-y-scroll">
      <div className="flex flex-col flex-no-wrap h-full overflow-y-auto">
        <ChatAIControlPanel />
        <ChatAIWindow />
      </div>
    </div>
  );
};
