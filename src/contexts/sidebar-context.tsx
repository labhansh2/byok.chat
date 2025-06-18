"use client";
import { createContext, useContext, useState } from "react";


const SidebarContext = createContext({
  tab: "recent",
  setTab: (tab: "recent" | "files" | "extensions") => {},
  activeThread: "",
  setActiveThread: (thread: string) => {}
});

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tab, setTab] = useState<"recent" | "files" | "extensions">("recent");
  const [activeThread, setActiveThread] = useState<string>("");

  return (
    <SidebarContext.Provider value={{ tab, setTab, activeThread, setActiveThread }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
