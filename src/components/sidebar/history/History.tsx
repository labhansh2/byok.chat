import { Suspense } from "react";

import ThreadTile from "./ThreadTile";
import { Thread } from "@/types/chat";

export default function History({ threads }: { threads: Promise<Thread[]> }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-2">
        <div className="flex items-center justify-between px-2 py-2">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Recent Chats
          </h2>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ThreadTile threads={threads} />
        </Suspense>
      </div>
    </div>
  );
}
