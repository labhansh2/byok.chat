"use client";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext({
  tab: "recent",
  setTab: (tab: "recent" | "files" | "extensions") => {},
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

  return (
    <SidebarContext.Provider
      value={{
        tab,
        setTab,
        refreshThreads: refreshThreads || (() => {}),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
