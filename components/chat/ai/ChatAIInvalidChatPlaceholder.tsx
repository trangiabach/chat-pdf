import { colors } from "@/lib/consts";
import { FC } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { MdSwitchAccessShortcutAdd } from "react-icons/md";

interface ChatAIInvalidChatPlaceholderProps {
  isMissingPdf: boolean;
  isMissingModel: boolean;
}

export const chatAIInvalidChatPlaceholderGraphic = {
  size: 50,
};

export const ChatAIInvalidChatPlaceholder: FC<
  ChatAIInvalidChatPlaceholderProps
> = ({ isMissingModel, isMissingPdf }) => {
  const isMissingBoth = isMissingModel && isMissingPdf;
  return (
    <div className="h-full w-full flex flex-col space-y-8 items-center justify-center">
      {isMissingPdf && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <AiFillFileAdd
            size={chatAIInvalidChatPlaceholderGraphic.size}
            color={colors.primary}
          />
          <span>Pick a PDF!</span>
        </div>
      )}
      {isMissingBoth && <div className="h-[1px] w-full bg-primary my-3" />}
      {isMissingModel && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <MdSwitchAccessShortcutAdd
            size={chatAIInvalidChatPlaceholderGraphic.size}
            color={colors.primary}
          />
          <span>Pick a Model!</span>
        </div>
      )}
    </div>
  );
};
