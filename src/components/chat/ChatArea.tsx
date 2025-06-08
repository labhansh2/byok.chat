"use client";

import { useState } from "react";
import MessageList from "./MessageList";
import PromptInput from "./PromptInput";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatAreaProps {
  chatId: string | null;
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export default function ChatArea({ chatId, selectedModel, onModelChange }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        content: `This is a simulated response from ${selectedModel}. In the actual implementation, this would be replaced with real API calls using the user's API key.

This response demonstrates the new blog-style layout where AI responses are displayed in a centered, readable format similar to reading a document or article. The layout is clean and focuses on readability rather than traditional chat bubbles.`,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        {chatId ? (
          <MessageList 
            messages={messages}
            isLoading={isLoading}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-foreground mb-2">
                Welcome to byok.chat
              </h3>
              <p className="text-muted-foreground">
                Start a new chat or select an existing one to begin
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Prompt Input */}
      {chatId && (
        <PromptInput 
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          selectedModel={selectedModel}
          onModelChange={onModelChange}
        />
      )}
    </div>
  );
} 