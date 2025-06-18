"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import Nav from "./Nav";
import History from "./history/History";
import Extensions from "./extensions/Extensions";
import AuthSection from "./AuthSection";

import { SidebarProvider } from "@/contexts/sidebar-context";
import ContentArea from "./ContentArea";
import { getThreads } from "@/lib/server";
import { Thread } from "@/types/chat";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  const loadThreads = async () => {
    try {
      const threadData = await getThreads();
      setThreads(threadData);
    } catch (error) {
      console.error("Error loading threads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO : this is a hack change it to a better solution
  useEffect(() => {
    // Only reload threads if navigating from "/" to a "/chat/..." route
    if (pathname && pathname.startsWith("/chat/")) {
      loadThreads();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    loadThreads();
  }, []);

  return (
    <div className="flex flex-col h-full w-[256px] border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-foreground">byok.chat</h1>
          {/* TODO : add toggle button */}
          {/* <button
            className="p-1 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
            title="(⌘+B / Ctrl+B)"
          >
          <HamburgerIcon size={16} />
          </button> */}
        </div>
        <div className="w-full">
          <Link
            href="/"
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors border border-border block text-center"
          >
            New Chat
          </Link>
        </div>
      </div>
      
      {/* Content Area - flex-1 to take remaining space */}
      <div className="flex-1 flex flex-col">
        <SidebarProvider refreshThreads={loadThreads}>
          <Nav />
          <ContentArea threads={threads} />
        </SidebarProvider>
      </div>
      
      {/* Auth Section at the bottom */}
      <AuthSection />
    </div>
  );
}
