"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PromptInput from "./PromptInput";
import { useChat } from "../../contexts/ChatContext";

const SUGGESTED_QUESTIONS = [
  "Explain quantum computing in simple terms",
  "Write a Python function to sort a list",
  "What are the best practices for React development?",
  "How does machine learning work?",
  "Explain the difference between REST and GraphQL",
  "Write a creative story about time travel"
];

export default function ChatStartPage() {
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const { addChat } = useChat();

  const createNewChat = async (content: string): Promise<string> => {
    const newChatId = `chat-${Date.now()}`;
    
    const newChat = {
      id: newChatId,
      title: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
      lastMessage: content,
      timestamp: new Date(),
      messages: [],
    };
    
    addChat(newChat);
    return newChatId;
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    const newChatId = await createNewChat(content);
    router.push(`/chat/${newChatId}?initialMessage=${encodeURIComponent(content)}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setIsTyping(value.length > 0);
  };

  const handleInputSubmit = (content: string) => {
    handleSendMessage(content);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-2xl w-full text-center">
            {!isTyping && (
              <>
                <h1 className="text-3xl font-semibold text-foreground mb-2">
                  Welcome to byok.chat
                </h1>
                <p className="text-muted-foreground mb-8">
                  Bring your own keys and chat with any AI model. Start a conversation with one of these suggestions or ask anything you'd like.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {SUGGESTED_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(question)}
                      className="p-4 text-left border border-border rounded-lg hover:bg-accent/50 transition-colors group"
                    >
                      <div className="text-sm text-foreground group-hover:text-accent-foreground">
                        {question}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
            
            {isTyping && (
              <div className="text-center mb-8">
                <h2 className="text-xl font-medium text-foreground mb-2">
                  Ready to start chatting?
                </h2>
                <p className="text-muted-foreground">
                  Press Enter or click the send button to create your chat
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prompt Input */}
      <PromptInput
        onSendMessage={handleInputSubmit}
        onInputChange={handleInputChange}
        disabled={false}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        placeholder="Ask anything..."
      />
    </div>
  );
} 