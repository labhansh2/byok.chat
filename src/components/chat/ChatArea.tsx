"use client";

import { useChat } from "@/contexts/chat-context";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getMessages, getBlocks } from "@/lib/server";
import { Message, Block, MessageRole } from "@/types/chat";
import { useAIResponse } from "@/hooks/useAIResponse";

import ChatAreaPlaceholder from "@/components/chat/ChatAreaPlaceholder";
import UserMessage from "@/components/chat/messages/UserMessage";
import AssistantMessage from "@/components/chat/messages/AssistantMessage";
import TypingIndicator from "@/components/chat/messages/TypingIndicator";

interface MessageWithBlocks extends Message {
  blocks: Block[];
}

export default function ChatArea() {
  const { 
    trigger, 
    rendering, 
    setRendering, 
    threadId, 
    setThreadId, 
    model,
    messages,
    setMessages,
    clearMessages 
  } = useChat();
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();

  // Use the AI response hook
  const { generateAIResponse, isGenerating } = useAIResponse({
    threadId,
    model,
    messages,
    setMessages,
    setRendering,
  });

  // Extract thread ID from pathname and set it in context
  useEffect(() => {
    if (pathname.startsWith("/chat/")) {
      const currentThreadId = pathname.split("/")[2];
      if (currentThreadId && currentThreadId !== threadId) {
        console.log("Switching to thread:", currentThreadId);
        setThreadId(currentThreadId);
        // Don't clear messages immediately - let loadMessages handle it
      }
    } else {
      if (threadId) {
        console.log("Leaving thread, clearing state");
        setThreadId("");
        clearMessages();
      }
    }
  }, [pathname, setThreadId, threadId, clearMessages]);

  // Load existing messages when thread changes
  useEffect(() => {
    if (threadId && !rendering) {
      console.log("Loading messages for thread:", threadId);
      loadMessages();
    }
  }, [threadId, rendering]);

  // Handle new message rendering when triggered
  useEffect(() => {
    if (trigger && rendering && threadId) {
      console.log("Generating AI response for trigger:", trigger);
      generateAIResponse();
    }
  }, [trigger, rendering, threadId, generateAIResponse]);

  const loadMessages = async () => {
    if (!threadId) return;
    
    setIsLoading(true);
    try {
      const threadMessages = getMessages(threadId);
      console.log("Loaded thread messages:", threadMessages);
      
      const messagesWithBlocks = await Promise.all(
        threadMessages.map(async (message) => ({
          ...message,
          blocks: getBlocks(message.id),
        }))
      );
      
      console.log("Messages with blocks:", messagesWithBlocks);
      setMessages(messagesWithBlocks);
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show placeholder for root path
  if (pathname === "/") {
    return <ChatAreaPlaceholder />;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-muted-foreground">
            Loading conversation...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {messages.map((message) => (
          <div key={message.id} className="w-full">
            {message.role === MessageRole.USER ? (
              <UserMessage message={message} />
            ) : (
              <AssistantMessage 
                message={message}
                isStreaming={rendering}
                isLatestMessage={message.id === messages[messages.length - 1]?.id}
              />
            )}
          </div>
        ))}

        {/* Show typing indicator when rendering new message */}
        {rendering && messages.length > 0 && messages[messages.length - 1]?.role === MessageRole.USER && (
          <div className="flex justify-center">
            <div className="w-full max-w-3xl px-4">
              <TypingIndicator />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
