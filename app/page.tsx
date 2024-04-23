import { Settings } from "@/components/chat/settings/Settings";
import { ChatPanel } from "@/components/chat/ChatPanel";

export default function Home() {
  return (
    <main className="flex h-[calc(100vh-57px)] overflow-hidden relative">
      <Settings />
      <ChatPanel />
    </main>
  );
}
