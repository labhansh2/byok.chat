"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Message, Block } from "@/types/chat";

interface MessageWithBlocks extends Message {
  blocks: Block[];
}

interface ChatContext {
  model: string;
  setModel: (model: string) => void;
  threadId: string;
  setThreadId: (threadId: string) => void;
  rendering: boolean;
  setRendering: (rendering: boolean) => void;
  trigger: number;
  setTrigger: (trigger: number) => void;
  messages: MessageWithBlocks[];
  setMessages: Dispatch<SetStateAction<MessageWithBlocks[]>>;
  addMessage: (message: MessageWithBlocks) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContext>({
  model: "GPT-4",
  setModel: () => {},
  threadId: "",
  setThreadId: () => {},
  rendering: false,
  setRendering: () => {},
  trigger: 1,
  setTrigger: () => {},
  messages: [],
  setMessages: () => {},
  addMessage: () => {},
  clearMessages: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  // chat info
  const [threadId, setThreadId] = useState<string>("");
  const [model, setModel] = useState<string>("GPT-4");

  // shared states for chat area
  const [rendering, setRendering] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<number>(1);

  // message state
  const [messages, setMessages] = useState<MessageWithBlocks[]>([]);

  const addMessage = (message: MessageWithBlocks) => {
    setMessages((prev) => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        model,
        setModel,
        threadId,
        setThreadId,
        rendering,
        setRendering,
        trigger,
        setTrigger,
        messages,
        setMessages,
        addMessage,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
