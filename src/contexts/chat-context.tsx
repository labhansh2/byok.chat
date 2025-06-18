"use client";

import { createContext, useContext, useState } from "react";


interface ChatContext {
  rendering: boolean;
  setRendering: (rendering: boolean) => void;
  trigger: number;
  setTrigger: (trigger: number) => void;
}
const ChatContext = createContext<ChatContext>({
  rendering: false,
  setRendering: () => {},
  trigger: 1,
  setTrigger: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {

  const [trigger, setTrigger] = useState<number>(1);

  // chat area state
  const [rendering, setRendering] = useState<boolean>(false);


  return <ChatContext.Provider value={{ 
    rendering,
    setRendering,
    trigger,
    setTrigger
  }}>
    {children}
  </ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);