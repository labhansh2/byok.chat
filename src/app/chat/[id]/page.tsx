"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatArea from "@/components/chat/ChatArea";

export default function Chat() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  
  // Get initial message from URL params if it exists
  const initialMessage = searchParams.get('initialMessage');
  
  useEffect(() => {
    // If there's an initial message, we can handle chat initialization here
    if (initialMessage && id) {
      // In a real app, you'd save the chat to your data store here
      console.log(`Initializing chat ${id} with message:`, initialMessage);
    }
  }, [id, initialMessage]);

  return (
    <ChatArea 
      chatId={id} 
      selectedModel={selectedModel} 
      onModelChange={setSelectedModel} 
      initialMessage={initialMessage || undefined}
    />
  );
}
