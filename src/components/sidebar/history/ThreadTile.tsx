"use client";

import { Thread } from "@/types/chat";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

export default function ThreadTile({
  threads,
}: {
  threads: Promise<Thread[]>;
}) {
  const threadsList = use(threads);
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setActive(id);
    router.push(`/chat/${id}`);
  };

  return (
    <div className="space-y-1">
      {threadsList.map((thread) => (
        <button
          key={thread.id}
          onClick={() => handleClick(thread.id)}
          className={`w-full text-left p-2 rounded-md text-sm transition-colors border ${
            active === thread.id
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
