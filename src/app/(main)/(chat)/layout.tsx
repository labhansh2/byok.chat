import ChatArea from "@/components/chat/ChatArea";

// import { ChatProvider } from "@/contexts/chat-context";
import PromptInput from "@/components/chat/PromptInput";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col h-full w-full">
        <ChatArea />
        <PromptInput />
      </div>
      {children}
    </>
  );
}
