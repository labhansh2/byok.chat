"use client";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext({
  tab: "recent",
  setTab: (tab: "recent" | "files" | "extensions") => {},
  // isOpen: false,
  // setIsOpen: (isOpen: boolean) => {},
});

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tab, setTab] = useState<"recent" | "files" | "extensions">("recent");
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ tab, setTab }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
