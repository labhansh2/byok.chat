"use client";

import { useEffect } from "react";
import { useChat } from "@/contexts/chat-context";
// import { useGlobalStore } from "@/store/global";

export default function BaseHydrator({ model }: { model: string }) {
  const { setModel, setThreadId } = useChat();
  useEffect(() => {
    // useGlobalStore.setState({ activeModel: model });
    // useGlobalStore.setState({ activeThread: null });
    setModel(model);
    setThreadId("");
  }, [model, setModel, setThreadId]);
  return null;
}
