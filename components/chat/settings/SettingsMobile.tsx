import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { colors } from "@/lib/consts";
import { CiSettings } from "react-icons/ci";
import { ModelSettings } from "./ModelSettings";
import { PdfSettings } from "./PdfSettings";
import { settingsGraphic } from "./SettingsToggle";

export const SettingsMobile = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <CiSettings size={settingsGraphic.size} color={colors.primary} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-left">
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col px-3 pt-3 h-full overflow-y-scroll">
          <ModelSettings />
          <PdfSettings />
        </div>
      </SheetContent>
    </Sheet>
  );
};
