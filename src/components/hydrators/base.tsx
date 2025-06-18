"use client";

import { useEffect } from "react";
import { useChat } from "@/contexts/chat-context";

export default function BaseHydrator({ model }: { model: string }) {
  const { setModel, setThreadId } = useChat();
  useEffect(() => {
    setModel(model);
    setThreadId("");
  }, [model, setModel, setThreadId]);
  return null;
}
