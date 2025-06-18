"use client";

import { useEffect } from "react";
import { useChat } from "@/contexts/chat-context";
import { getThreadById } from "@/lib/server";
import { getThreadByIdClient } from "@/lib/client";
import { Thread } from "@/types/chat";

export default function ChatHydrator({ threadId }: { threadId: string }) {
  const { setThreadId, setModel } = useChat();
  useEffect(() => {
    setThreadId(threadId);
    Promise.race([
      getThreadById(threadId),
      getThreadByIdClient(threadId),
    ]).then((thread:Thread | undefined) => {
      setModel(thread?.model || "GPT-4");
    });
  }, [threadId, setThreadId]);
  return null;
}
