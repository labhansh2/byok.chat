"use client";

import { Thread } from "@/types/chat";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { useSidebar } from "@/contexts/sidebar-context";

export default function ThreadTiles({
  threads,
}: {
  threads: Thread[];
}) {
  const threadsList = threads;
  const router = useRouter();
  const { activeThread, setActiveThread } = useSidebar();

  const handleClick = (id: string) => {
    setActiveThread(id);
    router.push(`/chat/${id}`);
  };

  return (
    <div className="space-y-1">
      {threadsList.map((thread) => (
        <button
          key={thread.id}
          onClick={() => handleClick(thread.id)}
          className={`w-full text-left p-2 rounded-md text-sm transition-colors border ${
            activeThread === thread.id
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
