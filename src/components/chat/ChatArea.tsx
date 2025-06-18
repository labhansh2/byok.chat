"use client";

import { useChat } from "@/contexts/chat-context";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import ChatAreaPlaceholder from "@/components/chat/ChatAreaPlaceholder";

export default function ChatArea() {
  const { trigger, setTrigger, setRendering, threadId, setThreadId } = useChat();

  const [messages, setMessages] = useState<string>("");

  const pathname = usePathname();

  useEffect(() => {
    setRendering(true);
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let i = 0;

    // setMessages(""); // Clear messages on trigger

    interval = setInterval(() => {
      setMessages(
        (prev: string) =>
          prev + letters[Math.floor(Math.random() * letters.length)],
      );
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
  }, [trigger, setTrigger]);

  return pathname !== "/" ? (
    <div>
      <h1>Chat Area for {threadId}</h1>
      <p>{messages}</p>
    </div>
  ) : (
    <ChatAreaPlaceholder />
  );
}
