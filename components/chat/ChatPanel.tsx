"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { ChatAIPanel } from "./ai/ChatAIPanel";
import { ChatPdfPanel } from "./pdf/ChatPdfPanel";
import { useWindowWidth } from "@react-hook/window-size";
import { useEffect, useState } from "react";
import { Direction } from "react-resizable-panels/dist/declarations/src/types";

export const panelMinSize = 20;

export const ChatPanel = () => {
  const windowWidth = useWindowWidth();

  const isMobile = windowWidth <= 725;

  const [panelDirection, setPanelDirection] = useState<Direction>("horizontal");

  useEffect(() => {
    setPanelDirection(isMobile ? "vertical" : "horizontal");
  }, [isMobile]);

  return (
    <div className="group w-full overflow-auto md:pl-[40px] peer-[[data-state=open]]:md:pl-[250px] peer-[[data-state=open]]:xl:pl-[270px] transition-all h-full">
      <ResizablePanelGroup direction={panelDirection}>
        <ResizablePanel minSize={isMobile ? panelMinSize / 5 : panelMinSize}>
          <ChatPdfPanel />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={isMobile ? panelMinSize / 5 : panelMinSize}>
          <ChatAIPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
