import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { colors } from "@/lib/consts";
import { useSettings } from "@/providers/SettingsProvider";
import { CiSettings } from "react-icons/ci";

export const settingsGraphic = {
  size: 20,
};

export const SettingsToggle = () => {
  const { toggleSettings, isExpanded } = useSettings();

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-semibold">Settings</span>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger onClick={toggleSettings}>
            <CiSettings size={settingsGraphic.size} color={colors.primary} />
          </TooltipTrigger>
          <TooltipContent className="text-xs" side="right">
            {isExpanded ? "Collapse settings" : "See settings"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
