"use client";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext({
  tab: "recent",
  setTab: (tab: "recent" | "files" | "extensions") => {},
  activeThread: "",
  setActiveThread: (thread: string) => {},
  refreshThreads: () => {},
});

export const SidebarProvider = ({
  children,
  refreshThreads,
}: {
  children: React.ReactNode;
  refreshThreads?: () => void;
}) => {
  const [tab, setTab] = useState<"recent" | "files" | "extensions">("recent");
  const [activeThread, setActiveThread] = useState<string>("");

  return (
    <SidebarContext.Provider
      value={{ 
        tab, 
        setTab, 
        activeThread, 
        setActiveThread, 
        refreshThreads: refreshThreads || (() => {})
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
