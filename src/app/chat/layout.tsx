import Sidebar from "../../components/sidebar/Sidebar";
import { ChatProvider } from "../../contexts/ChatContext";

export default function Page({ children }: { children: React.ReactNode }) {

  const sidebarWidth = 256;

  return (
    <ChatProvider>
      <div className="flex h-screen bg-background">
        <div
          className="relative bg-muted border-r border-border flex flex-col h-full"
          style={{ width: `${sidebarWidth}px` }}
        >
          <Sidebar />

          <div
            className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-border transition-colors bg-transparent"
          />
        </div>
        {children}
      </div>
    </ChatProvider>
  );
}
