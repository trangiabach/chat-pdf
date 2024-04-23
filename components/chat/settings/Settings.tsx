"use client";

import { useSettings } from "@/providers/SettingsProvider";
import { ModelSettings } from "./ModelSettings";
import { PdfSettings } from "./PdfSettings";
import { SettingsToggle } from "./SettingsToggle";

export const Settings = () => {
  const { isExpanded } = useSettings();

  return (
    <div
      data-state={isExpanded ? "open" : "closed"}
      className="peer absolute inset-y-0 z-30 hidden -translate-x-[85%] border-r border-border/40 duration-300 ease-in-out data-[state=open]:translate-x-0 md:flex md:w-[250px] xl:w-[270px] h-full flex-col"
    >
      <div className="flex flex-col px-3 pt-3 h-full overflow-y-scroll">
        <SettingsToggle />
        {isExpanded && (
          <>
            <ModelSettings />
            <PdfSettings />
          </>
        )}
      </div>
    </div>
  );
};
