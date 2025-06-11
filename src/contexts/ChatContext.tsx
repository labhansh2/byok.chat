"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatContextType {
  chats: Chat[];
  addChat: (chat: Chat) => void;
  updateChat: (chatId: string, updates: Partial<Chat>) => void;
  getChat: (chatId: string) => Chat | undefined;
  addMessageToChat: (chatId: string, message: Message) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Chat about React",
      lastMessage: "How do I use useState?",
      timestamp: new Date(),
      messages: [],
    },
    {
      id: "2", 
      title: "AI Discussion",
      lastMessage: "What are the benefits of...",
      timestamp: new Date(Date.now() - 3600000),
      messages: [],
    },
  ]);

  const addChat = (chat: Chat) => {
    setChats(prev => [chat, ...prev]);
  };

  const updateChat = (chatId: string, updates: Partial<Chat>) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, ...updates } : chat
    ));
  };

  const getChat = (chatId: string) => {
    return chats.find(chat => chat.id === chatId);
  };

  const addMessageToChat = (chatId: string, message: Message) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            messages: [...chat.messages, message],
            lastMessage: message.content,
            timestamp: message.timestamp
          }
        : chat
    ));
  };

  return (
    <ChatContext.Provider value={{
      chats,
      addChat,
      updateChat,
      getChat,
      addMessageToChat,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 