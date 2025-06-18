"use client";

import { useChat } from "@/contexts/chat-context";
import { useEffect, useState } from "react";

export default function ChatArea({ chatId }: { chatId: string }) {
  
  const { trigger, setRendering } = useChat();

  const [messages, setMessages] = useState<string>("");

  useEffect(() => {
    setRendering(true);
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let i = 0;

    setMessages(""); // Clear messages on trigger

    interval = setInterval(() => {
      setMessages((prev:string) => prev + letters[Math.floor(Math.random() * letters.length)]);
      i++;
    }, 200);

    timeout = setTimeout(() => {
      clearInterval(interval);
    }, 5000);

    setRendering(false);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    
  }, [trigger]);

  return (
    <div>
        <h1>Chat Area for {chatId}</h1>
        <p>{messages}</p>
    </div>
  );
}