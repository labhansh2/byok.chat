"use client";

import { createContext, useContext, useState } from "react";

interface ChatContext {
  model: string;
  setModel: (model: string) => void;
  threadId: string;
  setThreadId: (threadId: string) => void;
  rendering: boolean;
  setRendering: (rendering: boolean) => void;
  trigger: number;
  setTrigger: (trigger: number) => void;
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
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  // chat info
  const [threadId, setThreadId] = useState<string>("");
  const [model, setModel] = useState<string>("");

  // shared states for chat area
  const [rendering, setRendering] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<number>(1);

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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
