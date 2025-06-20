import { create } from "zustand";
import { Thread } from "@/types/chat";

type GlobalState = {
  // sidebar states
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  sidebarTab: "chat" | "notes" | "extensions";
  setSidebarTab: (tab: "chat" | "notes" | "extensions") => void;

  activeThread: string | null;
  setActiveThread: (thread: string | null) => void;
  threads: Thread[];
  setThreads: (threads: Thread[]) => void;

  activeModel: string | null;
  setActiveModel: (model: string | null) => void;
  isChatRendering: boolean;
  setIsChatRendering: (rendering: boolean) => void;

  promptMessage: string | null;
  setPromptMessage: (msg: string | null) => void;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (open) => set({ isSidebarOpen: open }),

  sidebarTab: "chat",
  setSidebarTab: (tab) => set({ sidebarTab: tab }),

  activeThread: null,
  setActiveThread: (thread) => set({ activeThread: thread }),


  threads: [],
  setThreads: (threads) => set({ threads }),

  activeModel: null,
  setActiveModel: (model) => set({ activeModel: model }),

  isChatRendering: false,
  setIsChatRendering: (rendering) => set({ isChatRendering: rendering }),

  promptMessage: null,
  setPromptMessage: (msg) => set({ promptMessage: msg }),
}));
