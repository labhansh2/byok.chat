"use client";

import { useState, useEffect } from "react";
import MessageList from "./MessageList";
import PromptInput from "./PromptInput";
import { useChat } from "../../contexts/ChatContext";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatAreaProps {
  chatId: string;
  selectedModel: string;
  onModelChange: (model: string) => void;
  initialMessage?: string;
}

export default function ChatArea({
  chatId,
  selectedModel,
  onModelChange,
  initialMessage,
}: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getChat, addMessageToChat } = useChat();

  // Load messages from chat context when chatId changes
  useEffect(() => {
    if (chatId) {
      const chat = getChat(chatId);
      if (chat) {
        setMessages(chat.messages);
      }
    }
  }, [chatId, getChat]);

  // Handle initial message when component loads
  useEffect(() => {
    if (initialMessage && chatId && messages.length === 0) {
      handleSendMessage(initialMessage);
    }
  }, [initialMessage, chatId]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      role: "user",
      timestamp: new Date(),
    };

    // Add to local state for immediate UI update
    setMessages((prev) => [...prev, userMessage]);
    // Add to chat context for persistence
    addMessageToChat(chatId, userMessage);
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
      setMessages((prev) => [...prev, assistantMessage]);
      addMessageToChat(chatId, assistantMessage);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* Prompt Input */}
      <PromptInput
        onSendMessage={handleSendMessage}
        disabled={isLoading}
        selectedModel={selectedModel}
        onModelChange={onModelChange}
        placeholder="Type your message..."
      />
    </div>
  );
}
