"use client";

import { Thread } from "@/types/chat";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { useSidebar } from "@/contexts/sidebar-context";
import { useChat } from "@/contexts/chat-context";

export default function ThreadTiles({ threads }: { threads: Thread[] }) {
  const threadsList = threads;
  const router = useRouter();
  // Use both sidebar and chat context for active thread state
  const { threadId, setThreadId } = useChat();
  // const { activeThread, setActiveThread } = useSidebar();

  // Determine the current active thread id (prefer chat context, fallback to sidebar)
  // const currentThreadId = activeThread || threadsList.find(t => t.id === activeThread)?.id || threadsList.find(t => t.id === undefined)?.id;

  const handleClick = (id: string) => {
    setThreadId(id);
    // setActiveThread && setActiveThread(id);
    router.push(`/chat/${id}`);
  };

  // Use threadId from chat context if available, otherwise fallback to sidebar activeThread
  return (
    <div className="space-y-1">
      {threadsList.map((thread) => (
        <button
          key={thread.id}
          onClick={() => handleClick(thread.id)}
          className={`w-full text-left p-2 rounded-md text-sm transition-colors border ${
            thread.id === threadId
              ? "bg-accent text-accent-foreground border-border"
              : "hover:bg-accent/50 text-muted-foreground border-transparent"
          }`}
        >
          <div className="font-medium text-foreground truncate">
            {thread.title}
          </div>
        </button>
      ))}
    </div>
  );
}
