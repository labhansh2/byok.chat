"use client";

import { Clock, FileText, Layers } from "lucide-react";
import { useSidebar } from "@/contexts/sidebar-context";

export default function Nav() {
  const { tab, setTab } = useSidebar();

  return (
    <div className="px-4 py-3 border-b border-border">
      <div className="flex items-center gap-1">
        <button
          className={`flex-1 flex items-center justify-center p-2 rounded-md ${tab === "recent" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50 text-muted-foreground"} border border-border text-xs font-medium`}
          title="Recent Chats"
          onClick={() => setTab("recent")}
        >
          <Clock size={14} />
        </button>
        <button
          className={`flex-1 flex items-center justify-center p-2 rounded-md ${tab === "files" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50 text-muted-foreground"} border border-transparent text-xs font-medium`}
          title="Files (Coming Soon)"
          onClick={() => setTab("files")}
        >
          <FileText size={14} />
        </button>
        <button
          className={`flex-1 flex items-center justify-center p-2 rounded-md ${tab === "extensions" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50 text-muted-foreground"} border border-transparent text-xs font-medium`}
          title="Extensions (Coming Soon)"
          onClick={() => setTab("extensions")}
        >
          <Layers size={14} />
        </button>
      </div>
    </div>
  );
}
