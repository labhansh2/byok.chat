"use client";

import { useRouter, usePathname } from "next/navigation";
import { useChat } from "../../contexts/ChatContext";

interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { chats } = useChat();

  const handleNewChat = () => {
    // Navigate to the base chat route for new chat
    router.push('/chat');
  };

  const handleChatSelect = (chatId: string) => {
    // Navigate to the specific chat
    router.push(`/chat/${chatId}`);
  };

  // Get current chat ID from the pathname
  const getCurrentChatId = () => {
    if (pathname.startsWith('/chat/')) {
      return pathname.split('/chat/')[1];
    }
    return null;
  };

  const activeChatId = getCurrentChatId();

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-lg font-semibold text-foreground mb-4">
          byok.chat
        </h1>
        <button
          onClick={handleNewChat}
          className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors border border-border"
        >
          + New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 py-2">
            Recent Chats
          </h2>
          <div className="space-y-1">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className={`w-full text-left p-3 rounded-md text-sm transition-colors border ${
                  activeChatId === chat.id
                    ? "bg-accent text-accent-foreground border-border"
                    : "hover:bg-accent/50 text-muted-foreground border-transparent"
                }`}
              >
                <div className="font-medium text-foreground truncate">
                  {chat.title}
                </div>
                {chat.lastMessage && (
                  <div className="text-xs text-muted-foreground truncate mt-1">
                    {chat.lastMessage}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  {chat.timestamp.toLocaleDateString()}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
