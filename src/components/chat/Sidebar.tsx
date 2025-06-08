"use client";

import { useState } from "react";

interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface SidebarProps {
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
}

export default function Sidebar({ currentChatId, onChatSelect }: SidebarProps) {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Chat about React",
      lastMessage: "How do I use useState?",
      timestamp: new Date(),
    },
    {
      id: "2", 
      title: "AI Discussion",
      lastMessage: "What are the benefits of...",
      timestamp: new Date(Date.now() - 3600000),
    },
  ]);

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat: Chat = {
      id: newChatId,
      title: "New Chat",
      lastMessage: "",
      timestamp: new Date(),
    };
    setChats([newChat, ...chats]);
    onChatSelect(newChatId);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-lg font-semibold text-foreground mb-4">byok.chat</h1>
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
                onClick={() => onChatSelect(chat.id)}
                className={`w-full text-left p-3 rounded-md text-sm transition-colors border ${
                  currentChatId === chat.id
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